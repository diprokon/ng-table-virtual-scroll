import { DataSource } from '@angular/cdk/collections';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { CdkTableModule } from '@angular/cdk/table';
import { Component, Type, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatLegacyTableModule } from '@angular/material/legacy-table';
import { MatTableModule } from '@angular/material/table';
import { mount } from 'cypress/angular';
import { CdkTableVirtualScrollDataSource, TableVirtualScrollDataSource } from './table-data-source';
import { TableItemSizeDirective } from './table-item-size.directive';

interface Data {
  id: number;
}

const ITEMS_COUNT = 5000;
const ITEMS_COUNT2 = 500;

const VIEWPORT_HEIGHT = 200;
const ROW_HEIGHT = 20;
const HEADER_HEIGHT = 30;
const FOOTER_HEIGHT = 15;
const BUFFER_MULTIPLIER = 0.5;

const VISIBLE_ITEMS_COUNT = Math.ceil(VIEWPORT_HEIGHT / ROW_HEIGHT);

abstract class TestComponent {
  headerEnabled = true;
  footerEnabled = false;
  stickyHeader = false;
  stickyFooter = false;

  @ViewChild(CdkVirtualScrollViewport, { static: true })
  viewport: CdkVirtualScrollViewport;

  @ViewChild(TableItemSizeDirective, { static: true })
  directive: TableItemSizeDirective;

  displayedColumns = ['id'];

  data = Array(ITEMS_COUNT).fill(0).map((_, i) => ({ id: i }));
  data2 = Array(ITEMS_COUNT2).fill(0).map((_, i) => ({ id: i + ITEMS_COUNT }));

  dataSource = new this.dataSourceClass(this.data);

  protected constructor(protected dataSourceClass: Type<DataSource<Data>>) {
  }

  changeDataSource() {
    this.dataSource = new this.dataSourceClass(this.data2);
  }
}

