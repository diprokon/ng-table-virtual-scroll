import { BaseExampleComponent } from './base-example/base-example.component';
import { FilterSortSelectExampleComponent } from './filter-sort-select-example/filter-sort-select-example.component';
import { StickyExampleComponent } from './sticky-example/sticky-example.component';
import { StickyColumnExampleComponent } from './sticky-column-example/sticky-column-example.component';

export * from './examples.module';

export interface Example {
  component: any;
  ts: string;
  html: string;
  css: string;
  title: string;
}

export const examples: Example[] = [
  {
    title: 'Base Example',
    component: BaseExampleComponent,
    ts: require('!!raw-loader!./base-example/base-example.component.ts'),
    html: require('!!raw-loader!./base-example/base-example.component.html'),
    css: require('!!raw-loader!./base-example/base-example.component.css')
  },
  {
    title: 'Table with filter, sort and selection',
    component: FilterSortSelectExampleComponent,
    ts: require('!!raw-loader!./filter-sort-select-example/filter-sort-select-example.component.ts'),
    html: require('!!raw-loader!./filter-sort-select-example/filter-sort-select-example.component.html'),
    css: require('!!raw-loader!./filter-sort-select-example/filter-sort-select-example.component.css')
  },
  {
    title: 'Table with sticky header',
    component: StickyExampleComponent,
    ts: require('!!raw-loader!./sticky-example/sticky-example.component.ts'),
    html: require('!!raw-loader!./sticky-example/sticky-example.component.html'),
    css: require('!!raw-loader!./sticky-example/sticky-example.component.css')
  },
  {
    title: 'Table with sticky column',
    component: StickyColumnExampleComponent,
    ts: require('!!raw-loader!./sticky-column-example/sticky-column-example.component.ts'),
    html: require('!!raw-loader!./sticky-column-example/sticky-column-example.component.html'),
    css: require('!!raw-loader!./sticky-column-example/sticky-column-example.component.css')
  }
];
