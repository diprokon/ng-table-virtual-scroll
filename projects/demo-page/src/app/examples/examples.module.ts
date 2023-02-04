import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { TableVirtualScrollModule } from 'ng-table-virtual-scroll';
import { BaseExampleComponent } from './base-example/base-example.component';
import { CdkExampleComponent } from './cdk-example/cdk-example.component';
import { FilterSortSelectExampleComponent } from './filter-sort-select-example/filter-sort-select-example.component';
import { FooterExampleComponent } from './footer-example/footer-example.component';
import { StickyColumnExampleComponent } from './sticky-column-example/sticky-column-example.component';
import { StickyExampleComponent } from './sticky-example/sticky-example.component';

const examples = [
  BaseExampleComponent,
  CdkExampleComponent,
  FooterExampleComponent,
  FilterSortSelectExampleComponent,
  StickyExampleComponent,
  StickyColumnExampleComponent
];

@NgModule({
  declarations: [
    ...examples
  ],
  imports: [
    CommonModule,
    CdkTableModule,
    MatTableModule,
    ScrollingModule,
    TableVirtualScrollModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule
  ],
  exports: [
    ...examples
  ]
})
export class ExamplesModule {
}
