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
import { TopFiveComponent } from './pages/complements/top-five/top-five.component';
import { PsicologosComponent } from './pages/psicologos/psicologos.component';
import { LoginGuard } from './guards/login.guard';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { AdminGuard } from './guards/admin.guard';
import { PanelCitasComponent } from './pages/complements/panel-citas/panel-citas.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'profile/:dni',
    component: ProfileComponent,

  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'create-account',
    component: CreateAccountComponent,
  },
  {
    path: 'calendar',
    component: CalendarComponent,
  },
  {
    path: 'pruebas',
    component: PruebasComponent,
  },
  {
    path: 'select',
    component: SelectTypeUserComponent,
  },
  {
    path: 'header',
    component: HeaderComponent,
  },
  {
    path: 'cards',
    component: CardsComponent,
  },
  {
    path: 'dating/:dni',
    component: DatingPatientComponent,
  },
  {
    path: 'top5',
    component: TopFiveComponent,
  },
  {
    path: 'psicologos',
    component: PsicologosComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'admin',
    component: AdminPanelComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'panelCitas',
    component: PanelCitasComponent,
    canActivate: [LoginGuard],

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
