import { Component } from '@angular/core';

const snippets = {
  importModule: `import { TableVirtualScrollModule } from 'ng-table-virtual-scroll';

@NgModule({
  imports: [
    // ...
    TableVirtualScrollModule
  ]
})
export class AppModule { }
`
};


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
  snippets = snippets;

  versionCompatibilityColumns = ['ng', 'lib'];
  versionCompatibility = Object.entries({
    '\>= 15': 'latest',
    '13 - 14': '1.5.*',
    '<= 12': '1.3.*'
  });
}
