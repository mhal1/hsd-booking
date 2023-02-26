import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DentistDashboardComponent } from './dentist-dashboard/dentist-dashboard.component';
import { HomeComponent } from './dentist-dashboard/home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './dentist-dashboard/profile/profile.component';
import { RegisterComponent } from './register/register.component';

import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from './service/auth.service';
import { StorageService } from './service/storage.service';
import { ScheduleComponent } from './dentist-dashboard/schedule/schedule.component';
import { TreatmentsComponent } from './dentist-dashboard/treatments/treatments.component';
import { ReportComponent } from './dentist-dashboard/report/report.component';
import { GuestBookingComponent } from './guest-booking/guest-booking.component';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private storageService: StorageService, private _router: Router) { }

  canActivate(): boolean {
    if (this.storageService.isLoggedIn()) {
      return true;
    } else {
      this._router.navigate(['/login'])
      return false
    }
  }
}

@Injectable()
export class LoggedInAuthGuard implements CanActivate {

  constructor(private storageService: StorageService, private _router: Router) { }

  canActivate(): boolean {
    if (this.storageService.isLoggedIn()) {
      this._router.navigate(['/dashboard/home'])
      return false
    } else {
      return true
    }
  }
}

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoggedInAuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [LoggedInAuthGuard] },
  { path: 'dashboard', component: DentistDashboardComponent, canActivate: [AuthGuard], children: [
    { path: 'view-schedule', component: ScheduleComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'home', component: HomeComponent },
    { path: 'treatments', component: TreatmentsComponent },
    { path: 'report', component: ReportComponent}
  ]},
  { path: 'guest-booking', component: GuestBookingComponent},
  // { path: 'user', component: BoardUserComponent },
  // { path: 'mod', component: BoardModeratorComponent },
  // { path: 'admin', component: BoardAdminComponent },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
