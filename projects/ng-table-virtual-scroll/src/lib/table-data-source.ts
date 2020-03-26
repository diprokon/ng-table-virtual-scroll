import { BehaviorSubject, combineLatest, merge, Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ListRange } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { isNumber } from 'util';

export class TableVirtualScrollDataSource<T> extends MatTableDataSource<T> {
  public renderedRangeStream: Subject<ListRange>;

  _updateChangeSubscription() {
    this.initRenderedRangeStream();
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

    const sliced = combineLatest([paginatedData, this.renderedRangeStream.asObservable()])
      .pipe(
        map(
          ([
             data,
             {start, end}
           ]) => !isNumber(start) || !isNumber(end) ? data : data.slice(start, end)
        )
      );

    this._renderChangesSubscription.unsubscribe();
    this._renderChangesSubscription = sliced.subscribe(data => _renderData.next(data));
  }

  private initRenderedRangeStream() {
    if (!this.renderedRangeStream) {
      this.renderedRangeStream = new Subject<ListRange>();
    }
  }
}
