import { ContentChild, Directive, forwardRef, Input } from '@angular/core';
import { VIRTUAL_SCROLL_STRATEGY } from '@angular/cdk/scrolling';
import { distinctUntilChanged, filter, map, takeUntil, takeWhile } from 'rxjs/operators';
import { TableVirtualScrollDataSource } from './table-data-source';
import { MatTable } from '@angular/material/table';
import { FixedSizeTableVirtualScrollStrategy } from './fixed-size-table-virtual-scroll-strategy';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export function _tableVirtualScrollDirectiveStrategyFactory(tableDir) {
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
    TableItemSizeDirective.ɵfac = function TableItemSizeDirective_Factory(t) { return new (t || TableItemSizeDirective)(i0.ɵɵdirectiveInject(i0.NgZone)); };
    TableItemSizeDirective.ɵdir = i0.ɵɵdefineDirective({ type: TableItemSizeDirective, selectors: [["cdk-virtual-scroll-viewport", "tvsItemSize", ""]], contentQueries: function TableItemSizeDirective_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
            i0.ɵɵstaticContentQuery(dirIndex, MatTable, true);
        } if (rf & 2) {
            var _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.table = _t.first);
        } }, inputs: { rowHeight: ["tvsItemSize", "rowHeight"], headerHeight: "headerHeight", bufferMultiplier: "bufferMultiplier" }, features: [i0.ɵɵProvidersFeature([{
                    provide: VIRTUAL_SCROLL_STRATEGY,
                    useFactory: _tableVirtualScrollDirectiveStrategyFactory,
                    deps: [forwardRef(function () { return TableItemSizeDirective; })]
                }]), i0.ɵɵNgOnChangesFeature()] });
    return TableItemSizeDirective;
}());
export { TableItemSizeDirective };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(TableItemSizeDirective, [{
        type: Directive,
        args: [{
                selector: 'cdk-virtual-scroll-viewport[tvsItemSize]',
                providers: [{
                        provide: VIRTUAL_SCROLL_STRATEGY,
                        useFactory: _tableVirtualScrollDirectiveStrategyFactory,
                        deps: [forwardRef(function () { return TableItemSizeDirective; })]
                    }]
            }]
    }], function () { return [{ type: i0.NgZone }]; }, { rowHeight: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtaXRlbS1zaXplLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXRhYmxlLXZpcnR1YWwtc2Nyb2xsLyIsInNvdXJjZXMiOlsibGliL3RhYmxlLWl0ZW0tc2l6ZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFvQixZQUFZLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQWdDLE1BQU0sZUFBZSxDQUFDO0FBQzNILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDbkQsT0FBTyxFQUFFLG1DQUFtQyxFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFFakcsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFFL0IsTUFBTSxVQUFVLDJDQUEyQyxDQUFDLFFBQWdDO0lBQzFGLE9BQU8sUUFBUSxDQUFDLGNBQWMsQ0FBQztBQUNqQyxDQUFDO0FBRUQsSUFBTSxRQUFRLEdBQUc7SUFDZixTQUFTLEVBQUUsRUFBRTtJQUNiLFlBQVksRUFBRSxFQUFFO0lBQ2hCLGdCQUFnQixFQUFFLEdBQUc7Q0FDdEIsQ0FBQztBQUVGO0lBNEJFLGdDQUFvQixJQUFZO1FBQVosU0FBSSxHQUFKLElBQUksQ0FBUTtRQW5CeEIsVUFBSyxHQUFHLElBQUksQ0FBQztRQUVyQiwyQ0FBMkM7UUFFM0MsY0FBUyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUM7UUFHL0IsaUJBQVksR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDO1FBR3JDLHFCQUFnQixHQUFHLFFBQVEsQ0FB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QUFRLEVBQUUsMENBQTBDO2dCQUNwRCxTQUFTLEVBQUUsQ0FBQzt3QkFDVixPQUFPLEVBQUUsdUJBQXVCO3dCQUNoQyxVQUFVLEVBQUUsMkNBQTJDO3dCQUN2RCxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsY0FBTSxPQUFBLHNCQUFzQixFQUF0QixDQUFzQixDQUFDLENBQUM7cUJBQ2pELENBQUM7YUFDSDs7a0JBS0UsS0FBSzttQkFBQyxhQUFhOztrQkFHbkIsS0FBSzs7a0JBR0wsS0FBSzs7a0JBR0wsWUFBWTttQkFBQyxRQUFRLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgQ29udGVudENoaWxkLCBEaXJlY3RpdmUsIGZvcndhcmRSZWYsIElucHV0LCBOZ1pvbmUsIE9uQ2hhbmdlcywgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBWSVJUVUFMX1NDUk9MTF9TVFJBVEVHWSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9zY3JvbGxpbmcnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQsIGZpbHRlciwgbWFwLCB0YWtlVW50aWwsIHRha2VXaGlsZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFRhYmxlVmlydHVhbFNjcm9sbERhdGFTb3VyY2UgfSBmcm9tICcuL3RhYmxlLWRhdGEtc291cmNlJztcbmltcG9ydCB7IE1hdFRhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdGFibGUnO1xuaW1wb3J0IHsgRml4ZWRTaXplVGFibGVWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3kgfSBmcm9tICcuL2ZpeGVkLXNpemUtdGFibGUtdmlydHVhbC1zY3JvbGwtc3RyYXRlZ3knO1xuaW1wb3J0IHsgQ2RrSGVhZGVyUm93RGVmIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RhYmxlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuZXhwb3J0IGZ1bmN0aW9uIF90YWJsZVZpcnR1YWxTY3JvbGxEaXJlY3RpdmVTdHJhdGVneUZhY3RvcnkodGFibGVEaXI6IFRhYmxlSXRlbVNpemVEaXJlY3RpdmUpIHtcbiAgcmV0dXJuIHRhYmxlRGlyLnNjcm9sbFN0cmF0ZWd5O1xufVxuXG5jb25zdCBkZWZhdWx0cyA9IHtcbiAgcm93SGVpZ2h0OiA0OCxcbiAgaGVhZGVySGVpZ2h0OiA1NixcbiAgYnVmZmVyTXVsdGlwbGllcjogMC43XG59O1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdjZGstdmlydHVhbC1zY3JvbGwtdmlld3BvcnRbdHZzSXRlbVNpemVdJyxcbiAgcHJvdmlkZXJzOiBbe1xuICAgIHByb3ZpZGU6IFZJUlRVQUxfU0NST0xMX1NUUkFURUdZLFxuICAgIHVzZUZhY3Rvcnk6IF90YWJsZVZpcnR1YWxTY3JvbGxEaXJlY3RpdmVTdHJhdGVneUZhY3RvcnksXG4gICAgZGVwczogW2ZvcndhcmRSZWYoKCkgPT4gVGFibGVJdGVtU2l6ZURpcmVjdGl2ZSldXG4gIH1dXG59KVxuZXhwb3J0IGNsYXNzIFRhYmxlSXRlbVNpemVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkNoYW5nZXMsIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgYWxpdmUgPSB0cnVlO1xuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1pbnB1dC1yZW5hbWVcbiAgQElucHV0KCd0dnNJdGVtU2l6ZScpXG4gIHJvd0hlaWdodCA9IGRlZmF1bHRzLnJvd0hlaWdodDtcblxuICBASW5wdXQoKVxuICBoZWFkZXJIZWlnaHQgPSBkZWZhdWx0cy5oZWFkZXJIZWlnaHQ7XG5cbiAgQElucHV0KClcbiAgYnVmZmVyTXVsdGlwbGllciA9IGRlZmF1bHRzLmJ1ZmZlck11bHRpcGxpZXI7XG5cbiAgQENvbnRlbnRDaGlsZChNYXRUYWJsZSwge3N0YXRpYzogdHJ1ZX0pXG4gIHRhYmxlOiBNYXRUYWJsZTxhbnk+O1xuXG4gIHNjcm9sbFN0cmF0ZWd5ID0gbmV3IEZpeGVkU2l6ZVRhYmxlVmlydHVhbFNjcm9sbFN0cmF0ZWd5KCk7XG5cbiAgZGF0YVNvdXJjZUNoYW5nZXMgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgem9uZTogTmdab25lKSB7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmFsaXZlID0gZmFsc2U7XG4gICAgdGhpcy5kYXRhU291cmNlQ2hhbmdlcy5jb21wbGV0ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0FsaXZlKCkge1xuICAgIHJldHVybiAoKSA9PiB0aGlzLmFsaXZlO1xuICB9XG5cbiAgcHJpdmF0ZSBpc1N0aWNreUVuYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICEhdGhpcy5zY3JvbGxTdHJhdGVneS52aWV3cG9ydCAmJiAodGhpcy50YWJsZVsnX2hlYWRlclJvd0RlZnMnXSBhcyBDZGtIZWFkZXJSb3dEZWZbXSlcbiAgICAgIC5tYXAoZGVmID0+IGRlZi5zdGlja3kpXG4gICAgICAucmVkdWNlKChwcmV2U3RhdGUsIHN0YXRlKSA9PiBwcmV2U3RhdGUgJiYgc3RhdGUsIHRydWUpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgIGNvbnN0IHN3aXRjaERhdGFTb3VyY2VPcmlnaW4gPSB0aGlzLnRhYmxlWydfc3dpdGNoRGF0YVNvdXJjZSddO1xuICAgIHRoaXMudGFibGVbJ19zd2l0Y2hEYXRhU291cmNlJ10gPSAoZGF0YVNvdXJjZTogYW55KSA9PiB7XG4gICAgICBzd2l0Y2hEYXRhU291cmNlT3JpZ2luLmNhbGwodGhpcy50YWJsZSwgZGF0YVNvdXJjZSk7XG4gICAgICB0aGlzLmNvbm5lY3REYXRhU291cmNlKGRhdGFTb3VyY2UpO1xuICAgIH07XG5cbiAgICB0aGlzLmNvbm5lY3REYXRhU291cmNlKHRoaXMudGFibGUuZGF0YVNvdXJjZSk7XG5cbiAgICB0aGlzLnNjcm9sbFN0cmF0ZWd5LnN0aWNreUNoYW5nZVxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcigoKSA9PiB0aGlzLmlzU3RpY2t5RW5hYmxlZCgpKSxcbiAgICAgICAgdGFrZVdoaWxlKHRoaXMuaXNBbGl2ZSgpKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoc3RpY2t5T2Zmc2V0KSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RpY2t5KHN0aWNreU9mZnNldCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIGNvbm5lY3REYXRhU291cmNlKGRhdGFTb3VyY2U6IGFueSkge1xuICAgIHRoaXMuZGF0YVNvdXJjZUNoYW5nZXMubmV4dCgpO1xuICAgIGlmIChkYXRhU291cmNlIGluc3RhbmNlb2YgVGFibGVWaXJ0dWFsU2Nyb2xsRGF0YVNvdXJjZSkge1xuICAgICAgdGhpcy5zY3JvbGxTdHJhdGVneS5yZW5kZXJlZFJhbmdlU3RyZWFtXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIHRha2VVbnRpbCh0aGlzLmRhdGFTb3VyY2VDaGFuZ2VzKSxcbiAgICAgICAgICB0YWtlV2hpbGUodGhpcy5pc0FsaXZlKCkpXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZShyYW5nZSA9PiB7XG4gICAgICAgICAgdGhpcy56b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICBkYXRhU291cmNlLnJlbmRlcmVkUmFuZ2VTdHJlYW0ubmV4dChyYW5nZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgZGF0YVNvdXJjZS5jb25uZWN0KClcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgbWFwKCgpID0+IGRhdGFTb3VyY2UuZGF0YS5sZW5ndGgpLFxuICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgICAgICAgdGFrZVVudGlsKHRoaXMuZGF0YVNvdXJjZUNoYW5nZXMpLFxuICAgICAgICAgIHRha2VXaGlsZSh0aGlzLmlzQWxpdmUoKSlcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKChsZW5ndGgpID0+IHtcbiAgICAgICAgICB0aGlzLnNjcm9sbFN0cmF0ZWd5LmRhdGFMZW5ndGggPSBsZW5ndGg7XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1t0dnNJdGVtU2l6ZV0gcmVxdWlyZXMgVGFibGVWaXJ0dWFsU2Nyb2xsRGF0YVNvdXJjZSBiZSBzZXQgYXMgW2RhdGFTb3VyY2VdIG9mIFttYXQtdGFibGVdJyk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgY29uc3QgY29uZmlnID0ge1xuICAgICAgcm93SGVpZ2h0OiArdGhpcy5yb3dIZWlnaHQgfHwgZGVmYXVsdHMucm93SGVpZ2h0LFxuICAgICAgaGVhZGVySGVpZ2h0OiArdGhpcy5oZWFkZXJIZWlnaHQgfHwgZGVmYXVsdHMuaGVhZGVySGVpZ2h0LFxuICAgICAgYnVmZmVyTXVsdGlwbGllcjogK3RoaXMuYnVmZmVyTXVsdGlwbGllciB8fCBkZWZhdWx0cy5idWZmZXJNdWx0aXBsaWVyXG4gICAgfTtcbiAgICB0aGlzLnNjcm9sbFN0cmF0ZWd5LnNldENvbmZpZyhjb25maWcpO1xuICB9XG5cblxuICBzZXRTdGlja3kob2Zmc2V0KSB7XG4gICAgY29uc3Qgb2Zmc2V0U3RyaW5nID0gYC0ke29mZnNldH1weGA7XG5cbiAgICB0aGlzLnNjcm9sbFN0cmF0ZWd5LnZpZXdwb3J0LmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCd0aCcpXG4gICAgICAuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgIGVsLnN0eWxlLnRvcCA9IG9mZnNldFN0cmluZztcbiAgICAgIH0pO1xuICB9XG59XG4iXX0=