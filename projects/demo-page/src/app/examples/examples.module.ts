import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseExampleComponent } from './base-example/base-example.component';
import { MatCheckboxModule, MatFormFieldModule, MatInputModule, MatSortModule, MatTableModule } from '@angular/material';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TableVirtualScrollModule } from 'ng-table-virtual-scroll';
import { FilterSortSelectExampleComponent } from './filter-sort-select-example/filter-sort-select-example.component';

const examples = [
  BaseExampleComponent,
  FilterSortSelectExampleComponent
];

@NgModule({
  declarations: [
    ...examples
  ],
  imports: [
    CommonModule,
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
  ],
  entryComponents: [
    ...examples
  ]
})
export class ExamplesModule {
}
