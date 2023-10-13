import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CalendarComponent } from './pages/complements/calendar/calendar.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PruebasComponent } from './pages/pruebas/pruebas.component';
import { SelectTypeUserComponent } from './pages/select-type-user/select-type-user.component';
import { HeaderComponent } from './pages/complements/header/header.component';
import { FooterComponent } from './pages/complements/footer/footer.component';
import { CardsComponent } from './pages/complements/cards/cards.component';
import { DatingPatientComponent } from './pages/dating-patient/dating-patient.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    CreateAccountComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    PruebasComponent,
    SelectTypeUserComponent,
    HeaderComponent,
    FooterComponent,
    CardsComponent,
    DatingPatientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
