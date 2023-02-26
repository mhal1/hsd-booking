import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, AuthGuard, LoggedInAuthGuard } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { DentistDashboardComponent } from './dentist-dashboard/dentist-dashboard.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HomeComponent } from './dentist-dashboard/home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './login/login.component';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './dentist-dashboard/profile/profile.component';
import { ScheduleComponent } from './dentist-dashboard/schedule/schedule.component';
import { MatMenuModule } from '@angular/material/menu';
import { TreatmentsComponent } from './dentist-dashboard/treatments/treatments.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { httpInterceptorProviders } from '../app/service/http.interceptor';
import { ReportComponent } from './dentist-dashboard/report/report.component';
import { GuestBookingComponent } from './guest-booking/guest-booking.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DentistDashboardComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ScheduleComponent,
    TreatmentsComponent,
    ReportComponent,
    GuestBookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatCardModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  providers: [httpInterceptorProviders, AuthGuard, LoggedInAuthGuard, MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
