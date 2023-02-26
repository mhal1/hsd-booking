import { Component } from '@angular/core';
import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-dentist-dashboard',
  templateUrl: './dentist-dashboard.component.html',
  styleUrls: ['./dentist-dashboard.component.scss']
})
export class DentistDashboardComponent {

  showMaintenance = false;
  showCustomerComplaints = false;
  drawerOpen = false;
  title!: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        this.title = data.state.root.firstChild!.data['title'];
      }
    });
  }

}
