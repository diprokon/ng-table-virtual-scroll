# Virtual Scroll for Angular Material Table

An Angular Directive, which allow to use [virtual scrolling](https://material.angular.io/cdk/scrolling) in [mat-table](https://material.angular.io/components/table)

[![Demo](https://img.shields.io/badge/demo-online-ed1c46.svg)](https://diprokon.github.io/ng-table-virtual-scroll)
[![npm](https://img.shields.io/npm/v/ng-table-virtual-scroll.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ng-table-virtual-scroll)
[![Build & Test](https://github.com/diprokon/ng-table-virtual-scroll/actions/workflows/build-and-test.yml/badge.svg?branch=master&event=push)](https://github.com/diprokon/ng-table-virtual-scroll/actions/workflows/build-and-test.yml)
[![License](https://img.shields.io/npm/l/express.svg?maxAge=2592000)](/LICENSE.txt)

## Table of Contents

- [Live Demo](https://diprokon.github.io/ng-table-virtual-scroll)
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [Issues](#issues)

<a name="installation"/>

## Installation

**NPM**

```bash
$ npm install -save ng-table-virtual-scroll
```

_**Version compatibility**_

| Angular version | Library version |
|-----------------|-----------------|
| \>= 15          | latest          |
| 13 - 14         | 1.5.*           |
| <= 12           | 1.3.*           |


<a name="usage"/>

## Usage

### Import `TableVirtualScrollModule`

```ts
import { TableVirtualScrollModule } from 'ng-table-virtual-scroll';

@NgModule({
  imports: [
    // ...
    TableVirtualScrollModule
  ]
})
export class AppModule { }
```
**Note: you need to install and configure [virtual scrolling](https://material.angular.io/cdk/scrolling) (ScrollingModule) and [mat-table](https://material.angular.io/components/table) (MatTableModule) before. TableVirtualScroll only make them work together properly**

### Configure the table

#### Data Source

The `TableVirtualScrollDataSource` extends the [`MatTableDataSource`](https://material.angular.io/components/table/api#MatTableDataSource) and must be 
used as the data source for the `mat-table` (`CdkTableVirtualScrollDataSource` for `cdk-table`)

**Note: without `TableVirtualScrollDataSource` the directive won't work**

```ts
import { TableVirtualScrollDataSource } from 'ng-table-virtual-scroll';

@Component({...})
export class MyComponent {

  dataSource = new TableVirtualScrollDataSource();

}
```

#### Directive
The `tvsItemSize` directive makes the magic

```html
<cdk-virtual-scroll-viewport tvsItemSize="48" headerHeight="56" style="height: 400px;">
    <table mat-table [dataSource]="dataSource">
    ...
    </table>
</cdk-virtual-scroll-viewport>
```

Make sure, you set the height to the `<cdk-virtual-scroll-viewport>` container

Also, you can provide additional properties:

`tvsItemSize` -> the row height in px (default: 48)

`headerHeight` -> the header row height in px (default: 56)

`footerHeight` -> the footer row height in px (default: 48)

`headerEnabled` -> is the header row in the table (default: true)

`footerEnabled` -> is the footer row in the table (default: false)

`bufferMultiplier` -> the size of rendered buffer. The `bufferMultiplier * visibleRowsCount` number of rows will be rendered before and after visible part of the table.

#### CdkTable

`cdk-table` from `CdkTableModule` is also supported. Just use `CdkTableVirtualScrollDataSource` as datasource

## Issues

If you identify any errors in the library, or have an idea for an improvement, please open an [issue](https://github.com/diprokon/ng-table-virtual-scroll/issues).
