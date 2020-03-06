import { BehaviorSubject, Subject } from 'rxjs';
import { CdkVirtualScrollViewport, VirtualScrollStrategy } from '@angular/cdk/scrolling';
import { ListRange } from '@angular/cdk/collections';
import * as i0 from "@angular/core";
export declare class FixedSizeTableVirtualScrollStrategy implements VirtualScrollStrategy {
    private rowHeight;
    private headerHeight;
    private bufferMultiplier;
    private indexChange;
    stickyChange: Subject<number>;
    viewport: CdkVirtualScrollViewport;
    renderedRangeStream: BehaviorSubject<ListRange>;
    scrolledIndexChange: import("rxjs").Observable<number>;
    get dataLength(): number;
    set dataLength(value: number);
    private _dataLength;
    attach(viewport: CdkVirtualScrollViewport): void;
    detach(): void;
    onContentScrolled(): void;
    onDataLengthChanged(): void;
    onContentRendered(): void;
    onRenderedOffsetChanged(): void;
    scrollToIndex(index: number, behavior: ScrollBehavior): void;
    setConfig({ rowHeight, headerHeight, bufferMultiplier }: {
        rowHeight: number;
        headerHeight: number;
        bufferMultiplier: number;
    }): void;
    private updateContent;
    static ɵfac: i0.ɵɵFactoryDef<FixedSizeTableVirtualScrollStrategy>;
    static ɵprov: i0.ɵɵInjectableDef<FixedSizeTableVirtualScrollStrategy>;
}
