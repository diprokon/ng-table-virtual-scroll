import { Component } from '@angular/core';
import { examples } from '../examples';


@Component({
  selector: 'app-examples-page',
  templateUrl: './examples-page.component.html',
  styleUrls: ['./examples-page.component.scss']
})
export class ExamplesPageComponent {

  examples = examples;

  constructor() {
  }

}
