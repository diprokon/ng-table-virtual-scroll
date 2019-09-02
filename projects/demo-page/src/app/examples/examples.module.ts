import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseExampleComponent } from './base-example/base-example.component';

const examples = [
  BaseExampleComponent
];

@NgModule({
  declarations: [
    ...examples
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...examples
  ],
  entryComponents: [
    ...examples
  ]
})
export class ExamplesModule { }
