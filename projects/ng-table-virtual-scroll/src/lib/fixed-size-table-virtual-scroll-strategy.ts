import { Injectable } from '@angular/core';
import { distinctUntilChanged } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { CdkVirtualScrollViewport, VirtualScrollStrategy } from '@angular/cdk/scrolling';
import { ListRange } from '@angular/cdk/collections';

@Injectable()
export class FixedSizeTableVirtualScrollStrategy implements VirtualScrollStrategy {
  private rowHeight!: number;
  private headerHeight!: number;
  private bufferMultiplier!: number;
  private tableHeight!: number;
  private indexChange = new Subject<number>();
  public stickyChange = new Subject<number>();

  public viewport: CdkVirtualScrollViewport;

  public renderedRangeStream = new BehaviorSubject<ListRange>({start: null, end: null});

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
    this.updateContent();
  }

  public detach(): void {
    // no-op
  }

  public onContentScrolled(): void {
    this.updateContent();
  }

  public onDataLengthChanged(): void {
    if (this.viewport) {
      this.viewport.setTotalContentSize(this.dataLength * this.rowHeight + this.headerHeight);
    }
  }

  public onContentRendered(): void {
    // no-op
  }

  public onRenderedOffsetChanged(): void {
    // no-op
  }

  public scrollToIndex(index: number, behavior: ScrollBehavior): void {
    // no-op
  }

  public setConfig({rowHeight, headerHeight, bufferMultiplier, tableHeight}: { rowHeight: number, headerHeight: number, 
    bufferMultiplier: number, tableHeight: number }) {
    if (this.rowHeight === rowHeight || this.headerHeight === headerHeight ||
      this.bufferMultiplier === bufferMultiplier || this.tableHeight === tableHeight) {
      return;
    }
    this.rowHeight = rowHeight;
    this.headerHeight = headerHeight;
    this.bufferMultiplier = bufferMultiplier;
    this.tableHeight = tableHeight;
    this.updateContent();
  }

  private updateContent() {
    if (!this.viewport || !this.rowHeight) {
      return;
    }
    const scrollOffset = this.viewport.measureScrollOffset();
    const amount = Math.ceil(this.calculateProperViewPortSize() / this.rowHeight);
    const offset = Math.max(scrollOffset - this.headerHeight, 0);
    const buffer = Math.ceil(amount * this.bufferMultiplier);

    const skip = Math.round(offset / this.rowHeight);
    const index = Math.max(0, skip);
    const start = Math.max(0, index - buffer);
    const end = Math.min(this.dataLength, index + amount + buffer);
    const renderedOffset = start * this.rowHeight;
    this.viewport.setRenderedContentOffset(renderedOffset);
    this.viewport.setRenderedRange({start, end});
    this.indexChange.next(index);
    this.stickyChange.next(renderedOffset);
  }

  private calculateProperViewPortSize(): number {
    const valueViewPortSize = this.viewport.getViewportSize();

    if (valueViewPortSize > 0) {
      return valueViewPortSize;
    }

    if (this.tableHeight === 0) {
      return this.rowHeight * 3;
    }

    return this.tableHeight;
  }
}
