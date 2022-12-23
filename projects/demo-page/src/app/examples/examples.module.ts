import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseExampleComponent } from './base-example/base-example.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TableVirtualScrollModule } from 'ng-table-virtual-scroll';
import { FilterSortSelectExampleComponent } from './filter-sort-select-example/filter-sort-select-example.component';
import { StickyExampleComponent } from './sticky-example/sticky-example.component';
import { StickyColumnExampleComponent } from './sticky-column-example/sticky-column-example.component';
import { FooterExampleComponent } from './footer-example/footer-example.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

const examples = [
  BaseExampleComponent,
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
