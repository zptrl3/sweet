import { Routes } from '@angular/router';
import { SweatListComponent } from './sweat-list/sweat-list.component';
import { CreateSweatComponent } from './create-sweat/create-sweat.component';

export const appRoutes: Routes = [
  { path: 'sweats/new', component: CreateSweatComponent },
  { path: 'sweats', component: SweatListComponent },
  { path: '', redirectTo: '/sweats', pathMatch: 'full' }
];
