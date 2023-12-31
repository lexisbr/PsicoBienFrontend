import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PruebasComponent } from './pages/pruebas/pruebas.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { CalendarComponent } from './pages/complements/calendar/calendar.component';
import { SelectTypeUserComponent } from './pages/select-type-user/select-type-user.component';
import { HeaderComponent } from './pages/complements/header/header.component';
import { CardsComponent } from './pages/complements/cards/cards.component';
import { DatingPatientComponent } from './pages/dating-patient/dating-patient.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'create-account',
    component: CreateAccountComponent
  },
  {
    path: 'calendar',
    component: CalendarComponent
  },
  {
    path: 'pruebas',
    component: PruebasComponent
  },
  {
    path: 'select',
    component: SelectTypeUserComponent
  },
  {
    path: 'header',
    component: HeaderComponent
  },
  {
    path: 'cards',
    component: CardsComponent
  },
  {
    path: 'dating',
    component: DatingPatientComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
