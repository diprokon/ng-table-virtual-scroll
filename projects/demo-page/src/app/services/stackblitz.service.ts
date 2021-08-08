import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import stackBlitzSDK from '@stackblitz/sdk';
import { Example } from '../examples';
import { Utils } from '../utils';
import { APP_BASE_HREF } from '@angular/common';

function trimEndSlash(url: string): string {
  if (url[url.length - 1] === '/') {
    url = url.substring(0, url.length - 1);
  }
  return url;
}

const templatePath = '/assets/stackblitz/';
const templateFiles = [
  '.editorconfig',
  '.gitignore',
  'angular.json',
  '.browserslistrc',
  'package.json',
  'tsconfig.json',
  'tsconfig.app.json',
  'tslint.json',
  'src/index.html',
  'src/styles.scss',
  'src/polyfills.ts',
  'src/main.ts',
];
const replaceFilesPath = [
  'src/main.ts',
  'src/index.html',
];


@Injectable({
  providedIn: 'root'
})
export class StackblitzService {
  private files: { [path: string]: string } = {};

  constructor(
    private http: HttpClient,
    @Inject(APP_BASE_HREF) private baseHref: string,
  ) {
    this.setFiles();
  }

  open(example: Example): void {
    stackBlitzSDK.openProject({
      files: this.getFiles(example),
      title: 'ng-table-virtual-scroll | ' + example.title,
      description: example.title,
      template: 'angular-cli',
      tags: ['angular', 'material', 'virtual scroll', 'table', 'ng-table-virtual-scroll'],
      dependencies: {
        '@angular/cdk': '^11.2.5',
        '@angular/material': '^11.2.5',
        'ng-table-virtual-scroll': '*'
      },
    });
  }

  private setFiles(): void {
    templateFiles
      .forEach(fileUrl => {
        this.http.get(trimEndSlash(this.baseHref) + templatePath + fileUrl, { responseType: 'text' })
          .subscribe(content => {
            this.files[fileUrl] = content;
          });
      });
  }

  private getFiles(example: Example): { [path: string]: string } {
    const exampleFiles = ['ts', 'css', 'html'].reduce((files, ext) => {
      files[`src/app/${example.name}.component.${ext}`] = example[ext];
      return files;
    }, {});
    const replacedFiles = replaceFilesPath.reduce((files, path) => {
      files[path] = Utils.replace(this.files[path], {
        exampleComponentName: Utils.capitalize(Utils.toCamelCase(example.name)) + 'Component',
        exampleName: example.name,
        title: example.title
      });
      return files;
    }, {});

    return {
      ...this.files,
      ...exampleFiles,
      ...replacedFiles,
    };
  }
}
