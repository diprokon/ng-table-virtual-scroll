import { Component } from '@angular/core';
import { TableVirtualScrollDataSource } from 'ng-table-virtual-scroll';
import { getData } from '../utils';

const DATA = getData(1000);

@Component({
  selector: 'app-sticky-column-example',
  templateUrl: './sticky-column-example.component.html',
  styleUrls: ['./sticky-column-example.component.css']
})
export class StickyColumnExampleComponent {
  displayedColumns = ['id', 'name', 'name', 'name', 'name', 'name', 'name', 'name', 'name', 'name'];

  dataSource = new TableVirtualScrollDataSource(DATA);
}
