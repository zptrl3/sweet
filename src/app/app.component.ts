import { Component } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-root',
  template: `
    <app-nav-bar></app-nav-bar>
    <ng4-loading-spinner> </ng4-loading-spinner>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  showLoadingIndicator = true;
  constructor(private router: Router) {
    this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.showLoadingIndicator = true;
      }

      if (routerEvent instanceof NavigationEnd) {
        this.showLoadingIndicator = false;
      }
    });
  }
}
