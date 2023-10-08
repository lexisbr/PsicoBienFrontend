import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { CalendarPruebaComponent } from './pages/calendar-prueba/calendar-prueba.component';
import { BoostrapPruebasComponent } from './pages/boostrap-pruebas/boostrap-pruebas.component';

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
    path: 'calendarP',
    component: CalendarPruebaComponent
  },
  {
    path: 'boostrap',
    component: BoostrapPruebasComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
