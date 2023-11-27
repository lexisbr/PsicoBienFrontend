import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { TopFiveComponent } from './pages/complements/top-five/top-five.component';
import { PsicologosComponent } from './pages/psicologos/psicologos.component';

import { Select2Module } from 'ng-select2-component';

// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
import { SearchbarComponent } from './pages/complements/searchbar/searchbar.component';
import { UpdateDataComponent } from './pages/complements/update-data/update-data.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { ImgModalComponent } from './pages/complements/img-modal/img-modal.component';
import { TopFive2Component } from './pages/complements/top-five2/top-five2.component';
import { TopClientesComponent } from './pages/complements/top-clientes/top-clientes.component';
import { PanelCitasComponent } from './pages/complements/panel-citas/panel-citas.component';
// register Swiper custom elements
register();

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
    DatingPatientComponent,
    TopFiveComponent,
    PsicologosComponent,
    SearchbarComponent,
    UpdateDataComponent,
    AdminPanelComponent,
    ImgModalComponent,
    TopFive2Component,
    TopClientesComponent,
    PanelCitasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    Select2Module,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}