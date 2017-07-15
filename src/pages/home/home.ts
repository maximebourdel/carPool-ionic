import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


import { VehiculeListComponent }            from '../vehicule/vehicule-list.component';

import { ReservationListComponent }         from '../reservation/reservation-list.component';
import { ReservationCreateComponent }       from '../reservation/reservation-create.component';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  	constructor(public navCtrl: NavController) {}


    gotoListVehicule(): void { 
		this.navCtrl.setRoot(VehiculeListComponent);
    }

    gotoListReservation(): void { 
		this.navCtrl.setRoot(ReservationListComponent);
    }

    gotoCreateReservation(): void { 
		this.navCtrl.setRoot(ReservationCreateComponent);
    }

}
