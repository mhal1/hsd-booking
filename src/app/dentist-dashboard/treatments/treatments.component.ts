import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { TreatmentService } from 'src/app/service/treatment.service';

export interface Treatment {
  id: number;
  description: string;
  category: string;
  fee: number;
}

@Component({
  selector: 'app-treatments',
  templateUrl: './treatments.component.html',
  styleUrls: ['./treatments.component.scss']
})
export class TreatmentsComponent {

  myControl = new FormControl('');
  options!: Treatment[];
  filteredOptions!: Observable<Treatment[]>;

  constructor(private treatmentService: TreatmentService) {
  }

  ngOnInit() {
    this.treatmentService.getAllTreatments().subscribe((res: Treatment[]) => {
      this.options = res;
      //console.log(this.options)
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(treatment => (treatment ? this._filter(treatment) : this.options.slice())),
      );
    }
    );
    
  }

  private _filter(value: string): Treatment[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.description.toLowerCase().includes(filterValue));
  }
}
