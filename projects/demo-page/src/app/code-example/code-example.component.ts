import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Example } from '../examples';

@Component({
  selector: 'app-code-example',
  templateUrl: './code-example.component.html',
  styleUrls: ['./code-example.component.scss']
})
export class CodeExampleComponent implements OnInit {

  @Input()
  title: string;

  @Input()
  example: Example;

  @ViewChild('container', { read: ViewContainerRef, static: true})
  container: ViewContainerRef;

  constructor(private factoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
    const factory = this.factoryResolver.resolveComponentFactory(this.example.component);
    this.container.createComponent(factory);
  }

}
