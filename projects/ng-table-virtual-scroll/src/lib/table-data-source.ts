import { BehaviorSubject, combineLatest, merge, Observable, of, Subject } from 'rxjs';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { map, startWith } from 'rxjs/operators';
import { ListRange } from '@angular/cdk/collections';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent, Sort } from '@angular/material';

// @ts-ignore: overwriting the MatTableDataSource private properties
export class TableVirtualScrollDataSource<T> extends MatTableDataSource<T> {
  private _sort: MatSort | null;
  private _paginator: MatPaginator | null;
  private readonly _internalPageChanges = new Subject<void>();
  private readonly _filter = new BehaviorSubject<string>('');
  private readonly _data: BehaviorSubject<T[]>;
  private readonly _renderData = new BehaviorSubject<T[]>([]);


  get viewport(): CdkVirtualScrollViewport {
    return this._viewport;
  }

  set viewport(value: CdkVirtualScrollViewport) {
    this._viewport = value;
    this._updateChangeSubscription();
  }

  private _viewport: CdkVirtualScrollViewport;

  _updateChangeSubscription() {
    const sortChange: Observable<Sort | null | void> = this._sort ?
      merge(this._sort.sortChange, this._sort.initialized) as Observable<Sort | void> :
      of(null);
    const pageChange: Observable<PageEvent | null | void> = this._paginator ?
      merge(
        this._paginator.page,
        this._internalPageChanges,
        this._paginator.initialized
      ) as Observable<PageEvent | void> :
      of(null);
    const dataStream = this._data;
    const filteredData = combineLatest([dataStream, this._filter])
      .pipe(map(([data]) => this._filterData(data)));
    const orderedData = combineLatest([filteredData, sortChange])
      .pipe(map(([data]) => this._orderData(data)));
    const paginatedData = combineLatest([orderedData, pageChange])
      .pipe(map(([data]) => this._pageData(data)));

    const sliced =
      this._viewport == null
        ? paginatedData
        : combineLatest([paginatedData, this._viewport.renderedRangeStream.pipe(startWith({} as ListRange))])
          .pipe(
            map(([data, {start, end}]) => start == null || end == null ? data : data.slice(start, end))
          );

    this._renderChangesSubscription.unsubscribe();
    this._renderChangesSubscription = sliced.subscribe(data => this._renderData.next(data));
  }
}
