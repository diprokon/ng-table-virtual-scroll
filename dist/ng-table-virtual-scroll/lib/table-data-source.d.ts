import { Subject } from 'rxjs';
import { ListRange } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
export declare class TableVirtualScrollDataSource<T> extends MatTableDataSource<T> {
    renderedRangeStream: Subject<ListRange>;
    _updateChangeSubscription(): void;
    private initRenderedRangeStream;
}
