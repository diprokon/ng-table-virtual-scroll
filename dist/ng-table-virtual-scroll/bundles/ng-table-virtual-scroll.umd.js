(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/cdk/scrolling'), require('rxjs/operators'), require('rxjs'), require('@angular/material/table')) :
    typeof define === 'function' && define.amd ? define('ng-table-virtual-scroll', ['exports', '@angular/core', '@angular/cdk/scrolling', 'rxjs/operators', 'rxjs', '@angular/material/table'], factory) :
    (global = global || self, factory(global['ng-table-virtual-scroll'] = {}, global.ng.core, global.ng.cdk.scrolling, global.rxjs.operators, global.rxjs, global.ng.material.table));
}(this, (function (exports, core, scrolling, operators, rxjs, table) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

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
                rxjs.merge(_sort.sortChange, _sort.initialized) :
                rxjs.of(null);
            var pageChange = _paginator ?
                rxjs.merge(_paginator.page, _internalPageChanges, _paginator.initialized) :
                rxjs.of(null);
            var dataStream = this['_data'];
            var filteredData = rxjs.combineLatest([dataStream, _filter])
                .pipe(operators.map(function (_a) {
                var _b = __read(_a, 1), data = _b[0];
                return _this._filterData(data);
            }));
            var orderedData = rxjs.combineLatest([filteredData, sortChange])
                .pipe(operators.map(function (_a) {
                var _b = __read(_a, 1), data = _b[0];
                return _this._orderData(data);
            }));
            var paginatedData = rxjs.combineLatest([orderedData, pageChange])
                .pipe(operators.map(function (_a) {
                var _b = __read(_a, 1), data = _b[0];
                return _this._pageData(data);
            }));
            var sliced = rxjs.combineLatest([paginatedData, this.renderedRangeStream.asObservable()])
                .pipe(operators.map(function (_a) {
                var _b = __read(_a, 2), data = _b[0], _c = _b[1], start = _c.start, end = _c.end;
                return start == null || end == null ? data : data.slice(start, end);
            }));
            this._renderChangesSubscription.unsubscribe();
            this._renderChangesSubscription = sliced.subscribe(function (data) { return _renderData.next(data); });
        };
        TableVirtualScrollDataSource.prototype.initRenderedRangeStream = function () {
            if (!this.renderedRangeStream) {
                this.renderedRangeStream = new rxjs.Subject();
            }
        };
        return TableVirtualScrollDataSource;
    }(table.MatTableDataSource));

    var FixedSizeTableVirtualScrollStrategy = /** @class */ (function () {
        function FixedSizeTableVirtualScrollStrategy() {
            this.indexChange = new rxjs.Subject();
            this.stickyChange = new rxjs.Subject();
            this.renderedRangeStream = new rxjs.BehaviorSubject({ start: null, end: null });
            this.scrolledIndexChange = this.indexChange.pipe(operators.distinctUntilChanged());
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
        FixedSizeTableVirtualScrollStrategy.ɵprov = core["ɵɵdefineInjectable"]({ token: FixedSizeTableVirtualScrollStrategy, factory: FixedSizeTableVirtualScrollStrategy.ɵfac });
        return FixedSizeTableVirtualScrollStrategy;
    }());
    /*@__PURE__*/ (function () { core["ɵsetClassMetadata"](FixedSizeTableVirtualScrollStrategy, [{
            type: core.Injectable
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
            this.dataSourceChanges = new rxjs.Subject();
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
                .pipe(operators.filter(function () { return _this.isStickyEnabled(); }), operators.takeWhile(this.isAlive()))
                .subscribe(function (stickyOffset) {
                _this.setSticky(stickyOffset);
            });
        };
        TableItemSizeDirective.prototype.connectDataSource = function (dataSource) {
            var _this = this;
            this.dataSourceChanges.next();
            if (dataSource instanceof TableVirtualScrollDataSource) {
                this.scrollStrategy.renderedRangeStream
                    .pipe(operators.takeUntil(this.dataSourceChanges), operators.takeWhile(this.isAlive()))
                    .subscribe(function (range) {
                    _this.zone.run(function () {
                        dataSource.renderedRangeStream.next(range);
                    });
                });
                dataSource.connect()
                    .pipe(operators.map(function () { return dataSource.data.length; }), operators.distinctUntilChanged(), operators.takeUntil(this.dataSourceChanges), operators.takeWhile(this.isAlive()))
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
        TableItemSizeDirective.ɵfac = function TableItemSizeDirective_Factory(t) { return new (t || TableItemSizeDirective)(core["ɵɵdirectiveInject"](core.NgZone)); };
        TableItemSizeDirective.ɵdir = core["ɵɵdefineDirective"]({ type: TableItemSizeDirective, selectors: [["cdk-virtual-scroll-viewport", "tvsItemSize", ""]], contentQueries: function TableItemSizeDirective_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
                core["ɵɵstaticContentQuery"](dirIndex, table.MatTable, true);
            } if (rf & 2) {
                var _t;
                core["ɵɵqueryRefresh"](_t = core["ɵɵloadQuery"]()) && (ctx.table = _t.first);
            } }, inputs: { rowHeight: ["tvsItemSize", "rowHeight"], headerHeight: "headerHeight", bufferMultiplier: "bufferMultiplier" }, features: [core["ɵɵProvidersFeature"]([{
                        provide: scrolling.VIRTUAL_SCROLL_STRATEGY,
                        useFactory: _tableVirtualScrollDirectiveStrategyFactory,
                        deps: [core.forwardRef(function () { return TableItemSizeDirective; })]
                    }]), core["ɵɵNgOnChangesFeature"]()] });
        return TableItemSizeDirective;
    }());
    /*@__PURE__*/ (function () { core["ɵsetClassMetadata"](TableItemSizeDirective, [{
            type: core.Directive,
            args: [{
                    selector: 'cdk-virtual-scroll-viewport[tvsItemSize]',
                    providers: [{
                            provide: scrolling.VIRTUAL_SCROLL_STRATEGY,
                            useFactory: _tableVirtualScrollDirectiveStrategyFactory,
                            deps: [core.forwardRef(function () { return TableItemSizeDirective; })]
                        }]
                }]
        }], function () { return [{ type: core.NgZone }]; }, { rowHeight: [{
                type: core.Input,
                args: ['tvsItemSize']
            }], headerHeight: [{
                type: core.Input
            }], bufferMultiplier: [{
                type: core.Input
            }], table: [{
                type: core.ContentChild,
                args: [table.MatTable, { static: true }]
            }] }); })();

    var TableVirtualScrollModule = /** @class */ (function () {
        function TableVirtualScrollModule() {
        }
        TableVirtualScrollModule.ɵmod = core["ɵɵdefineNgModule"]({ type: TableVirtualScrollModule });
        TableVirtualScrollModule.ɵinj = core["ɵɵdefineInjector"]({ factory: function TableVirtualScrollModule_Factory(t) { return new (t || TableVirtualScrollModule)(); }, imports: [[]] });
        return TableVirtualScrollModule;
    }());
    (function () { (typeof ngJitMode === "undefined" || ngJitMode) && core["ɵɵsetNgModuleScope"](TableVirtualScrollModule, { declarations: [TableItemSizeDirective], exports: [TableItemSizeDirective] }); })();
    /*@__PURE__*/ (function () { core["ɵsetClassMetadata"](TableVirtualScrollModule, [{
            type: core.NgModule,
            args: [{
                    declarations: [TableItemSizeDirective],
                    imports: [],
                    exports: [TableItemSizeDirective]
                }]
        }], null, null); })();

    exports.FixedSizeTableVirtualScrollStrategy = FixedSizeTableVirtualScrollStrategy;
    exports.TableItemSizeDirective = TableItemSizeDirective;
    exports.TableVirtualScrollDataSource = TableVirtualScrollDataSource;
    exports.TableVirtualScrollModule = TableVirtualScrollModule;
    exports._tableVirtualScrollDirectiveStrategyFactory = _tableVirtualScrollDirectiveStrategyFactory;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng-table-virtual-scroll.umd.js.map
