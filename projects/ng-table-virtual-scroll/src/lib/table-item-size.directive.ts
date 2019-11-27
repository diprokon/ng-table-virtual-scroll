import { AfterViewInit, ContentChild, Directive, forwardRef, Input, NgZone, OnChanges, OnDestroy } from '@angular/core';
import { VIRTUAL_SCROLL_STRATEGY } from '@angular/cdk/scrolling';
import { distinctUntilChanged, filter, map, takeWhile } from 'rxjs/operators';
import { TableVirtualScrollDataSource } from './table-data-source';
import { MatTable } from '@angular/material';
import { FixedSizeTableVirtualScrollStrategy } from './fixed-size-table-virtual-scroll-strategy';
import { CdkHeaderRowDef } from '@angular/cdk/table';

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
export class TableItemSizeDirective implements OnChanges, AfterViewInit, OnDestroy {
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

  constructor(private zone: NgZone) {
  }

  ngOnDestroy() {
    this.alive = false;
  }

  private isAlive() {
    return () => this.alive;
  }

  private isStickyEnabled(): boolean {
    return !!this.scrollStrategy.viewport && (this.table['_headerRowDefs'] as CdkHeaderRowDef[])
      .map(def => def.sticky)
      .reduce((prevState, state) => prevState && state, true);
  }

  ngAfterViewInit() {
    if (this.table.dataSource instanceof TableVirtualScrollDataSource) {
      const dataSource = this.table.dataSource;
      this.scrollStrategy.renderedRangeStream.subscribe(range => {
        this.zone.run(() => {
          dataSource.renderedRangeStream.next(range);
        });
      });
      dataSource.connect()
        .pipe(
          map(() => dataSource.data.length),
          distinctUntilChanged(),
          takeWhile(this.isAlive())
        )
        .subscribe((length) => {
          this.scrollStrategy.dataLength = length;
        });
    } else {
      throw new Error('[tvsItemSize] requires TableVirtualScrollDataSource be set as [dataSource] of [mat-table]');
    }

    this.scrollStrategy.stickyChange
      .pipe(
        filter(() => this.isStickyEnabled()),
        takeWhile(this.isAlive())
      )
      .subscribe((stickyOffset) => {
        this.setSticky(stickyOffset);
      });
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
