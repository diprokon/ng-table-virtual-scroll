import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Example } from '../examples';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Clipboard} from '@angular/cdk/clipboard';
import { StackblitzService } from '../services';

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

  @ViewChild('container', { read: ViewContainerRef, static: true })
  container: ViewContainerRef;

  exampleSnippets: { label: string; type: string; }[] = [
    {
      label: 'HTML',
      type: 'html',
    },
    {
      label: 'TS',
      type: 'ts',
    },
    {
      label: 'CSS',
      type: 'css',
    }
  ];

  constructor(
    private factoryResolver: ComponentFactoryResolver,
    private snackbar: MatSnackBar,
    private clipboard: Clipboard,
    private stackblitzService: StackblitzService,
  ) {
  }

  ngOnInit() {
    const factory = this.factoryResolver.resolveComponentFactory(this.example.component);
    this.container.createComponent(factory);
  }

  copySource(text: string) {
    if (this.clipboard.copy(text)) {
      this.snackbar.open('Code copied', '', { duration: 2500 });
    } else {
      this.snackbar.open('Copy failed. Please try again!', '', { duration: 2500 });
    }
  }

  openStackblitz() {
    this.stackblitzService.open(this.example);
  }
}
