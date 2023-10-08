import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PruebasComponent } from './pages/pruebas/pruebas.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
// import { CalendarPruebaComponent } from './pages/calendar-prueba/calendar-prueba.component';
import { Pruebas2Component } from './pages/pruebas2/pruebas2.component';

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
    path: 'pruebas2',
    component: Pruebas2Component
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
