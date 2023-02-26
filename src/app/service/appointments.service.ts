import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const APPOINTMENTS_API = 'http://localhost:8080/api/appointments/';


const TEST_API = 'http://localhost:8080/api/test/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(private http: HttpClient) { }

  guestBook(appointment: any){
    return this.http.post(
      APPOINTMENTS_API + 'guest-booking',
      appointment,
      httpOptions
    );

  }

  getAllAppointments(){
    return this.http.get(APPOINTMENTS_API + 'get-all-appointments')
  }
}
