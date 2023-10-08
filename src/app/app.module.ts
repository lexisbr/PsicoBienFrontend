import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicModule } from '@ionic/angular';
import { FullCalendarModule } from '@fullcalendar/angular';

import { PruebasComponent } from './pages/pruebas/pruebas.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { CalendarPruebaComponent } from './pages/calendar-prueba/calendar-prueba.component';
import { BoostrapPruebasComponent } from './pages/boostrap-pruebas/boostrap-pruebas.component';


@NgModule({
  declarations: [
    AppComponent,
    PruebasComponent,
    HomeComponent,
    ProfileComponent,
    LoginComponent,
    CreateAccountComponent,
    CalendarComponent,
    CalendarPruebaComponent,
    BoostrapPruebasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot(),
    FullCalendarModule   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
