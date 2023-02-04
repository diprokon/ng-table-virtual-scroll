import { Injectable } from '@angular/core';
import { distinctUntilChanged } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { CdkVirtualScrollViewport, VirtualScrollStrategy } from '@angular/cdk/scrolling';
import { ListRange } from '@angular/cdk/collections';

export interface TSVStrategyConfigs {
  rowHeight: number;
  headerHeight: number;
  footerHeight: number;
  bufferMultiplier: number;
}

@Injectable()
export class FixedSizeTableVirtualScrollStrategy implements VirtualScrollStrategy {
  private rowHeight!: number;
  private headerHeight!: number;
  private footerHeight!: number;
  private bufferMultiplier!: number;
  private indexChange = new Subject<number>();
  public stickyChange = new Subject<number>();

  public viewport: CdkVirtualScrollViewport;

  public renderedRangeStream = new BehaviorSubject<ListRange>({start: 0, end: 0});

  public scrolledIndexChange = this.indexChange.pipe(distinctUntilChanged());

  get dataLength(): number {
    return this._dataLength;
  }

  set dataLength(value: number) {
    this._dataLength = value;
    this.onDataLengthChanged();
  }

  private _dataLength = 0;

  public attach(viewport: CdkVirtualScrollViewport): void {
    this.viewport = viewport;
    this.viewport.renderedRangeStream.subscribe(this.renderedRangeStream);
    this.onDataLengthChanged();
  }

  public detach(): void {
    this.indexChange.complete();
    this.stickyChange.complete();
    this.renderedRangeStream.complete();
  }

  public onContentScrolled(): void {
    this.updateContent();
  }

  public onDataLengthChanged(): void {
    if (this.viewport) {
      const contentSize = this.dataLength * this.rowHeight + this.headerHeight + this.footerHeight;
      this.viewport.setTotalContentSize(contentSize);
      const viewportSize = this.viewport.getViewportSize();
      if (this.viewport.measureScrollOffset() + viewportSize >= contentSize) {
        this.viewport.scrollToOffset(contentSize - viewportSize);
      }
    }
    this.updateContent();
  }

  public onContentRendered(): void {
  }

  public onRenderedOffsetChanged(): void {
    // no-op
  }

  public scrollToIndex(index: number, behavior?: ScrollBehavior): void {
    if (!this.viewport || !this.rowHeight) {
      return;
    }
    this.viewport.scrollToOffset((index - 1 ) * this.rowHeight + this.headerHeight, behavior);
  }

  public setConfig(configs: TSVStrategyConfigs) {
    const {rowHeight, headerHeight, footerHeight, bufferMultiplier} = configs;
    if (
      this.rowHeight === rowHeight
      && this.headerHeight === headerHeight
      && this.footerHeight === footerHeight
      && this.bufferMultiplier === bufferMultiplier
    ) {
      return;
    }
    this.rowHeight = rowHeight;
    this.headerHeight = headerHeight;
    this.footerHeight = footerHeight;
    this.bufferMultiplier = bufferMultiplier;
    this.onDataLengthChanged();
  }

  private updateContent() {
    if (!this.viewport || !this.rowHeight) {
      return;
    }

    const renderedOffset = this.viewport.getOffsetToRenderedContentStart();
    const start = renderedOffset / this.rowHeight;
    const itemsDisplayed = Math.ceil(this.viewport.getViewportSize() / this.rowHeight);
    const bufferItems = Math.ceil(itemsDisplayed * this.bufferMultiplier);
    const end = start + itemsDisplayed + 2 * bufferItems;


    const bufferOffset = renderedOffset + bufferItems * this.rowHeight;
    const scrollOffset = this.viewport.measureScrollOffset();

    // How far the scroll offset is from the lower buffer, which is usually where items start being displayed
    const relativeScrollOffset = scrollOffset - bufferOffset;
    const rowsScrolled = relativeScrollOffset / this.rowHeight;

    const displayed = scrollOffset / this.rowHeight;
    this.indexChange.next(displayed);

    // Only bother updating the displayed information if we've scrolled more than a row
    const rowSensitivity = 1.0;
    if (Math.abs(rowsScrolled) < rowSensitivity) {
      this.viewport.setRenderedContentOffset(renderedOffset);
      this.viewport.setRenderedRange({start, end});
      return;
    }

    // Special case for the start of the table.
    // At the top of the table, the first few rows are first rendered because they're visible, and then still rendered
    // Because they move into the buffer. So we only need to change what's rendered once the user scrolls far enough down.
    if (renderedOffset === 0 && rowsScrolled < 0) {
      this.viewport.setRenderedContentOffset(renderedOffset);
      this.viewport.setRenderedRange({start, end});
      return;
    }

    const rowsToMove = Math.sign(rowsScrolled) * Math.floor(Math.abs(rowsScrolled));
    const adjustedRenderedOffset = Math.max(0, renderedOffset + rowsToMove * this.rowHeight);
    this.viewport.setRenderedContentOffset(adjustedRenderedOffset);

    const adjustedStart = Math.max(0, start + rowsToMove);
    const adjustedEnd = adjustedStart + itemsDisplayed + 2 * bufferItems;
    this.viewport.setRenderedRange({start: adjustedStart, end: adjustedEnd});

    this.stickyChange.next(adjustedRenderedOffset);
  }
}
