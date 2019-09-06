import { BaseExampleComponent } from './base-example/base-example.component';
import { FilterSortSelectExampleComponent } from './filter-sort-select-example/filter-sort-select-example.component';

export * from './examples.module';

export interface Example {
  component: any;
  ts: string;
  html: string;
  css: string;
}

interface Examples {
  [key: string]: Example;
}

export const examples: Examples = {
  base: {
    component: BaseExampleComponent,
    ts: require('!!raw-loader!./base-example/base-example.component.ts'),
    html: require('!!raw-loader!./base-example/base-example.component.html'),
    css: require('!!raw-loader!./base-example/base-example.component.css')
  },
  filterSortSelect: {
    component: FilterSortSelectExampleComponent,
    ts: require('!!raw-loader!./filter-sort-select-example/filter-sort-select-example.component.ts'),
    html: require('!!raw-loader!./filter-sort-select-example/filter-sort-select-example.component.html'),
    css: require('!!raw-loader!./filter-sort-select-example/filter-sort-select-example.component.css')
  }
};
