import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FullCalendarModule } from '@fullcalendar/angular';

import { CalendarComponent } from './pages/calendar/calendar.component';
// import { CalendarPruebaComponent } from './pages/calendar-prueba/calendar-prueba.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PruebasComponent } from './pages/pruebas/pruebas.component';
import { Pruebas2Component } from './pages/pruebas2/pruebas2.component';


@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    // CalendarPruebaComponent,
    CreateAccountComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    PruebasComponent,
    Pruebas2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule 

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
