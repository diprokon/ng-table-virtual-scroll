import { Component, OnInit } from '@angular/core';
import { examples } from '../examples';


@Component({
  selector: 'app-examples-page',
  templateUrl: './examples-page.component.html',
  styleUrls: ['./examples-page.component.scss']
})
export class ExamplesPageComponent implements OnInit {

  baseExample = examples.base;

  constructor() {
  }

  ngOnInit() {

  }

}
