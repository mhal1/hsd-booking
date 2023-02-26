import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { map, Observable, startWith } from 'rxjs';
import { Treatment } from '../dentist-dashboard/treatments/treatments.component';
import { AppointmentsService } from '../service/appointments.service';
import { TreatmentService } from '../service/treatment.service';

@Component({
  selector: 'app-guest-booking',
  templateUrl: './guest-booking.component.html',
  styleUrls: ['./guest-booking.component.scss']
})
export class GuestBookingComponent implements OnInit {

  times = ['12:00', '13:00', '14:00']

  bookingForm: FormGroup;

  options!: Treatment[];
  filteredOptions!: Observable<Treatment[]>;

  bookingComplete = false;

  constructor(private fb: FormBuilder, private appointmentsService: AppointmentsService, private treatmentService: TreatmentService) {
    this.bookingForm = this.fb.group({
      name: ['', Validators.required],
      telNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      treatment: ['', Validators.required],
      date: [{value: '', disabled: true}, Validators.required],
      time: [{value: '', disabled: true}, Validators.required]
    })
  }

  ngOnInit() {
    this.treatmentService.getAllTreatments().subscribe((res: Treatment[]) => {
      this.options = res;
      //console.log(this.options)
      this.filteredOptions = this.bookingForm.controls['treatment'].valueChanges.pipe(
        startWith(''),
        map(treatment => (treatment ? this._filter(treatment) : this.options.slice())),
      );
    }
    );

  }

  onSubmit() {
    console.log(this.bookingForm.value)
    this.appointmentsService.guestBook(
      this.bookingForm.value
    //   {
    //     "name": this.bookingForm.controls['name'].value,
    //     "email": this.bookingForm.controls['email'].value,
    //     "telNumber": this.bookingForm.controls['number'].value,
    //     "treatment": this.bookingForm.controls['treatment'].value,
    //     "date": this.bookingForm.controls['date'].value,
    //     "time": this.bookingForm.controls['time'].value
    // }
    ).subscribe(
      () => {
        this.bookingComplete =true;
        this.bookingForm.reset();
      }
    );
    // this.appointmentsService.test().subscribe();
  }

  private _filter(value: string): Treatment[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.description.toLowerCase().includes(filterValue));
  }

  enableDate() {
    if(this.bookingForm.controls['treatment'].valid){
      this.bookingForm.controls['date'].enable();
    }
    else {
      this.bookingForm.controls['date'].reset();
      this.bookingForm.controls['date'].disable();
      this.bookingForm.controls['time'].reset();
      this.bookingForm.controls['time'].disable();
    }
  }

  enableTime() {
    if(this.bookingForm.controls['date'].valid){
      this.bookingForm.controls['time'].enable();
    }
    else {
      this.bookingForm.controls['time'].reset();
      this.bookingForm.controls['time'].disable();
    }
  }


}
