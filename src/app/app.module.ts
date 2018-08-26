import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SweatListComponent } from './sweat-list/sweat-list.component';
import { CreateSweatComponent } from './create-sweat/create-sweat.component';
import { appRoutes } from './routes';
import { SweatService } from './shared/sweat.service';
import { MessageService } from './shared/message.service';
import { HttpErrorHandler } from './shared/http-error-handler.service';
import { SweatDetailComponent } from './sweat-detail/sweat-detail.component';

@NgModule({
  declarations: [AppComponent, NavBarComponent, SweatListComponent, CreateSweatComponent, SweatDetailComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    SweatService,
    MessageService,
    HttpErrorHandler],
  bootstrap: [AppComponent]
})
export class AppModule {}
