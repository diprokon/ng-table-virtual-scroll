import { FixedSizeTableVirtualScrollStrategy } from './fixed-size-table-virtual-scroll-strategy';
import { TestBed } from '@angular/core/testing';

describe('FixedSizeTableVirtualScrollStrategy', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should create an instance', () => {
    expect(new FixedSizeTableVirtualScrollStrategy()).toBeTruthy();
  });
});
