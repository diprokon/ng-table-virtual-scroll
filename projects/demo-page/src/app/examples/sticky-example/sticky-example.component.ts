import { Component } from '@angular/core';
import { TableVirtualScrollDataSource } from 'ng-table-virtual-scroll';
import { getData } from '../utils';

const DATA = getData(1000);

@Component({
  selector: 'app-base-example',
  templateUrl: './sticky-example.component.html',
  styleUrls: ['./sticky-example.component.css']
})
export class StickyExampleComponent {

  displayedColumns = ['id', 'name'];

  dataSource = new TableVirtualScrollDataSource(DATA);

}
