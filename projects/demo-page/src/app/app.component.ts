import { Component } from '@angular/core';

interface NavLink {
  label: string;
  path: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  navLinks: NavLink[] = [
    {
      path: 'overview',
      label: 'OVERVIEW'
    },
    {
      path: 'api',
      label: 'API'
    },
    {
      path: 'examples',
      label: 'EXAMPLES'
    }
  ];

  constructor() {

  }
}
