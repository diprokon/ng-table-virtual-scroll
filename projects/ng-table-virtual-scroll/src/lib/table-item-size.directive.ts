import { AfterContentInit, ContentChild, Directive, forwardRef, Input, NgZone, OnChanges, OnDestroy } from '@angular/core';
import { VIRTUAL_SCROLL_STRATEGY } from '@angular/cdk/scrolling';
import { distinctUntilChanged, filter, map, takeUntil, takeWhile } from 'rxjs/operators';
import { TableVirtualScrollDataSource } from './table-data-source';
import { MatTable } from '@angular/material';
import { FixedSizeTableVirtualScrollStrategy } from './fixed-size-table-virtual-scroll-strategy';
import { CdkHeaderRowDef } from '@angular/cdk/table';
import { Subject } from 'rxjs';

export function _tableVirtualScrollDirectiveStrategyFactory(tableDir: TableItemSizeDirective) {
  return tableDir.scrollStrategy;
}

const defaults = {
  rowHeight: 48,
  headerHeight: 56,
  bufferMultiplier: 0.7
};

@Directive({
  selector: 'cdk-virtual-scroll-viewport[tvsItemSize]',
  providers: [{
    provide: VIRTUAL_SCROLL_STRATEGY,
    useFactory: _tableVirtualScrollDirectiveStrategyFactory,
    deps: [forwardRef(() => TableItemSizeDirective)]
  }]
})
export class TableItemSizeDirective implements OnChanges, AfterContentInit, OnDestroy {
  private alive = true;

  // tslint:disable-next-line:no-input-rename
  @Input('tvsItemSize')
  rowHeight = defaults.rowHeight;

  @Input()
  headerHeight = defaults.headerHeight;

  @Input()
  bufferMultiplier = defaults.bufferMultiplier;

  @ContentChild(MatTable, {static: true})
  table: MatTable<any>;

  scrollStrategy = new FixedSizeTableVirtualScrollStrategy();

  dataSourceChanges = new Subject<void>();

  constructor(private zone: NgZone) {
  }

  ngOnDestroy() {
    this.alive = false;
    this.dataSourceChanges.complete();
  }

  private isAlive() {
    return () => this.alive;
  }

  private isStickyEnabled(): boolean {
    return !!this.scrollStrategy.viewport && (this.table['_headerRowDefs'] as CdkHeaderRowDef[])
      .map(def => def.sticky)
      .reduce((prevState, state) => prevState && state, true);
  }

  ngAfterContentInit() {
    const switchDataSourceOrigin = this.table['_switchDataSource'];
    this.table['_switchDataSource'] = (dataSource: any) => {
      switchDataSourceOrigin.call(this.table, dataSource);
      this.connectDataSource(dataSource);
    };

    this.connectDataSource(this.table.dataSource);

    this.scrollStrategy.stickyChange
      .pipe(
        filter(() => this.isStickyEnabled()),
        takeWhile(this.isAlive())
      )
      .subscribe((stickyOffset) => {
        this.setSticky(stickyOffset);
      });
  }

  connectDataSource(dataSource: any) {
    this.dataSourceChanges.next();
    if (dataSource instanceof TableVirtualScrollDataSource) {
      this.scrollStrategy.renderedRangeStream
        .pipe(
          takeUntil(this.dataSourceChanges),
          takeWhile(this.isAlive())
        )
        .subscribe(range => {
          this.zone.run(() => {
            dataSource.renderedRangeStream.next(range);
          });
        });
      dataSource.connect()
        .pipe(
          map(() => dataSource.data.length),
          distinctUntilChanged(),
          takeUntil(this.dataSourceChanges),
          takeWhile(this.isAlive())
        )
        .subscribe((length) => {
          this.scrollStrategy.dataLength = length;
        });
    } else {
      throw new Error('[tvsItemSize] requires TableVirtualScrollDataSource be set as [dataSource] of [mat-table]');
    }
  }

  ngOnChanges() {
    const config = {
      rowHeight: +this.rowHeight || defaults.rowHeight,
      headerHeight: +this.headerHeight || defaults.headerHeight,
      bufferMultiplier: +this.bufferMultiplier || defaults.bufferMultiplier
    };
    this.scrollStrategy.setConfig(config);
  }


  setSticky(offset) {
    const offsetString = `-${offset}px`;

    this.scrollStrategy.viewport.elementRef.nativeElement.querySelectorAll('th')
      .forEach(el => {
        el.style.top = offsetString;
      });
  }
}
