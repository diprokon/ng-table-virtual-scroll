import { CdkTableModule } from '@angular/cdk/table';
import { TableItemSizeDirective } from './table-item-size.directive';
import { Component, Type, ViewChild, ViewEncapsulation } from '@angular/core';
import { TableVirtualScrollDataSource } from './table-data-source';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { ComponentFixture, fakeAsync, flush, TestBed, waitForAsync } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { TableVirtualScrollModule } from './table-virtual-scroll.module';
import { FixedSizeTableVirtualScrollStrategy } from './fixed-size-table-virtual-scroll-strategy';
import { animationFrameScheduler } from 'rxjs';
import { By } from '@angular/platform-browser';

class TestComponent {
  @ViewChild(CdkVirtualScrollViewport, {static: true})
  viewport: CdkVirtualScrollViewport;

  @ViewChild(TableItemSizeDirective, {static: true})
  directive: TableItemSizeDirective;

  displayedColumns = ['id'];

  dataSource = new TableVirtualScrollDataSource(Array(50).fill(0).map((_, i) => ({id: i})));

  headerEnabled = true;
  footerEnabled = false;

  changeDataSource() {
    this.dataSource = new TableVirtualScrollDataSource(Array(50).fill(0).map((_, i) => ({id: i + 50})));
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
class CdkTableTestComponent extends TestComponent{}

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
class MatTableTestComponent extends TestComponent{}

/** Finish initializing the virtual scroll component at the beginning of a test. */
function finishInit(fixture: ComponentFixture<any>) {
  // On the first cycle we render and measure the viewport.
  fixture.detectChanges();
  flush();

  // On the second cycle we render the items.
  fixture.detectChanges();
  flush();

  // Flush the initial fake scroll event.
  animationFrameScheduler.flush();
  flush();
  fixture.detectChanges();
}

/** Trigger a scroll event on the viewport (optionally setting a new scroll offset). */
function triggerScroll(viewport: CdkVirtualScrollViewport, offset?: number) {
  if (offset !== undefined) {
    viewport.scrollToOffset(offset);
  }
  animationFrameScheduler.flush();
}

function dispatchFakeEvent(node: Node | Window, type: string, canBubble?: boolean): Event {
  const event = createFakeEvent(type, canBubble);
  node.dispatchEvent(event);
  return event;
}

function createFakeEvent(type: string, canBubble = false, cancelable = true) {
  const event = document.createEvent('Event');
  event.initEvent(type, canBubble, cancelable);
  return event;
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
  let fixture: ComponentFixture<TestComponent>;
  let testComponent: TestComponent;
  let viewport: CdkVirtualScrollViewport;
  let strategy: FixedSizeTableVirtualScrollStrategy;
  let directive: TableItemSizeDirective;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ScrollingModule, MatTableModule, TableVirtualScrollModule],
      declarations: [tableComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(tableComponent);
    testComponent = fixture.componentInstance;
    viewport = testComponent.viewport;
    strategy = testComponent.directive.scrollStrategy;
    const directiveEl = fixture.debugElement.query(By.directive(TableItemSizeDirective));
    directive = directiveEl.injector.get(TableItemSizeDirective) as TableItemSizeDirective;
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should init correct state', fakeAsync(() => {
    finishInit(fixture);

    const tbody = fixture.nativeElement.querySelector('tbody');

    // should render 8 10px row to fill 40px + 40px * 0.5 (buffer before) + 40px * 0.5 (buffer after) space
    expect(tbody.children.length)
      .toBe(8);
  }));

  it('get the rendered range', fakeAsync(() => {
    finishInit(fixture);

    // should render 8 10px row to fill 40px + 40px * 0.5 (buffer before) + 40px * 0.5 (buffer after) space
    expect(viewport.getRenderedRange())
      .toEqual({start: 0, end: 8});
  }));

  it('should set the correct rendered range on scroll', fakeAsync(() => {
    finishInit(fixture);

    viewport.scrollToOffset(100);

    dispatchFakeEvent(viewport.elementRef.nativeElement, 'scroll');
    animationFrameScheduler.flush();
    fixture.detectChanges();
    flush();

    // scrolled ten items down, so items 10-14 should be visible, with items 8-16 rendered in the buffer
    expect(viewport.getRenderedRange())
      .toEqual({start: 8, end: 16});
  }));

  it('should subscribe and rerender after dataSource is changed', fakeAsync(() => {
    finishInit(fixture);
    const tbody = fixture.nativeElement.querySelector('tbody');

    expect(tbody.children[0].children[0].innerHTML).toBe('el - 0');

    testComponent.changeDataSource();
    fixture.detectChanges();
    flush();

    expect(tbody.children[0].children[0].innerHTML).toBe('el - 50');

  }));


  it('should have correct height by default', fakeAsync(() => {
    finishInit(fixture);

    // default height is incorrect
    expect(viewport.elementRef.nativeElement.scrollHeight)
      .toEqual(520);
  }));

  it('should have correct height with footer', fakeAsync(() => {
    testComponent.footerEnabled = true;
    finishInit(fixture);

    // height with footer is incorrect
    expect(viewport.elementRef.nativeElement.scrollHeight)
      .toEqual(535);
  }));

  it('should have correct height without header', fakeAsync(() => {
    testComponent.headerEnabled = false;
    testComponent.footerEnabled = false;
    finishInit(fixture);

    expect(viewport.elementRef.nativeElement.scrollHeight)
      .toEqual(500);

    fixture.destroy();
  }));
}
