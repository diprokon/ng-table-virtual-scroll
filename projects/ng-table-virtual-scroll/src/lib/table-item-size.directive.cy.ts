import { DataSource } from '@angular/cdk/collections';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { CdkTableModule } from '@angular/cdk/table';
import { Component, Type, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { mount } from 'cypress/angular';
import { CdkTableVirtualScrollDataSource, TableVirtualScrollDataSource } from './table-data-source';
import { TableItemSizeDirective } from './table-item-size.directive';

interface Data {
  id: number;
}

abstract class TestComponent {
  headerEnabled = true;
  footerEnabled = false;

  @ViewChild(CdkVirtualScrollViewport, { static: true })
  viewport: CdkVirtualScrollViewport;

  @ViewChild(TableItemSizeDirective, { static: true })
  directive: TableItemSizeDirective;

  displayedColumns = ['id'];

  data = Array(50).fill(0).map((_, i) => ({ id: i }));
  data2 = Array(50).fill(0).map((_, i) => ({ id: i + 50 }));

  dataSource = new this.dataSourceClass(this.data);

  protected constructor(protected dataSourceClass: Type<DataSource<Data>>) {
  }

  changeDataSource() {
    this.dataSource = new this.dataSourceClass(this.data2);
  }
}

@Component({
  template: `
    <cdk-virtual-scroll-viewport tvsItemSize="10"
                                 headerHeight="20"
                                 footerHeight="15"
                                 bufferMultiplier="0.5"
                                 [headerEnabled]="headerEnabled"
                                 [footerEnabled]="footerEnabled"
                                 class="wrapper">

      <table mat-table [dataSource]="dataSource">

        <ng-container *ngIf="headerEnabled">
          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        </ng-container>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        <ng-container *ngIf="footerEnabled">
          <tr mat-footer-row *matFooterRowDef="displayedColumns"></tr>
        </ng-container>

        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef>No.</th>
          <td mat-cell *matCellDef="let element">el - {{element.id}}</td>
          <td mat-footer-cell *matFooterCellDef class="footer-cell">End.</td>
        </ng-container>

      </table>

    </cdk-virtual-scroll-viewport>
    <button (click)="changeDataSource()" data-cy="changeDataSource"></button>
  `,
  styles: [`
    .wrapper {
      height: 40px;
    }

    tr {
      height: auto !important;
    }

    th {
      height: 20px !important;
    }

    td {
      height: 10px !important;
    }

    th, td {
      padding: 0 !important;
      margin: 0 !important;
      border-width: 0 !important;
      border-style: none !important;
      font-size: 8px;
    }

    .footer-cell {
      height: 15px !important;
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
    <cdk-virtual-scroll-viewport tvsItemSize="10"
                                 headerHeight="20"
                                 footerHeight="15"
                                 bufferMultiplier="0.5"
                                 [headerEnabled]="headerEnabled"
                                 [footerEnabled]="footerEnabled"
                                 class="wrapper">

      <table cdk-table [dataSource]="dataSource">

        <ng-container *ngIf="headerEnabled">
          <tr cdk-header-row *cdkHeaderRowDef="displayedColumns"></tr>
        </ng-container>
        <tr cdk-row *cdkRowDef="let row; columns: displayedColumns;"></tr>
        <ng-container *ngIf="footerEnabled">
          <tr cdk-footer-row *cdkFooterRowDef="displayedColumns"></tr>
        </ng-container>

        <ng-container cdkColumnDef="id">
          <th cdk-header-cell *cdkHeaderCellDef>No.</th>
          <td cdk-cell *cdkCellDef="let element">el - {{element.id}}</td>
          <td cdk-footer-cell *cdkFooterCellDef class="footer-cell">End.</td>
        </ng-container>

      </table>

    </cdk-virtual-scroll-viewport>
    <button (click)="changeDataSource()" data-cy="changeDataSource"></button>
  `,
  styles: [`
    .wrapper {
      height: 40px;
    }

    tr {
      height: auto !important;
    }

    th {
      height: 20px !important;
    }

    td {
      height: 10px !important;
    }

    th, td {
      padding: 0 !important;
      margin: 0 !important;
      border-width: 0 !important;
      border-style: none !important;
      font-size: 8px;
    }

    .footer-cell {
      height: 15px !important;
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
      // should render 8 10px row to fill 40px + 40px * 0.5 (buffer before) + 40px * 0.5 (buffer after) space
      cy.get('tbody tr').should('have.length', 8);
      expect(viewport.getRenderedRange()).to.deep.equal({ start: 0, end: 8 });
      cy.get('.wrapper')
        .then(el => {
          expect(el.get(0).scrollHeight).to.equal(520);
        });
    });

    it('should set the correct rendered range on scroll', () => {
      // viewport.scrollToOffset(100);
      cy.get('.wrapper')
        .scrollTo(0, 100)
        .wait(0)
        .then(() => {
          // scrolled ten items down, so items 10-14 should be visible, with items 8-16 rendered in the buffer
          expect(viewport.getRenderedRange())
            .to.deep.equal({ start: 8, end: 16 });
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
        .should('contain', 'el - 50');

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
          expect(el.get(0).scrollHeight).to.equal(535);
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
          expect(el.get(0).scrollHeight).to.equal(500);
        });
    });
  });
}
