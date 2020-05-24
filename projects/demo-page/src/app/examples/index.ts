import { BaseExampleComponent } from './base-example/base-example.component';
import { FilterSortSelectExampleComponent } from './filter-sort-select-example/filter-sort-select-example.component';
import { StickyExampleComponent } from './sticky-example/sticky-example.component';
import { StickyColumnExampleComponent } from './sticky-column-example/sticky-column-example.component';
import { FooterExampleComponent } from './footer-example/footer-example.component';

export * from './examples.module';

export interface Example {
  component: any;
  ts: string;
  html: string;
  css: string;
  name: string;
  title: string;
}
function getExample(title: string, component, name: string): Example {
  return {
    title,
    name,
    component,
    ts: require(`!!raw-loader!../examples/${name}/${name}.component.ts`).default,
    html: require(`!!raw-loader!../examples/${name}/${name}.component.html`).default,
    css: require(`!!raw-loader!../examples/${name}/${name}.component.css`).default,
  };
}

export const examples: Example[] = [
  getExample('Base Example', BaseExampleComponent, 'base-example'),
  getExample('Table with footer', FooterExampleComponent, 'footer-example'),
  getExample('Table with filter, sort and selection', FilterSortSelectExampleComponent, 'filter-sort-select-example'),
  getExample('Table with sticky header', StickyExampleComponent, 'sticky-example'),
  getExample('Table with sticky column', StickyColumnExampleComponent, 'sticky-column-example'),
];
