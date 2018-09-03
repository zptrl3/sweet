import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SweatListComponent } from './sweat-list/sweat-list.component';
import { CreateSweatComponent } from './create-sweat/create-sweat.component';
import { appRoutes } from './routes';
import { SweatService } from './shared/sweat.service';
import { MessageService } from './shared/message.service';
import { HttpErrorHandler } from './shared/http-error-handler.service';

import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [AppComponent, NavBarComponent, SweatListComponent, CreateSweatComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'}),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    SweatService,
    MessageService,
    HttpErrorHandler
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
