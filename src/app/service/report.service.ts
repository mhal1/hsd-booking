import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  downloadReport(): any {
    return this.http.get(`http://localhost:8080/api/report/download`, {
      headers: { 'Content-Type': 'application/vnd.ms-excel' },
      observe: 'response',
      responseType: 'blob',
      withCredentials: true
    });
  }

  test(){
    return this.http.get(`http://localhost:8080/api/test/all`)
  }
}
