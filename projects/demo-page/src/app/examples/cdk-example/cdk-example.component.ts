import { Component } from '@angular/core';
import { CdkTableVirtualScrollDataSource } from 'ng-table-virtual-scroll';

const DATA = Array.from({length: 1000}, (v, i) => ({
  id: i + 1,
  name: `Element #${i + 1}`
}));

@Component({
  selector: 'app-cdk-example',
  templateUrl: './cdk-example.component.html',
  styleUrls: ['./cdk-example.component.css']
})
export class CdkExampleComponent {

  displayedColumns = ['id', 'name'];

  dataSource = new CdkTableVirtualScrollDataSource(DATA);

}
