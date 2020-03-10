import { Component } from '@angular/core';
import { TableVirtualScrollDataSource } from 'ng-table-virtual-scroll';
import { getData } from '../utils';

const DATA = getData(1000);

@Component({
  selector: 'app-footer-example',
  templateUrl: './footer-example.component.html',
  styleUrls: ['./footer-example.component.css']
})
export class FooterExampleComponent {

  displayedColumns = ['id', 'name'];

  dataSource = new TableVirtualScrollDataSource(DATA);

}
