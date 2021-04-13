import { Component } from '@angular/core';
import { TableVirtualScrollDataSource } from 'ng-table-virtual-scroll';

const DATA = Array.from({length: 1000}, (v, i) => ({
  id: i + 1,
  name: `Element #${i + 1}`
}));

@Component({
  selector: 'app-sticky-column-example',
  templateUrl: './sticky-column-example.component.html',
  styleUrls: ['./sticky-column-example.component.css']
})
export class StickyColumnExampleComponent {
  displayedColumns = ['id', 'name', 'name', 'name', 'name', 'name', 'name', 'name', 'name', 'name'];

  dataSource = new TableVirtualScrollDataSource(DATA);
}
