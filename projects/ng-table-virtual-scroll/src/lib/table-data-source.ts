import { BehaviorSubject, combineLatest, merge, Observable, of, Subject } from 'rxjs';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { map, startWith } from 'rxjs/operators';
import { ListRange } from '@angular/cdk/collections';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent, Sort } from '@angular/material';

// tslint:disable:variable-name
// tslint:disable:no-string-literal
export class TableVirtualScrollDataSource<T> extends MatTableDataSource<T> {
  get viewport(): CdkVirtualScrollViewport {
    return this._viewport;
  }

  set viewport(value: CdkVirtualScrollViewport) {
    this._viewport = value;
    this._updateChangeSubscription();
  }

  private _viewport: CdkVirtualScrollViewport;

  _updateChangeSubscription() {
    const _sort: MatSort | null = this['_sort'];
    const _paginator: MatPaginator | null = this['_paginator'];
    const _internalPageChanges: Subject<void> = this['_internalPageChanges'];
    const _filter: BehaviorSubject<string> = this['_filter'];
    const _renderData: BehaviorSubject<T[]> = this['_renderData'];

    const sortChange: Observable<Sort | null | void> = _sort ?
      merge(_sort.sortChange, _sort.initialized) as Observable<Sort | void> :
      of(null);
    const pageChange: Observable<PageEvent | null | void> = _paginator ?
      merge(
        _paginator.page,
        _internalPageChanges,
        _paginator.initialized
      ) as Observable<PageEvent | void> :
      of(null);
    const dataStream: Observable<T[]> = this['_data'];
    const filteredData = combineLatest([dataStream, _filter])
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
    this._renderChangesSubscription = sliced.subscribe(data => _renderData.next(data));
  }
}
