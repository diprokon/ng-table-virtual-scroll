import { TestBed } from '@angular/core/testing';
import { TableVirtualScrollDataSource } from './table-data-source';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { ListRange } from '@angular/cdk/collections';

interface TestData {
  index: number;
}

function getTestData(n = 10): TestData[] {
  return Array.from({length: n}).map((e, i) => ({index: i}));
}

// tslint:disable:no-string-literal
describe('TableVirtualScrollDataSource', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const dataSource: TableVirtualScrollDataSource<TestData> = new TableVirtualScrollDataSource<TestData>();
    expect(dataSource).toBeTruthy();

    const dataSource2: TableVirtualScrollDataSource<TestData> = new TableVirtualScrollDataSource<TestData>([{index: 0}]);
    expect(dataSource2).toBeTruthy();
  });

  it('should extend MatTableDataSource', () => {
    const dataSource: TableVirtualScrollDataSource<TestData> = new TableVirtualScrollDataSource<TestData>();
    expect(dataSource instanceof MatTableDataSource).toBeTruthy();
  });

  it('should have reaction on rangeStream changes', () => {
    const testData: TestData[] = getTestData();
    const dataSource: TableVirtualScrollDataSource<TestData> = new TableVirtualScrollDataSource<TestData>(testData);
    const stream = new Subject<ListRange>();

    stream.subscribe(dataSource.renderedRangeStream);

    const renderData: Subject<TestData[]> = dataSource['_renderData'];

    let count = -1; // renderData is BehaviorSubject with base value '[]'
    renderData.subscribe(() => {
      count++;
    });

    stream.next({start: 0, end: 1});
    stream.next({start: 0, end: testData.length});

    expect(count).toBe(2);
  });

  it('should provide correct data', () => {
    const testData: TestData[] = getTestData(10);
    const dataSource: TableVirtualScrollDataSource<TestData> = new TableVirtualScrollDataSource<TestData>(testData);
    const stream = new Subject<ListRange>();

    stream.subscribe(dataSource.renderedRangeStream);

    const renderData: Subject<TestData[]> = dataSource['_renderData'];

    const results: TestData[][] = [];

    renderData.subscribe((data) => {
      results.push(data);
    });

    stream.next({start: 0, end: 2});
    stream.next({start: 8, end: testData.length});

    expect(results).toEqual([
      [],
      [{index: 0}, {index: 1}],
      [{index: 8}, {index: 9}]
    ]);
  });
});
