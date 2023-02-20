import { APP_BASE_HREF } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import stackBlitzSDK from '@stackblitz/sdk';
import { Example } from '../examples';
import { Utils } from '../utils';

function trimEndSlash(url: string): string {
  if (url[url.length - 1] === '/') {
    url = url.substring(0, url.length - 1);
  }
  return url;
}

const templatePath = '/assets/stackblitz/';
const templateFiles = [
  'angular.json',
  'package.json',
  'src/index.html',
  'src/styles.scss',
  'src/polyfills.ts',
  'src/main.ts',
];
const replaceFilesPath = [
  'src/main.ts',
  'src/index.html',
];

function getFilePath(example: Example, ext: 'ts' | 'css' | 'html') {
  return `src/app/${example.name}.component.${ext}`;
}


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
    stackBlitzSDK.openProject(
      {
        files: this.getFiles(example),
        title: 'ng-table-virtual-scroll | ' + example.title,
        description: example.title,
        template: 'angular-cli',
        dependencies: {
          '@angular/cdk': '*',
          '@angular/material': '*',
          'ng-table-virtual-scroll': '*'
        }
      },
      {
        openFile: [getFilePath(example, 'ts'), getFilePath(example, 'html')]
      }
    );
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
    const exampleFiles = (['ts', 'css', 'html'] as const).reduce((files, ext) => {
      files[getFilePath(example, ext)] = example[ext];
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
