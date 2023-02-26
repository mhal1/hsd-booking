import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AppointmentsService } from 'src/app/service/appointments.service';
import { ReportService } from '../../service/report.service';
import { StorageService } from '../../service/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  currentUser: any;

  appointments: any[] = [];

  constructor(private storageService: StorageService, private reportService: ReportService, private appointmentsService: AppointmentsService) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.appointmentsService.getAllAppointments().subscribe((res:any) => {
      console.log(res)
      this.appointments = res;
    });
  }

  downloadReport(): any {
    // this.reportService.test().subscribe((res) =>
    // {
    //   console.log(res)
    // });
    this.reportService.downloadReport().subscribe(
      (response: HttpResponse<Blob>) => {
        this.downloadXlsx(response)


      }
    );
  }

  private downloadXlsx(res: any): void {
    const headers = res.headers;
    const contentDisposition = headers.get('content-disposition');
    const result = 'report';//contentDisposition.split(';')[1]?.trim().split('=')[1];
    const anchor = document.createElement('a');
    anchor.download = result.replace(/"/g, '');
    anchor.href = (window.webkitURL || window.URL).createObjectURL(res.body);
    anchor.dataset['downloadurl'] = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', anchor.download, anchor.href].join(':');
    anchor.click();
    //this.alertService.success(`${label} ${orderNumber} downloaded.`);
    (window.webkitURL || window.URL).revokeObjectURL(res.body);
    // this.currentOrderNumber = '';
    // this.isDownloading = false;
  }




}
