import { AfterViewInit, ContentChild, Directive, forwardRef, Input, OnChanges, OnDestroy } from '@angular/core';
import { CdkVirtualScrollViewport, VIRTUAL_SCROLL_STRATEGY } from '@angular/cdk/scrolling';
import { distinctUntilChanged, map, takeWhile } from 'rxjs/operators';
import { TableVirtualScrollDataSource } from './table-data-source';
import { MatTable } from '@angular/material';
import { FixedSizeTableVirtualScrollStrategy } from './fixed-size-table-virtual-scroll-strategy';
import { CdkHeaderRowDef } from '@angular/cdk/table';

export function _tableVirtualScrollDirectiveStrategyFactory(tableDir: TableItemSizeDirective) {
  return tableDir.scrollStrategy;
}

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

  @Input()
  rowHeight = 48;

  @Input()
  headerHeight = 56;

  @Input()
  bufferMultiplier = 1.7;

  @ContentChild(MatTable, {static: true})
  table: MatTable<any>;

  scrollStrategy = new FixedSizeTableVirtualScrollStrategy();
  viewport: CdkVirtualScrollViewport;

  ngOnDestroy() {
    this.alive = false;
  }

  private isAlive() {
    return () => this.alive;
  }

  ngAfterViewInit() {
    if (this.table.dataSource instanceof TableVirtualScrollDataSource) {
      const dataSource = this.table.dataSource;
      this.scrollStrategy.viewport$
        .pipe(
          takeWhile(this.isAlive())
        )
        .subscribe((viewport) => {
          this.viewport = viewport;
          dataSource.viewport = viewport;
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
    }

    this.scrollStrategy.scrolledIndexChange
      .pipe(
        takeWhile(this.isAlive())
      )
      .subscribe(() => {
        this.setSticky();
      });
  }

  ngOnChanges() {
    this.rowHeight = +this.rowHeight;
    this.headerHeight = +this.headerHeight;
    this.bufferMultiplier = + this.bufferMultiplier;
    this.scrollStrategy.setScrollHeight(this.rowHeight, this.headerHeight, this.bufferMultiplier);
  }


  setSticky() {
    if (!this.viewport) {
      return;
    }

    const stickyState = (this.table['_headerRowDefs'] as CdkHeaderRowDef[])
      .map(def => def.sticky)
      .reduce((prevState, state) => prevState && state, true);

    if (stickyState) {
      const transform = this.getStickyPosition();

      this.viewport.elementRef.nativeElement.querySelectorAll('th')
        .forEach(el => {
          el.style.transform = transform;
        });
    }
  }

  getStickyPosition() {
    if (!this.viewport['_renderedContentTransform']) {
      return 'translateY(0px)';
    }
    return this.viewport['_renderedContentTransform'].replace(/translateY\((\d+)px\)/, 'translateY(-$1px)');

  }

}
