import { AfterContentInit, NgZone, OnChanges, OnDestroy } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { FixedSizeTableVirtualScrollStrategy } from './fixed-size-table-virtual-scroll-strategy';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export declare function _tableVirtualScrollDirectiveStrategyFactory(tableDir: TableItemSizeDirective): FixedSizeTableVirtualScrollStrategy;
export declare class TableItemSizeDirective implements OnChanges, AfterContentInit, OnDestroy {
    private zone;
    private alive;
    rowHeight: number;
    headerHeight: number;
    bufferMultiplier: number;
    table: MatTable<any>;
    scrollStrategy: FixedSizeTableVirtualScrollStrategy;
    dataSourceChanges: Subject<void>;
    constructor(zone: NgZone);
    ngOnDestroy(): void;
    private isAlive;
    private isStickyEnabled;
    ngAfterContentInit(): void;
    connectDataSource(dataSource: any): void;
    ngOnChanges(): void;
    setSticky(offset: any): void;
    static ɵfac: i0.ɵɵFactoryDef<TableItemSizeDirective>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<TableItemSizeDirective, "cdk-virtual-scroll-viewport[tvsItemSize]", never, { "rowHeight": "tvsItemSize"; "headerHeight": "headerHeight"; "bufferMultiplier": "bufferMultiplier"; }, {}, ["table"]>;
}
