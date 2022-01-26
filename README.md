# Virtual Scroll for Angular Material Table

An Angular Directive, which allow to use [virtual scrolling](https://material.angular.io/cdk/scrolling) in [mat-table](https://material.angular.io/components/table)

[![npm](https://img.shields.io/badge/demo-online-ed1c46.svg)](https://diprokon.github.io/ng-table-virtual-scroll)
[![npm](https://img.shields.io/npm/v/ng-table-virtual-scroll.svg?maxAge=2592000?style=plastic)](https://www.npmjs.com/package/ng-table-virtual-scroll)
![Travis (.org) branch](https://img.shields.io/travis/diprokon/ng-table-virtual-scroll/master)
[![npm](https://img.shields.io/npm/l/express.svg?maxAge=2592000)](/LICENSE.txt)

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

_For angular version 12 (or less), please use library version __1.3.\*___
```bash
$ npm install -save ng-table-virtual-scroll@1.3.*
```

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
used as the data source for the `mat-table`

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

<a name="development"/>

## Development

This project uses Angular CLI to build the package.

```bash
$ npm run build:lib ng-table-virtual-scroll
```

## Issues

If you identify any errors in the library, or have an idea for an improvement, please open an [issue](https://github.com/diprokon/ng-table-virtual-scroll/issues).
