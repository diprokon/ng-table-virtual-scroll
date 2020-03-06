import { ɵɵdefineInjectable, ɵsetClassMetadata, Injectable, ɵɵdirectiveInject, NgZone, ɵɵdefineDirective, ɵɵstaticContentQuery, ɵɵqueryRefresh, ɵɵloadQuery, ɵɵProvidersFeature, forwardRef, ɵɵNgOnChangesFeature, Directive, Input, ContentChild, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { VIRTUAL_SCROLL_STRATEGY } from '@angular/cdk/scrolling';
import { map, distinctUntilChanged, filter, takeWhile, takeUntil } from 'rxjs/operators';
import { merge, of, combineLatest, Subject, BehaviorSubject } from 'rxjs';
import { MatTableDataSource, MatTable } from '@angular/material/table';

class TableVirtualScrollDataSource extends MatTableDataSource {
    _updateChangeSubscription() {
        this.initRenderedRangeStream();
        const _sort = this['_sort'];
        const _paginator = this['_paginator'];
        const _internalPageChanges = this['_internalPageChanges'];
        const _filter = this['_filter'];
        const _renderData = this['_renderData'];
        const sortChange = _sort ?
            merge(_sort.sortChange, _sort.initialized) :
            of(null);
        const pageChange = _paginator ?
            merge(_paginator.page, _internalPageChanges, _paginator.initialized) :
            of(null);
        const dataStream = this['_data'];
        const filteredData = combineLatest([dataStream, _filter])
            .pipe(map(([data]) => this._filterData(data)));
        const orderedData = combineLatest([filteredData, sortChange])
            .pipe(map(([data]) => this._orderData(data)));
        const paginatedData = combineLatest([orderedData, pageChange])
            .pipe(map(([data]) => this._pageData(data)));
        const sliced = combineLatest([paginatedData, this.renderedRangeStream.asObservable()])
            .pipe(map(([data, { start, end }]) => start == null || end == null ? data : data.slice(start, end)));
        this._renderChangesSubscription.unsubscribe();
        this._renderChangesSubscription = sliced.subscribe(data => _renderData.next(data));
    }
    initRenderedRangeStream() {
        if (!this.renderedRangeStream) {
            this.renderedRangeStream = new Subject();
        }
    }
}

class FixedSizeTableVirtualScrollStrategy {
    constructor() {
        this.indexChange = new Subject();
        this.stickyChange = new Subject();
        this.renderedRangeStream = new BehaviorSubject({ start: null, end: null });
        this.scrolledIndexChange = this.indexChange.pipe(distinctUntilChanged());
        this._dataLength = 0;
    }
    get dataLength() {
        return this._dataLength;
    }
    set dataLength(value) {
        this._dataLength = value;
        this.onDataLengthChanged();
    }
    attach(viewport) {
        this.viewport = viewport;
        this.viewport.renderedRangeStream.subscribe(this.renderedRangeStream);
        this.onDataLengthChanged();
        this.updateContent();
    }
    detach() {
        // no-op
    }
    onContentScrolled() {
        this.updateContent();
    }
    onDataLengthChanged() {
        if (this.viewport) {
            this.viewport.setTotalContentSize(this.dataLength * this.rowHeight + this.headerHeight);
        }
    }
    onContentRendered() {
        // no-op
    }
    onRenderedOffsetChanged() {
        // no-op
    }
    scrollToIndex(index, behavior) {
        // no-op
    }
    setConfig({ rowHeight, headerHeight, bufferMultiplier }) {
        if (this.rowHeight === rowHeight || this.headerHeight === headerHeight || this.bufferMultiplier === bufferMultiplier) {
            return;
        }
        this.rowHeight = rowHeight;
        this.headerHeight = headerHeight;
        this.bufferMultiplier = bufferMultiplier;
        this.updateContent();
    }
    updateContent() {
        if (!this.viewport || !this.rowHeight) {
            return;
        }
        const scrollOffset = this.viewport.measureScrollOffset();
        const amount = Math.ceil(this.viewport.getViewportSize() / this.rowHeight);
        const offset = Math.max(scrollOffset - this.headerHeight, 0);
        const buffer = Math.ceil(amount * this.bufferMultiplier);
        const skip = Math.round(offset / this.rowHeight);
        const index = Math.max(0, skip);
        const start = Math.max(0, index - buffer);
        const end = Math.min(this.dataLength, index + amount + buffer);
        const renderedOffset = start * this.rowHeight;
        this.viewport.setRenderedContentOffset(renderedOffset);
        this.viewport.setRenderedRange({ start, end });
        this.indexChange.next(index);
        this.stickyChange.next(renderedOffset);
    }
}
FixedSizeTableVirtualScrollStrategy.ɵfac = function FixedSizeTableVirtualScrollStrategy_Factory(t) { return new (t || FixedSizeTableVirtualScrollStrategy)(); };
FixedSizeTableVirtualScrollStrategy.ɵprov = ɵɵdefineInjectable({ token: FixedSizeTableVirtualScrollStrategy, factory: FixedSizeTableVirtualScrollStrategy.ɵfac });
/*@__PURE__*/ (function () { ɵsetClassMetadata(FixedSizeTableVirtualScrollStrategy, [{
        type: Injectable
    }], null, null); })();

function _tableVirtualScrollDirectiveStrategyFactory(tableDir) {
    return tableDir.scrollStrategy;
}
const defaults = {
    rowHeight: 48,
    headerHeight: 56,
    bufferMultiplier: 0.7
};
class TableItemSizeDirective {
    constructor(zone) {
        this.zone = zone;
        this.alive = true;
        // tslint:disable-next-line:no-input-rename
        this.rowHeight = defaults.rowHeight;
        this.headerHeight = defaults.headerHeight;
        this.bufferMultiplier = defaults.bufferMultiplier;
        this.scrollStrategy = new FixedSizeTableVirtualScrollStrategy();
        this.dataSourceChanges = new Subject();
    }
    ngOnDestroy() {
        this.alive = false;
        this.dataSourceChanges.complete();
    }
    isAlive() {
        return () => this.alive;
    }
    isStickyEnabled() {
        return !!this.scrollStrategy.viewport && this.table['_headerRowDefs']
            .map(def => def.sticky)
            .reduce((prevState, state) => prevState && state, true);
    }
    ngAfterContentInit() {
        const switchDataSourceOrigin = this.table['_switchDataSource'];
        this.table['_switchDataSource'] = (dataSource) => {
            switchDataSourceOrigin.call(this.table, dataSource);
            this.connectDataSource(dataSource);
        };
        this.connectDataSource(this.table.dataSource);
        this.scrollStrategy.stickyChange
            .pipe(filter(() => this.isStickyEnabled()), takeWhile(this.isAlive()))
            .subscribe((stickyOffset) => {
            this.setSticky(stickyOffset);
        });
    }
    connectDataSource(dataSource) {
        this.dataSourceChanges.next();
        if (dataSource instanceof TableVirtualScrollDataSource) {
            this.scrollStrategy.renderedRangeStream
                .pipe(takeUntil(this.dataSourceChanges), takeWhile(this.isAlive()))
                .subscribe(range => {
                this.zone.run(() => {
                    dataSource.renderedRangeStream.next(range);
                });
            });
            dataSource.connect()
                .pipe(map(() => dataSource.data.length), distinctUntilChanged(), takeUntil(this.dataSourceChanges), takeWhile(this.isAlive()))
                .subscribe((length) => {
                this.scrollStrategy.dataLength = length;
            });
        }
        else {
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
TableItemSizeDirective.ɵfac = function TableItemSizeDirective_Factory(t) { return new (t || TableItemSizeDirective)(ɵɵdirectiveInject(NgZone)); };
TableItemSizeDirective.ɵdir = ɵɵdefineDirective({ type: TableItemSizeDirective, selectors: [["cdk-virtual-scroll-viewport", "tvsItemSize", ""]], contentQueries: function TableItemSizeDirective_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        ɵɵstaticContentQuery(dirIndex, MatTable, true);
    } if (rf & 2) {
        var _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.table = _t.first);
    } }, inputs: { rowHeight: ["tvsItemSize", "rowHeight"], headerHeight: "headerHeight", bufferMultiplier: "bufferMultiplier" }, features: [ɵɵProvidersFeature([{
                provide: VIRTUAL_SCROLL_STRATEGY,
                useFactory: _tableVirtualScrollDirectiveStrategyFactory,
                deps: [forwardRef(() => TableItemSizeDirective)]
            }]), ɵɵNgOnChangesFeature()] });
/*@__PURE__*/ (function () { ɵsetClassMetadata(TableItemSizeDirective, [{
        type: Directive,
        args: [{
                selector: 'cdk-virtual-scroll-viewport[tvsItemSize]',
                providers: [{
                        provide: VIRTUAL_SCROLL_STRATEGY,
                        useFactory: _tableVirtualScrollDirectiveStrategyFactory,
                        deps: [forwardRef(() => TableItemSizeDirective)]
                    }]
            }]
    }], function () { return [{ type: NgZone }]; }, { rowHeight: [{
            type: Input,
            args: ['tvsItemSize']
        }], headerHeight: [{
            type: Input
        }], bufferMultiplier: [{
            type: Input
        }], table: [{
            type: ContentChild,
            args: [MatTable, { static: true }]
        }] }); })();

class TableVirtualScrollModule {
}
TableVirtualScrollModule.ɵmod = ɵɵdefineNgModule({ type: TableVirtualScrollModule });
TableVirtualScrollModule.ɵinj = ɵɵdefineInjector({ factory: function TableVirtualScrollModule_Factory(t) { return new (t || TableVirtualScrollModule)(); }, imports: [[]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(TableVirtualScrollModule, { declarations: [TableItemSizeDirective], exports: [TableItemSizeDirective] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(TableVirtualScrollModule, [{
        type: NgModule,
        args: [{
                declarations: [TableItemSizeDirective],
                imports: [],
                exports: [TableItemSizeDirective]
            }]
    }], null, null); })();

/*
 * Public API Surface of ng-fixed-size-table-virtual-scroll
 */

/**
 * Generated bundle index. Do not edit.
 */

export { FixedSizeTableVirtualScrollStrategy, TableItemSizeDirective, TableVirtualScrollDataSource, TableVirtualScrollModule, _tableVirtualScrollDirectiveStrategyFactory };
//# sourceMappingURL=ng-table-virtual-scroll.js.map
