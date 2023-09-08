import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { HttpClientModule } from '@angular/common/http';
import { MerchandiseComponent } from './components/merchandise/merchandise.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateMerchandiseComponent } from './components/create-merchandise/create-merchandise.component';
import { MerchandiseDetailComponent } from './components/merchandise-detail/merchandise-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    MerchandiseComponent,
    NavbarComponent,
    CreateMerchandiseComponent,
    MerchandiseDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
