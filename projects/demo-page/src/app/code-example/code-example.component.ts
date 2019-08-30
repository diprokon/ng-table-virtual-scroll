import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-code-example',
  templateUrl: './code-example.component.html',
  styleUrls: ['./code-example.component.scss']
})
export class CodeExampleComponent implements OnInit {

  @Input()
  component;

  constructor() {
  }

  ngOnInit() {
  }

}