@Component({
  template: `
    <cdk-virtual-scroll-viewport tvsItemSize="${ROW_HEIGHT}"
                                 headerHeight="${HEADER_HEIGHT}"
                                 footerHeight="${FOOTER_HEIGHT}"
                                 bufferMultiplier="${BUFFER_MULTIPLIER}"
                                 [headerEnabled]="headerEnabled"
                                 [footerEnabled]="footerEnabled"
                                 class="wrapper">

      <table mat-table [dataSource]="dataSource">

        <ng-container *ngIf="headerEnabled">
          <tr mat-header-row *matHeaderRowDef="displayedColumns; sticky: stickyHeader"></tr>
        </ng-container>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        <ng-container *ngIf="footerEnabled">
          <tr mat-footer-row *matFooterRowDef="displayedColumns; sticky: stickyFooter"></tr>
        </ng-container>

        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef>No.</th>
          <td mat-cell *matCellDef="let element">el - {{element.id}}</td>
          <td mat-footer-cell *matFooterCellDef class="footer-cell">End.</td>
        </ng-container>

      </table>

    </cdk-virtual-scroll-viewport>
    <button (click)="changeDataSource()" data-cy="changeDataSource">changeDataSource</button>
  `,
  styles: [`
    .wrapper {
      height: ${VIEWPORT_HEIGHT}px;
    }

    table {
      border-collapse: collapse;
    }

    tr {
      height: auto !important;
    }

    th {
      height: ${HEADER_HEIGHT}px !important;
    }

    td {
      height: ${ROW_HEIGHT}px !important;
    }

    th, td {
      padding: 0 !important;
      margin: 0 !important;
      border-width: 0 !important;
      border-style: none !important;
      font-size: 8px;
    }

    .footer-cell {
      height: ${FOOTER_HEIGHT}px !important;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
class MatTableTestComponent extends TestComponent {
  constructor() {
    super(TableVirtualScrollDataSource);
  }
}


@Component({
  template: `
    <cdk-virtual-scroll-viewport tvsItemSize="${ROW_HEIGHT}"
                                 headerHeight="${HEADER_HEIGHT}"
                                 footerHeight="${FOOTER_HEIGHT}"
                                 bufferMultiplier="${BUFFER_MULTIPLIER}"
                                 [headerEnabled]="headerEnabled"
                                 [footerEnabled]="footerEnabled"
                                 class="wrapper">

      <table cdk-table [dataSource]="dataSource">

        <ng-container *ngIf="headerEnabled">
          <tr cdk-header-row *cdkHeaderRowDef="displayedColumns; sticky: stickyHeader"></tr>
        </ng-container>
        <tr cdk-row *cdkRowDef="let row; columns: displayedColumns;"></tr>
        <ng-container *ngIf="footerEnabled">
          <tr cdk-footer-row *cdkFooterRowDef="displayedColumns; sticky: stickyFooter"></tr>
        </ng-container>

        <ng-container cdkColumnDef="id">
          <th cdk-header-cell *cdkHeaderCellDef>No.</th>
          <td cdk-cell *cdkCellDef="let element">el - {{element.id}}</td>
          <td cdk-footer-cell *cdkFooterCellDef class="footer-cell">End.</td>
        </ng-container>

      </table>

    </cdk-virtual-scroll-viewport>
    <button (click)="changeDataSource()" data-cy="changeDataSource">changeDataSource</button>
  `,
  styles: [`
    .wrapper {
      height: ${VIEWPORT_HEIGHT}px;
    }

    table {
      border-collapse: collapse;
    }

    tr {
      height: auto !important;
    }

    th {
      height: ${HEADER_HEIGHT}px !important;
    }

    td {
      height: ${ROW_HEIGHT}px !important;
    }

    th, td {
      padding: 0 !important;
      margin: 0 !important;
      border-width: 0 !important;
      border-style: none !important;
      font-size: 8px;
    }

    .footer-cell {
      height: ${FOOTER_HEIGHT}px !important;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
class CdkTableTestComponent extends TestComponent {
  constructor() {
    super(CdkTableVirtualScrollDataSource);
  }
}

describe('TableItemSizeDirective', () => {
  describe('CdkTable', () => {
    runTableTests(CdkTableModule, CdkTableTestComponent);
  });
  describe('MatTable', () => {
    runTableTests(MatTableModule, MatTableTestComponent);
  });
  describe('MatLegacyTableModule', () => {
    runTableTests(MatLegacyTableModule, MatTableTestComponent);
  });
});

function runTableTests(
  tableModule: typeof CdkTableModule,
  tableComponent: Type<TestComponent>
) {
  describe('common actions', () => {
    let testComponent: TestComponent;
    let viewport: CdkVirtualScrollViewport;

    beforeEach(() => {
      mount(tableComponent, {
        imports: [ScrollingModule, tableModule],
        declarations: [TableItemSizeDirective]
      })
        .then(mountResponse => {
          testComponent = mountResponse.component;
          viewport = testComponent.viewport;
        });
    });

    it('should init correct state', () => {
      // should render buffer before, visible rows and buffer after
      const renderedRowsCount = VISIBLE_ITEMS_COUNT * (BUFFER_MULTIPLIER + 1 + BUFFER_MULTIPLIER);
      cy.get('tbody tr').should('have.length', renderedRowsCount);
      expect(viewport.getRenderedRange()).to.deep.equal({ start: 0, end: renderedRowsCount });
      cy.get('.wrapper')
        .then(el => {
          expect(el.get(0).scrollHeight).to.equal(HEADER_HEIGHT + ROW_HEIGHT * ITEMS_COUNT);
        });
    });

    it('should set the correct rendered range on scroll', () => {
      const rowsToScroll = 100;
      const bufferSize = BUFFER_MULTIPLIER * VISIBLE_ITEMS_COUNT;
      cy.get('.wrapper')
        .scrollTo(0, rowsToScroll * ROW_HEIGHT)
        .wait(0)
        .then(() => {
          expect(viewport.getRenderedRange())
            .to.deep.equal({ start: rowsToScroll - bufferSize, end: rowsToScroll + VISIBLE_ITEMS_COUNT + bufferSize });
        });
    });

    it('should subscribe and rerender after dataSource is changed', () => {
      cy.get('tbody')
        .children().first()
        .should('contain', 'el - 0');

      cy.get('[data-cy="changeDataSource"]')
        .click();

      cy.get('tbody')
        .children().first()
        .should('contain', `el - ${ITEMS_COUNT}`);

    });

    it('should check scroll position after dataSource is changed', () => {
      cy.get('tbody')
        .children().first()
        .should('contain', 'el - 0');

      cy.get('.wrapper')
        .scrollTo('bottom')
        .wait(0);

      cy.get('tbody')
        .children().last()
        .should('contain', `el - ${ITEMS_COUNT - 1}`);

      cy.get('[data-cy="changeDataSource"]')
        .click();

      cy.get('tbody')
        .children().last()
        .should('contain', `el - ${ITEMS_COUNT + ITEMS_COUNT2 - 1}`);

    });
  });

  describe('initialization variants', () => {
    it('should have correct height with footer', () => {
      mount(tableComponent, {
        imports: [ScrollingModule, tableModule],
        declarations: [TableItemSizeDirective],
        componentProperties: {
          footerEnabled: true
        }
      });

      cy.get('.wrapper')
        .wait(0)
        .then(el => {
          expect(el.get(0).scrollHeight).to.equal(HEADER_HEIGHT + ROW_HEIGHT * ITEMS_COUNT + FOOTER_HEIGHT);
        });
    });

    it('should have correct height without header', () => {
      mount(tableComponent, {
        imports: [ScrollingModule, tableModule],
        declarations: [TableItemSizeDirective],
        componentProperties: {
          headerEnabled: false,
          footerEnabled: false
        }
      });

      cy.get('.wrapper')
        .wait(0)
        .then(el => {
          expect(el.get(0).scrollHeight).to.equal(ROW_HEIGHT * ITEMS_COUNT);
        });
    });

    const tests: {
      title: string;
      props: {
        headerEnabled?: boolean;
        footerEnabled?: boolean;
        stickyHeader?: boolean;
        stickyFooter?: boolean;
      },
      checks: {
        header?: boolean;
        footer?: boolean;
      }
    }[] =
      [
        {
          title: 'sticky header',
          props: {
            headerEnabled: true,
            stickyHeader: true
          },
          checks: {
            header: true
          }
        },
        {
          title: 'sticky footer',
          props: {
            headerEnabled: false,
            footerEnabled: true,
            stickyFooter: true
          },
          checks: {
            footer: true
          }
        },
        {
          title: 'sticky header with footer enabled',
          props: {
            headerEnabled: true,
            footerEnabled: true,
            stickyHeader: true
          },
          checks: {
            header: true
          }
        },
        {
          title: 'sticky footer with header enabled',
          props: {
            headerEnabled: true,
            footerEnabled: true,
            stickyFooter: true
          },
          checks: {
            footer: true
          }
        },
        {
          title: 'sticky header and footer',
          props: {
            headerEnabled: true,
            footerEnabled: true,
            stickyHeader: true,
            stickyFooter: true
          },
          checks: {
            header: true,
            footer: true
          }
        },
      ];

    tests.forEach(test => {
      it('should have visible ' + test.title, () => {
        mount(tableComponent, {
          imports: [ScrollingModule, tableModule],
          declarations: [TableItemSizeDirective],
          componentProperties: test.props
        });

        const rowsToScroll = 100;
        cy.get('.wrapper')
          .scrollTo(0, rowsToScroll * ROW_HEIGHT)
          .wait(0);

        if (test.props.headerEnabled) {
          cy.get('th')
            .should((test.checks.header ? '' : 'not.') + `be.inViewport`, '.wrapper');
        }
        if (test.props.footerEnabled) {
          cy.get('.footer-cell')
            .should((test.checks.footer ? '' : 'not.') + `be.inViewport`, '.wrapper');
        }
      });
    });
  });
}
