import { TestBed } from '@angular/core/testing';
import { TableDataSource } from './table-data-source';

describe('TableDataSourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TableDataSource = TestBed.get(TableDataSource);
    expect(service).toBeTruthy();
  });
});
