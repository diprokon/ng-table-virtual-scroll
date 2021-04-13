import { Component } from '@angular/core';
import { TableVirtualScrollDataSource } from 'ng-table-virtual-scroll';

const DATA = Array.from({length: 1000}, (v, i) => ({
  id: i + 1,
  name: `Element #${i + 1}`
}));

@Component({
  selector: 'app-base-example',
  templateUrl: './base-example.component.html',
  styleUrls: ['./base-example.component.css']
})
export class BaseExampleComponent {

  displayedColumns = ['id', 'name'];

  dataSource = new TableVirtualScrollDataSource(DATA);

}
