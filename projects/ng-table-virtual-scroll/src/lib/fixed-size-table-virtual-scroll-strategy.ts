import { Injectable } from '@angular/core';
import { distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CdkVirtualScrollViewport, VirtualScrollStrategy } from '@angular/cdk/scrolling';

@Injectable()
export class FixedSizeTableVirtualScrollStrategy implements VirtualScrollStrategy {
  private rowHeight!: number;
  private headerHeight!: number;
  private bufferMultiplier!: number;
  private indexChange = new Subject<number>();


  public viewport: CdkVirtualScrollViewport;

  private _viewport$ = new Subject<CdkVirtualScrollViewport>();
  viewport$ = this._viewport$.asObservable();

  public scrolledIndexChange = this.indexChange.pipe(distinctUntilChanged());

  get dataLength(): number {
    return this._dataLength;
  }

  set dataLength(value: number) {
    this._dataLength = value;
    this.onDataLengthChanged();
  }

  private _dataLength = 0;

  constructor() {
  }

  public attach(viewport: CdkVirtualScrollViewport): void {
    this.viewport = viewport;
    this.onDataLengthChanged();
    this.updateContent();
    this._viewport$.next(viewport);
    this._viewport$.complete();
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

  public setScrollHeight(rowHeight: number, headerHeight: number, bufferMultiplier: number) {
    this.rowHeight = rowHeight;
    this.headerHeight = headerHeight;
    this.bufferMultiplier = bufferMultiplier;
    this.updateContent();
  }

  private updateContent() {
    if (!this.viewport) {
      return;
    }

    const amount = Math.ceil(this.viewport.getViewportSize() / this.rowHeight);
    const offset = this.viewport.measureScrollOffset() - this.headerHeight;
    const buffer = Math.ceil(amount * this.bufferMultiplier);

    const skip = Math.round(offset / this.rowHeight);
    const index = Math.max(0, skip);
    const start = Math.max(0, index - buffer);
    const end = Math.min(this.dataLength, index + amount + buffer);
    this.viewport.setRenderedContentOffset(this.rowHeight * start);
    this.viewport.setRenderedRange({start, end});
    this.indexChange.next(index);
  }
}
