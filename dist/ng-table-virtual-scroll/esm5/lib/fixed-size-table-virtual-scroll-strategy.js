import { Injectable } from '@angular/core';
import { distinctUntilChanged } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import * as i0 from "@angular/core";
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
    FixedSizeTableVirtualScrollStrategy.ɵprov = i0.ɵɵdefineInjectable({ token: FixedSizeTableVirtualScrollStrategy, factory: FixedSizeTableVirtualScrollStrategy.ɵfac });
    return FixedSizeTableVirtualScrollStrategy;
}());
export { FixedSizeTableVirtualScrollStrategy };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(FixedSizeTableVirtualScrollStrategy, [{
        type: Injectable
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZml4ZWQtc2l6ZS10YWJsZS12aXJ0dWFsLXNjcm9sbC1zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLXRhYmxlLXZpcnR1YWwtc2Nyb2xsLyIsInNvdXJjZXMiOlsibGliL2ZpeGVkLXNpemUtdGFibGUtdmlydHVhbC1zY3JvbGwtc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFJaEQ7SUFBQTtRQUtVLGdCQUFXLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQztRQUNyQyxpQkFBWSxHQUFHLElBQUksT0FBTyxFQUFVLENBQUM7UUFJckMsd0JBQW1CLEdBQUcsSUFBSSxlQUFlLENBQVksRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBRS9FLHdCQUFtQixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUMsQ0FBQztRQVduRSxnQkFBVyxHQUFHLENBQUMsQ0FBQztLQWdFekI7SUF6RUMsc0JBQUksMkRBQVU7YUFBZDtZQUNFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUMxQixDQUFDO2FBRUQsVUFBZSxLQUFhO1lBQzFCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzdCLENBQUM7OztPQUxBO0lBU00sb0RBQU0sR0FBYixVQUFjLFFBQWtDO1FBQzlDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxtQkFB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SSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDekMsQ0FBQzswSEFyRlUsbUNBQW1DOytFQUFuQyxtQ0FBbUMsV0FBbkMsbUNBQW1DOzhDQVBoRDtDQTZGQyxBQXZGRCxJQXVGQztTQXRGWSxtQ0FBbUM7a0RBQW5DLG1DQUFtQztjQUQvQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZGlzdGluY3RVbnRpbENoYW5nZWQgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydCwgVmlydHVhbFNjcm9sbFN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3Njcm9sbGluZyc7XG5pbXBvcnQgeyBMaXN0UmFuZ2UgfSBmcm9tICdAYW5ndWxhci9jZGsvY29sbGVjdGlvbnMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRml4ZWRTaXplVGFibGVWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3kgaW1wbGVtZW50cyBWaXJ0dWFsU2Nyb2xsU3RyYXRlZ3kge1xuICBwcml2YXRlIHJvd0hlaWdodCE6IG51bWJlcjtcbiAgcHJpdmF0ZSBoZWFkZXJIZWlnaHQhOiBudW1iZXI7XG4gIHByaXZhdGUgYnVmZmVyTXVsdGlwbGllciE6IG51bWJlcjtcbiAgcHJpdmF0ZSBpbmRleENoYW5nZSA9IG5ldyBTdWJqZWN0PG51bWJlcj4oKTtcbiAgcHVibGljIHN0aWNreUNoYW5nZSA9IG5ldyBTdWJqZWN0PG51bWJlcj4oKTtcblxuICBwdWJsaWMgdmlld3BvcnQ6IENka1ZpcnR1YWxTY3JvbGxWaWV3cG9ydDtcblxuICBwdWJsaWMgcmVuZGVyZWRSYW5nZVN0cmVhbSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8TGlzdFJhbmdlPih7c3RhcnQ6IG51bGwsIGVuZDogbnVsbH0pO1xuXG4gIHB1YmxpYyBzY3JvbGxlZEluZGV4Q2hhbmdlID0gdGhpcy5pbmRleENoYW5nZS5waXBlKGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpO1xuXG4gIGdldCBkYXRhTGVuZ3RoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGFMZW5ndGg7XG4gIH1cblxuICBzZXQgZGF0YUxlbmd0aCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5fZGF0YUxlbmd0aCA9IHZhbHVlO1xuICAgIHRoaXMub25EYXRhTGVuZ3RoQ2hhbmdlZCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZGF0YUxlbmd0aCA9IDA7XG5cbiAgcHVibGljIGF0dGFjaCh2aWV3cG9ydDogQ2RrVmlydHVhbFNjcm9sbFZpZXdwb3J0KTogdm9pZCB7XG4gICAgdGhpcy52aWV3cG9ydCA9IHZpZXdwb3J0O1xuICAgIHRoaXMudmlld3BvcnQucmVuZGVyZWRSYW5nZVN0cmVhbS5zdWJzY3JpYmUodGhpcy5yZW5kZXJlZFJhbmdlU3RyZWFtKTtcbiAgICB0aGlzLm9uRGF0YUxlbmd0aENoYW5nZWQoKTtcbiAgICB0aGlzLnVwZGF0ZUNvbnRlbnQoKTtcbiAgfVxuXG4gIHB1YmxpYyBkZXRhY2goKTogdm9pZCB7XG4gICAgLy8gbm8tb3BcbiAgfVxuXG4gIHB1YmxpYyBvbkNvbnRlbnRTY3JvbGxlZCgpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZUNvbnRlbnQoKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkRhdGFMZW5ndGhDaGFuZ2VkKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnZpZXdwb3J0KSB7XG4gICAgICB0aGlzLnZpZXdwb3J0LnNldFRvdGFsQ29udGVudFNpemUodGhpcy5kYXRhTGVuZ3RoICogdGhpcy5yb3dIZWlnaHQgKyB0aGlzLmhlYWRlckhlaWdodCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG9uQ29udGVudFJlbmRlcmVkKCk6IHZvaWQge1xuICAgIC8vIG5vLW9wXG4gIH1cblxuICBwdWJsaWMgb25SZW5kZXJlZE9mZnNldENoYW5nZWQoKTogdm9pZCB7XG4gICAgLy8gbm8tb3BcbiAgfVxuXG4gIHB1YmxpYyBzY3JvbGxUb0luZGV4KGluZGV4OiBudW1iZXIsIGJlaGF2aW9yOiBTY3JvbGxCZWhhdmlvcik6IHZvaWQge1xuICAgIC8vIG5vLW9wXG4gIH1cblxuICBwdWJsaWMgc2V0Q29uZmlnKHtyb3dIZWlnaHQsIGhlYWRlckhlaWdodCwgYnVmZmVyTXVsdGlwbGllcn06IHsgcm93SGVpZ2h0OiBudW1iZXIsIGhlYWRlckhlaWdodDogbnVtYmVyLCBidWZmZXJNdWx0aXBsaWVyOiBudW1iZXIgfSkge1xuICAgIGlmICh0aGlzLnJvd0hlaWdodCA9PT0gcm93SGVpZ2h0IHx8IHRoaXMuaGVhZGVySGVpZ2h0ID09PSBoZWFkZXJIZWlnaHQgfHwgdGhpcy5idWZmZXJNdWx0aXBsaWVyID09PSBidWZmZXJNdWx0aXBsaWVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucm93SGVpZ2h0ID0gcm93SGVpZ2h0O1xuICAgIHRoaXMuaGVhZGVySGVpZ2h0ID0gaGVhZGVySGVpZ2h0O1xuICAgIHRoaXMuYnVmZmVyTXVsdGlwbGllciA9IGJ1ZmZlck11bHRpcGxpZXI7XG4gICAgdGhpcy51cGRhdGVDb250ZW50KCk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUNvbnRlbnQoKSB7XG4gICAgaWYgKCF0aGlzLnZpZXdwb3J0IHx8ICF0aGlzLnJvd0hlaWdodCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBzY3JvbGxPZmZzZXQgPSB0aGlzLnZpZXdwb3J0Lm1lYXN1cmVTY3JvbGxPZmZzZXQoKTtcbiAgICBjb25zdCBhbW91bnQgPSBNYXRoLmNlaWwodGhpcy52aWV3cG9ydC5nZXRWaWV3cG9ydFNpemUoKSAvIHRoaXMucm93SGVpZ2h0KTtcbiAgICBjb25zdCBvZmZzZXQgPSBNYXRoLm1heChzY3JvbGxPZmZzZXQgLSB0aGlzLmhlYWRlckhlaWdodCwgMCk7XG4gICAgY29uc3QgYnVmZmVyID0gTWF0aC5jZWlsKGFtb3VudCAqIHRoaXMuYnVmZmVyTXVsdGlwbGllcik7XG5cbiAgICBjb25zdCBza2lwID0gTWF0aC5yb3VuZChvZmZzZXQgLyB0aGlzLnJvd0hlaWdodCk7XG4gICAgY29uc3QgaW5kZXggPSBNYXRoLm1heCgwLCBza2lwKTtcbiAgICBjb25zdCBzdGFydCA9IE1hdGgubWF4KDAsIGluZGV4IC0gYnVmZmVyKTtcbiAgICBjb25zdCBlbmQgPSBNYXRoLm1pbih0aGlzLmRhdGFMZW5ndGgsIGluZGV4ICsgYW1vdW50ICsgYnVmZmVyKTtcbiAgICBjb25zdCByZW5kZXJlZE9mZnNldCA9IHN0YXJ0ICogdGhpcy5yb3dIZWlnaHQ7XG4gICAgdGhpcy52aWV3cG9ydC5zZXRSZW5kZXJlZENvbnRlbnRPZmZzZXQocmVuZGVyZWRPZmZzZXQpO1xuICAgIHRoaXMudmlld3BvcnQuc2V0UmVuZGVyZWRSYW5nZSh7c3RhcnQsIGVuZH0pO1xuICAgIHRoaXMuaW5kZXhDaGFuZ2UubmV4dChpbmRleCk7XG4gICAgdGhpcy5zdGlja3lDaGFuZ2UubmV4dChyZW5kZXJlZE9mZnNldCk7XG4gIH1cbn1cbiJdfQ==