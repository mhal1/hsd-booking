import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Treatment } from '../dentist-dashboard/treatments/treatments.component';

const TREATMENT_API = 'http://localhost:8080/api/treatment/';


@Injectable({
  providedIn: 'root'
})
export class TreatmentService {

  constructor(private http: HttpClient) { }

  getAllTreatments(): Observable<Treatment[]> {
    return this.http.get<Treatment[]>(TREATMENT_API + 'get-all-treatments');
  }
}
