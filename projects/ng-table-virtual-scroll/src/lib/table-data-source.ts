import { BehaviorSubject, combineLatest, merge, Observable, of, ReplaySubject, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { DataSource } from '@angular/cdk/collections';

export interface TVSDataSource<T> {
  dataToRender$: Subject<T[]>;
  dataOfRange$: Subject<T[]>;
}

export function isTVSDataSource<T>(dataSource: unknown): dataSource is TVSDataSource<T> {
  return dataSource instanceof CdkTableVirtualScrollDataSource || dataSource instanceof TableVirtualScrollDataSource;
}

export class CdkTableVirtualScrollDataSource<T> extends DataSource<T> implements TVSDataSource<T> {
  /** Stream that emits when a new data array is set on the data source. */
  private readonly _data: BehaviorSubject<T[]>;

  /** Stream emitting render data to the table (depends on ordered data changes). */
  private readonly _renderData = new BehaviorSubject<T[]>([]);

  /**
   * Subscription to the changes that should trigger an update to the table's rendered rows, such
   * as filtering, sorting, pagination, or base data changes.
   */
  _renderChangesSubscription: Subscription | null = null;

  /** Array of data that should be rendered by the table, where each object represents one row. */
  get data() {
    return this._data.value;
  }

  set data(data: T[]) {
    data = Array.isArray(data) ? data : [];
    this._data.next(data);
  }

  public dataToRender$: Subject<T[]>;
  public dataOfRange$: Subject<T[]>;
  private streamsReady: boolean;


  constructor(initialData: T[] = []) {
    super();
    this._data = new BehaviorSubject<T[]>(initialData);
    this._updateChangeSubscription();
  }

  _updateChangeSubscription() {
    this.initStreams();

    this._renderChangesSubscription?.unsubscribe();
    this._renderChangesSubscription = new Subscription();
    this._renderChangesSubscription.add(
      this._data.subscribe(data => this.dataToRender$.next(data))
    );
    this._renderChangesSubscription.add(
      this.dataOfRange$.subscribe(data => this._renderData.next(data))
    );
  }

  connect() {
    if (!this._renderChangesSubscription) {
      this._updateChangeSubscription();
    }

    return this._renderData;
  }


  disconnect() {
    this._renderChangesSubscription?.unsubscribe();
    this._renderChangesSubscription = null;
  }

  private initStreams() {
    if (!this.streamsReady) {
      this.dataToRender$ = new ReplaySubject<T[]>(1);
      this.dataOfRange$ = new ReplaySubject<T[]>(1);
      this.streamsReady = true;
    }
  }
}

export class TableVirtualScrollDataSource<T> extends MatTableDataSource<T> implements TVSDataSource<T> {
  public dataToRender$: Subject<T[]>;
  public dataOfRange$: Subject<T[]>;
  private streamsReady: boolean;

  _updateChangeSubscription() {
    this.initStreams();
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

    this._renderChangesSubscription?.unsubscribe();
    this._renderChangesSubscription = new Subscription();
    this._renderChangesSubscription.add(
      paginatedData.subscribe(data => this.dataToRender$.next(data))
    );
    this._renderChangesSubscription.add(
      this.dataOfRange$.subscribe(data => _renderData.next(data))
    );
  }

  private initStreams() {
    if (!this.streamsReady) {
      this.dataToRender$ = new ReplaySubject<T[]>(1);
      this.dataOfRange$ = new ReplaySubject<T[]>(1);
      this.streamsReady = true;
    }
  }
}
