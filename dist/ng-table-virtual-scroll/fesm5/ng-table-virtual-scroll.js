import { ɵɵdefineInjectable, ɵsetClassMetadata, Injectable, ɵɵdirectiveInject, NgZone, ɵɵdefineDirective, ɵɵstaticContentQuery, ɵɵqueryRefresh, ɵɵloadQuery, ɵɵProvidersFeature, forwardRef, ɵɵNgOnChangesFeature, Directive, Input, ContentChild, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { VIRTUAL_SCROLL_STRATEGY } from '@angular/cdk/scrolling';
import { map, distinctUntilChanged, filter, takeWhile, takeUntil } from 'rxjs/operators';
import { __extends, __read } from 'tslib';
import { merge, of, combineLatest, Subject, BehaviorSubject } from 'rxjs';
import { MatTableDataSource, MatTable } from '@angular/material/table';

var TableVirtualScrollDataSource = /** @class */ (function (_super) {
    __extends(TableVirtualScrollDataSource, _super);
    function TableVirtualScrollDataSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TableVirtualScrollDataSource.prototype._updateChangeSubscription = function () {
        var _this = this;
        this.initRenderedRangeStream();
        var _sort = this['_sort'];
        var _paginator = this['_paginator'];
        var _internalPageChanges = this['_internalPageChanges'];
        var _filter = this['_filter'];
        var _renderData = this['_renderData'];
        var sortChange = _sort ?
            merge(_sort.sortChange, _sort.initialized) :
            of(null);
        var pageChange = _paginator ?
            merge(_paginator.page, _internalPageChanges, _paginator.initialized) :
            of(null);
        var dataStream = this['_data'];
        var filteredData = combineLatest([dataStream, _filter])
            .pipe(map(function (_a) {
            var _b = __read(_a, 1), data = _b[0];
            return _this._filterData(data);
        }));
        var orderedData = combineLatest([filteredData, sortChange])
            .pipe(map(function (_a) {
            var _b = __read(_a, 1), data = _b[0];
            return _this._orderData(data);
        }));
        var paginatedData = combineLatest([orderedData, pageChange])
            .pipe(map(function (_a) {
            var _b = __read(_a, 1), data = _b[0];
            return _this._pageData(data);
        }));
        var sliced = combineLatest([paginatedData, this.renderedRangeStream.asObservable()])
            .pipe(map(function (_a) {
            var _b = __read(_a, 2), data = _b[0], _c = _b[1], start = _c.start, end = _c.end;
            return start == null || end == null ? data : data.slice(start, end);
        }));
        this._renderChangesSubscription.unsubscribe();
        this._renderChangesSubscription = sliced.subscribe(function (data) { return _renderData.next(data); });
    };
    TableVirtualScrollDataSource.prototype.initRenderedRangeStream = function () {
        if (!this.renderedRangeStream) {
            this.renderedRangeStream = new Subject();
        }
    };
    return TableVirtualScrollDataSource;
}(MatTableDataSource));

var FixedSizeTableVirtualScrollStrategy = /** @class */ (function () {
    function FixedSizeTableVirtualScrollStrategy() {
        this.indexChange = new Subject();
        this.stickyChange = new Subject();
        this.renderedRangeStream = new BehaviorSubject({ start: null, end: null });
        this.scrolledIndexChange = this.indexChange.pipe(distinctUntilChanged());
        this._dataLength = 0;
    }
    Object.defineProperty(FixedSizeTableVirtualScrollStrategy.prototype, "dataLength", {
        get: function () {
            return this._dataLength;
        },
        set: function (value) {
            this._dataLength = value;
            this.onDataLengthChanged();
        },
        enumerable: true,
        configurable: true
    });
    FixedSizeTableVirtualScrollStrategy.prototype.attach = function (viewport) {
        this.viewport = viewport;
        this.viewport.renderedRangeStream.subscribe(this.renderedRangeStream);
        this.onDataLengthChanged();
        this.updateContent();
    };
    FixedSizeTableVirtualScrollStrategy.prototype.detach = function () {
        // no-op
    };
    FixedSizeTableVirtualScrollStrategy.prototype.onContentScrolled = function () {
        this.updateContent();
    };
    FixedSizeTableVirtualScrollStrategy.prototype.onDataLengthChanged = function () {
        if (this.viewport) {
            this.viewport.setTotalContentSize(this.dataLength * this.rowHeight + this.headerHeight);
        }
    };
    FixedSizeTableVirtualScrollStrategy.prototype.onContentRendered = function () {
        // no-op
    };
    FixedSizeTableVirtualScrollStrategy.prototype.onRenderedOffsetChanged = function () {
        // no-op
    };
    FixedSizeTableVirtualScrollStrategy.prototype.scrollToIndex = function (index, behavior) {
        // no-op
    };
    FixedSizeTableVirtualScrollStrategy.prototype.setConfig = function (_a) {
        var rowHeight = _a.rowHeight, headerHeight = _a.headerHeight, bufferMultiplier = _a.bufferMultiplier;
        if (this.rowHeight === rowHeight || this.headerHeight === headerHeight || this.bufferMultiplier === bufferMultiplier) {
            return;
        }
        this.rowHeight = rowHeight;
        this.headerHeight = headerHeight;
        this.bufferMultiplier = bufferMultiplier;
        this.updateContent();
    };
    FixedSizeTableVirtualScrollStrategy.prototype.updateContent = function () {
        if (!this.viewport || !this.rowHeight) {
            return;
        }
        var scrollOffset = this.viewport.measureScrollOffset();
        var amount = Math.ceil(this.viewport.getViewportSize() / this.rowHeight);
        var offset = Math.max(scrollOffset - this.headerHeight, 0);
        var buffer = Math.ceil(amount * this.bufferMultiplier);
        var skip = Math.round(offset / this.rowHeight);
        var index = Math.max(0, skip);
        var start = Math.max(0, index - buffer);
        var end = Math.min(this.dataLength, index + amount + buffer);
        var renderedOffset = start * this.rowHeight;
        this.viewport.setRenderedContentOffset(renderedOffset);
        this.viewport.setRenderedRange({ start: start, end: end });
        this.indexChange.next(index);
        this.stickyChange.next(renderedOffset);
    };
    FixedSizeTableVirtualScrollStrategy.ɵfac = function FixedSizeTableVirtualScrollStrategy_Factory(t) { return new (t || FixedSizeTableVirtualScrollStrategy)(); };
    FixedSizeTableVirtualScrollStrategy.ɵprov = ɵɵdefineInjectable({ token: FixedSizeTableVirtualScrollStrategy, factory: FixedSizeTableVirtualScrollStrategy.ɵfac });
    return FixedSizeTableVirtualScrollStrategy;
}());
/*@__PURE__*/ (function () { ɵsetClassMetadata(FixedSizeTableVirtualScrollStrategy, [{
        type: Injectable
    }], null, null); })();

function _tableVirtualScrollDirectiveStrategyFactory(tableDir) {
    return tableDir.scrollStrategy;
}
var defaults = {
    rowHeight: 48,
    headerHeight: 56,
    bufferMultiplier: 0.7
};
var TableItemSizeDirective = /** @class */ (function () {
    function TableItemSizeDirective(zone) {
        this.zone = zone;
        this.alive = true;
        // tslint:disable-next-line:no-input-rename
        this.rowHeight = defaults.rowHeight;
        this.headerHeight = defaults.headerHeight;
        this.bufferMultiplier = defaults.bufferMultiplier;
        this.scrollStrategy = new FixedSizeTableVirtualScrollStrategy();
        this.dataSourceChanges = new Subject();
    }
    TableItemSizeDirective.prototype.ngOnDestroy = function () {
        this.alive = false;
        this.dataSourceChanges.complete();
    };
    TableItemSizeDirective.prototype.isAlive = function () {
        var _this = this;
        return function () { return _this.alive; };
    };
    TableItemSizeDirective.prototype.isStickyEnabled = function () {
        return !!this.scrollStrategy.viewport && this.table['_headerRowDefs']
            .map(function (def) { return def.sticky; })
            .reduce(function (prevState, state) { return prevState && state; }, true);
    };
    TableItemSizeDirective.prototype.ngAfterContentInit = function () {
        var _this = this;
        var switchDataSourceOrigin = this.table['_switchDataSource'];
        this.table['_switchDataSource'] = function (dataSource) {
            switchDataSourceOrigin.call(_this.table, dataSource);
            _this.connectDataSource(dataSource);
        };
        this.connectDataSource(this.table.dataSource);
        this.scrollStrategy.stickyChange
            .pipe(filter(function () { return _this.isStickyEnabled(); }), takeWhile(this.isAlive()))
            .subscribe(function (stickyOffset) {
            _this.setSticky(stickyOffset);
        });
    };
    TableItemSizeDirective.prototype.connectDataSource = function (dataSource) {
        var _this = this;
        this.dataSourceChanges.next();
        if (dataSource instanceof TableVirtualScrollDataSource) {
            this.scrollStrategy.renderedRangeStream
                .pipe(takeUntil(this.dataSourceChanges), takeWhile(this.isAlive()))
                .subscribe(function (range) {
                _this.zone.run(function () {
                    dataSource.renderedRangeStream.next(range);
                });
            });
            dataSource.connect()
                .pipe(map(function () { return dataSource.data.length; }), distinctUntilChanged(), takeUntil(this.dataSourceChanges), takeWhile(this.isAlive()))
                .subscribe(function (length) {
                _this.scrollStrategy.dataLength = length;
            });
        }
        else {
            throw new Error('[tvsItemSize] requires TableVirtualScrollDataSource be set as [dataSource] of [mat-table]');
        }
    };
    TableItemSizeDirective.prototype.ngOnChanges = function () {
        var config = {
            rowHeight: +this.rowHeight || defaults.rowHeight,
            headerHeight: +this.headerHeight || defaults.headerHeight,
            bufferMultiplier: +this.bufferMultiplier || defaults.bufferMultiplier
        };
        this.scrollStrategy.setConfig(config);
    };
    TableItemSizeDirective.prototype.setSticky = function (offset) {
        var offsetString = "-" + offset + "px";
        this.scrollStrategy.viewport.elementRef.nativeElement.querySelectorAll('th')
            .forEach(function (el) {
            el.style.top = offsetString;
        });
    };
    TableItemSizeDirective.ɵfac = function TableItemSizeDirective_Factory(t) { return new (t || TableItemSizeDirective)(ɵɵdirectiveInject(NgZone)); };
    TableItemSizeDirective.ɵdir = ɵɵdefineDirective({ type: TableItemSizeDirective, selectors: [["cdk-virtual-scroll-viewport", "tvsItemSize", ""]], contentQueries: function TableItemSizeDirective_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
            ɵɵstaticContentQuery(dirIndex, MatTable, true);
        } if (rf & 2) {
            var _t;
            ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.table = _t.first);
        } }, inputs: { rowHeight: ["tvsItemSize", "rowHeight"], headerHeight: "headerHeight", bufferMultiplier: "bufferMultiplier" }, features: [ɵɵProvidersFeature([{
                    provide: VIRTUAL_SCROLL_STRATEGY,
                    useFactory: _tableVirtualScrollDirectiveStrategyFactory,
                    deps: [forwardRef(function () { return TableItemSizeDirective; })]
                }]), ɵɵNgOnChangesFeature()] });
    return TableItemSizeDirective;
}());
/*@__PURE__*/ (function () { ɵsetClassMetadata(TableItemSizeDirective, [{
        type: Directive,
        args: [{
                selector: 'cdk-virtual-scroll-viewport[tvsItemSize]',
                providers: [{
                        provide: VIRTUAL_SCROLL_STRATEGY,
                        useFactory: _tableVirtualScrollDirectiveStrategyFactory,
                        deps: [forwardRef(function () { return TableItemSizeDirective; })]
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

var TableVirtualScrollModule = /** @class */ (function () {
    function TableVirtualScrollModule() {
    }
    TableVirtualScrollModule.ɵmod = ɵɵdefineNgModule({ type: TableVirtualScrollModule });
    TableVirtualScrollModule.ɵinj = ɵɵdefineInjector({ factory: function TableVirtualScrollModule_Factory(t) { return new (t || TableVirtualScrollModule)(); }, imports: [[]] });
    return TableVirtualScrollModule;
}());
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
