import { Type } from '@angular/core';
import { BaseExampleComponent } from './base-example/base-example.component';
import { CdkExampleComponent } from './cdk-example/cdk-example.component';
import { FilterSortSelectExampleComponent } from './filter-sort-select-example/filter-sort-select-example.component';
import { FooterExampleComponent } from './footer-example/footer-example.component';
import { StickyColumnExampleComponent } from './sticky-column-example/sticky-column-example.component';
import { StickyExampleComponent } from './sticky-example/sticky-example.component';

export * from './examples.module';

export interface Example {
  component: Type<any>;
  ts: string;
  html: string;
  css: string;
  name: string;
  title: string;
}

function getExample(title: string, component: Type<any>, name: string): Example {
  return {
    title,
    name,
    component,
    ts: require(`!!../examples/${name}/${name}.component.ts?raw`),
    html: require(`!!../examples/${name}/${name}.component.html?raw`),
    css: require(`!!../examples/${name}/${name}.component.css?raw`),
  };
}

export const examples: Example[] = [
  getExample('Base Example', BaseExampleComponent, 'base-example'),
  getExample('Cdk Example', CdkExampleComponent, 'cdk-example'),
  getExample('Table with footer', FooterExampleComponent, 'footer-example'),
  getExample('Table with filter, sort and selection', FilterSortSelectExampleComponent, 'filter-sort-select-example'),
  getExample('Table with sticky header', StickyExampleComponent, 'sticky-example'),
  getExample('Table with sticky column', StickyColumnExampleComponent, 'sticky-column-example'),
];
