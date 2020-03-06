import { __extends, __read } from "tslib";
import { combineLatest, merge, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
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
export { TableVirtualScrollDataSource };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtZGF0YS1zb3VyY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy10YWJsZS12aXJ0dWFsLXNjcm9sbC8iLCJzb3VyY2VzIjpbImxpYi90YWJsZS1kYXRhLXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFtQixhQUFhLEVBQUUsS0FBSyxFQUFjLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEYsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBSXJDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRTdEO0lBQXFELGdEQUFxQjtJQUExRTs7SUEyQ0EsQ0FBQztJQXhDQyxnRUFBeUIsR0FBekI7UUFBQSxpQkFpQ0M7UUFoQ0MsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFDL0IsSUFBTSxLQUFLLEdBQW1CLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QyxJQUFNLFVBQVUsR0FBd0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzNELElBQU0sb0JBQW9CLEdBQWtCLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQ3pFLElBQU0sT0FBTyxHQUE0QixJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDekQsSUFBTSxXQUFXLEdBQXlCLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUU5RCxJQUFNLFVBQVUsR0FBbUMsS0FBSyxDQUFDLENBQUM7WUFDeEQsS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLFdBQVcsQ0FBNEIsQ0FBQyxDQUFDO1lBQ3ZFLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNYLElBQU0sVUFBVSxHQUF3QyxVQUFVLENBQUMsQ0FBQztZQUNsRSxLQUFLLENBQ0gsVUFBVSxDQUFDLElBQUksRUFDZixvQkFBb0IsRUFDcEIsVUFBVSxDQUFDLFdBQVcsQ0FDUyxDQUFDLENBQUM7WUFDbkMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ1gsSUFBTSxVQUFVLEdBQW9CLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsRCxJQUFNLFlBQVksR0FBRyxhQUFhLENBQUMsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7YUFDdEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEVBQU07Z0JBQU4sa0JBQU0sRUFBTCxZQUFJO1lBQU0sT0FBQSxLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztRQUF0QixDQUFzQixDQUFDLENBQUMsQ0FBQztRQUNqRCxJQUFNLFdBQVcsR0FBRyxhQUFhLENBQUMsQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7YUFDMUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEVBQU07Z0JBQU4sa0JBQU0sRUFBTCxZQUFJO1lBQU0sT0FBQSxLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQztRQUFyQixDQUFxQixDQUFDLENBQUMsQ0FBQztRQUNoRCxJQUFNLGFBQWEsR0FBRyxhQUFhLENBQUMsQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUM7YUFDM0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEVBQU07Z0JBQU4sa0JBQU0sRUFBTCxZQUFJO1lBQU0sT0FBQSxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztRQUFwQixDQUFvQixDQUFDLENBQUMsQ0FBQztRQUUvQyxJQUFNLE1BQU0sR0FBRyxhQUFhLENBQUMsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7YUFDbkYsSUFBSSxDQUNILEdBQUcsQ0FBQyxVQUFDLEVBQW9CO2dCQUFwQixrQkFBb0IsRUFBbkIsWUFBSSxFQUFFLFVBQVksRUFBWCxnQkFBSyxFQUFFLFlBQUc7WUFBTyxPQUFBLEtBQUssSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7UUFBNUQsQ0FBNEQsQ0FBQyxDQUM1RixDQUFDO1FBRUosSUFBSSxDQUFDLDBCQUEwQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzlDLElBQUksQ0FBQywwQkFBMEIsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBdEIsQ0FBc0IsQ0FBQyxDQUFDO0lBQ3JGLENBQUM7SUFFTyw4REFBdUIsR0FBL0I7UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFO1lBQzdCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLE9BQU8sRUFBYSxDQUFDO1NBQ3JEO0lBQ0gsQ0FBQztJQUNILG1DQUFDO0FBQUQsQ0FBQyxBQTNDRCxDQUFxRCxrQkFBa0IsR0EyQ3RFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBjb21iaW5lTGF0ZXN0LCBtZXJnZSwgT2JzZXJ2YWJsZSwgb2YsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IExpc3RSYW5nZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2xsZWN0aW9ucyc7XG5pbXBvcnQgeyBNYXRQYWdpbmF0b3IsIFBhZ2VFdmVudCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3BhZ2luYXRvcic7XG5pbXBvcnQgeyBNYXRTb3J0LCBTb3J0IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc29ydCc7XG5pbXBvcnQgeyBNYXRUYWJsZURhdGFTb3VyY2UgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90YWJsZSc7XG5cbmV4cG9ydCBjbGFzcyBUYWJsZVZpcnR1YWxTY3JvbGxEYXRhU291cmNlPFQ+IGV4dGVuZHMgTWF0VGFibGVEYXRhU291cmNlPFQ+IHtcbiAgcHVibGljIHJlbmRlcmVkUmFuZ2VTdHJlYW06IFN1YmplY3Q8TGlzdFJhbmdlPjtcblxuICBfdXBkYXRlQ2hhbmdlU3Vic2NyaXB0aW9uKCkge1xuICAgIHRoaXMuaW5pdFJlbmRlcmVkUmFuZ2VTdHJlYW0oKTtcbiAgICBjb25zdCBfc29ydDogTWF0U29ydCB8IG51bGwgPSB0aGlzWydfc29ydCddO1xuICAgIGNvbnN0IF9wYWdpbmF0b3I6IE1hdFBhZ2luYXRvciB8IG51bGwgPSB0aGlzWydfcGFnaW5hdG9yJ107XG4gICAgY29uc3QgX2ludGVybmFsUGFnZUNoYW5nZXM6IFN1YmplY3Q8dm9pZD4gPSB0aGlzWydfaW50ZXJuYWxQYWdlQ2hhbmdlcyddO1xuICAgIGNvbnN0IF9maWx0ZXI6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmc+ID0gdGhpc1snX2ZpbHRlciddO1xuICAgIGNvbnN0IF9yZW5kZXJEYXRhOiBCZWhhdmlvclN1YmplY3Q8VFtdPiA9IHRoaXNbJ19yZW5kZXJEYXRhJ107XG5cbiAgICBjb25zdCBzb3J0Q2hhbmdlOiBPYnNlcnZhYmxlPFNvcnQgfCBudWxsIHwgdm9pZD4gPSBfc29ydCA/XG4gICAgICBtZXJnZShfc29ydC5zb3J0Q2hhbmdlLCBfc29ydC5pbml0aWFsaXplZCkgYXMgT2JzZXJ2YWJsZTxTb3J0IHwgdm9pZD4gOlxuICAgICAgb2YobnVsbCk7XG4gICAgY29uc3QgcGFnZUNoYW5nZTogT2JzZXJ2YWJsZTxQYWdlRXZlbnQgfCBudWxsIHwgdm9pZD4gPSBfcGFnaW5hdG9yID9cbiAgICAgIG1lcmdlKFxuICAgICAgICBfcGFnaW5hdG9yLnBhZ2UsXG4gICAgICAgIF9pbnRlcm5hbFBhZ2VDaGFuZ2VzLFxuICAgICAgICBfcGFnaW5hdG9yLmluaXRpYWxpemVkXG4gICAgICApIGFzIE9ic2VydmFibGU8UGFnZUV2ZW50IHwgdm9pZD4gOlxuICAgICAgb2YobnVsbCk7XG4gICAgY29uc3QgZGF0YVN0cmVhbTogT2JzZXJ2YWJsZTxUW10+ID0gdGhpc1snX2RhdGEnXTtcbiAgICBjb25zdCBmaWx0ZXJlZERhdGEgPSBjb21iaW5lTGF0ZXN0KFtkYXRhU3RyZWFtLCBfZmlsdGVyXSlcbiAgICAgIC5waXBlKG1hcCgoW2RhdGFdKSA9PiB0aGlzLl9maWx0ZXJEYXRhKGRhdGEpKSk7XG4gICAgY29uc3Qgb3JkZXJlZERhdGEgPSBjb21iaW5lTGF0ZXN0KFtmaWx0ZXJlZERhdGEsIHNvcnRDaGFuZ2VdKVxuICAgICAgLnBpcGUobWFwKChbZGF0YV0pID0+IHRoaXMuX29yZGVyRGF0YShkYXRhKSkpO1xuICAgIGNvbnN0IHBhZ2luYXRlZERhdGEgPSBjb21iaW5lTGF0ZXN0KFtvcmRlcmVkRGF0YSwgcGFnZUNoYW5nZV0pXG4gICAgICAucGlwZShtYXAoKFtkYXRhXSkgPT4gdGhpcy5fcGFnZURhdGEoZGF0YSkpKTtcblxuICAgIGNvbnN0IHNsaWNlZCA9IGNvbWJpbmVMYXRlc3QoW3BhZ2luYXRlZERhdGEsIHRoaXMucmVuZGVyZWRSYW5nZVN0cmVhbS5hc09ic2VydmFibGUoKV0pXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKChbZGF0YSwge3N0YXJ0LCBlbmR9XSkgPT4gc3RhcnQgPT0gbnVsbCB8fCBlbmQgPT0gbnVsbCA/IGRhdGEgOiBkYXRhLnNsaWNlKHN0YXJ0LCBlbmQpKVxuICAgICAgKTtcblxuICAgIHRoaXMuX3JlbmRlckNoYW5nZXNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9yZW5kZXJDaGFuZ2VzU3Vic2NyaXB0aW9uID0gc2xpY2VkLnN1YnNjcmliZShkYXRhID0+IF9yZW5kZXJEYXRhLm5leHQoZGF0YSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0UmVuZGVyZWRSYW5nZVN0cmVhbSgpIHtcbiAgICBpZiAoIXRoaXMucmVuZGVyZWRSYW5nZVN0cmVhbSkge1xuICAgICAgdGhpcy5yZW5kZXJlZFJhbmdlU3RyZWFtID0gbmV3IFN1YmplY3Q8TGlzdFJhbmdlPigpO1xuICAgIH1cbiAgfVxufVxuIl19