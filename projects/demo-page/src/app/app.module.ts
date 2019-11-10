import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule, MatExpansionModule, MatTableModule, MatTabsModule } from '@angular/material';
import { OverviewComponent } from './overview/overview.component';
import { ApiComponent } from './api/api.component';
import { CodeExampleComponent } from './code-example/code-example.component';
import { HighlightModule } from 'ngx-highlightjs';
import typescript from 'highlight.js/lib/languages/typescript';
import css from 'highlight.js/lib/languages/css';
import xml from 'highlight.js/lib/languages/xml';
import { AppRoutingModule } from './app-routing.module';
import { ExamplesPageComponent } from './examples-page/examples-page.component';
import { ExamplesModule } from './examples';
import { CommonModule } from '@angular/common';

export function hljsLanguages() {
  return [
    {name: 'typescript', func: typescript},
    {name: 'css', func: css},
    {name: 'xml', func: xml}
  ];
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    OverviewComponent,
    ApiComponent,
    CodeExampleComponent,
    ExamplesPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    MatTableModule,
    HighlightModule.forRoot({
      languages: hljsLanguages
    }),
    AppRoutingModule,
    ExamplesModule,
    MatCardModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
