import { Component, OnInit }     from '@angular/core';

import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { Reservation }          from './reservation';
import { ReservationListComponent }         from './reservation-list.component';
import { ReservationService }   from './reservation.service';

import { Vehicule }             from '../vehicule/vehicule';
import { VehiculeService }      from '../vehicule/vehicule.service';


@Component({
    selector: 'reservation-create',
    providers: [ReservationService, VehiculeService],
    templateUrl: 'reservation-create.component.html'
})
export class ReservationCreateComponent implements OnInit {

    dateToday= new Date();
    today = this.dateToday.toISOString().slice(0,10);

    errorMessage: string;
    reservation: Reservation = new Reservation ();
    listData2: any = new Array();
    listData: any = new Array();
    listVehicule: Vehicule[];


    data:any;

    constructor (
        public navCtrl: NavController,
        private alertCtrl: AlertController,
        public toastCtrl: ToastController,
        private reservationService: ReservationService,
        private vehiculeService: VehiculeService
    ) {} ;

    
    ngOnInit(): void { 
        //Met la navbar reservation-create en active
        //document.getElementById('nav-reservation-create').setAttribute('class','active');
        this.getListVehicule();
    }

    ngOnDestroy(): void { 
        //Met la navbar reservation-create en inactive
        //document.getElementById('nav-reservation-create').removeAttribute('class');
    } 

           
    getListVehicule() {
        this.vehiculeService.getListVehicule()
            .subscribe(
                listVehicule => this.listVehicule = listVehicule,
                error =>  this.errorMessage = <any>error,
            );
    }

    addReservation(): void { 
        //Réservation non conforme on ne fait rien
        if (!this.reservation) { return; }
        //Vérification de la date 
        if (this.reservation.date_debut > this.reservation.date_fin) { 
            this.alertCtrl.create({
                title: 'Dates non cohérentes',
                subTitle: 'Erreur : La date de début ne peut être supérieure à la date de fin de réservation',
                buttons: ['OK']
            }).present();
            return; 
        }
        //sinon on crée notre réservation
        this.reservationService
            .createReservation(this.reservation)
            .subscribe(
                () => {
                    //Redirection
                    this.gotoListReservation();
                    //Message de confirmation
                    this.toastCtrl.create({
                        message: 'Réservation effectuée',
                        duration: 3000
                    }).present();
                }
            )
    }
        
    gotoListReservation(): void { 
        this.navCtrl.setRoot(ReservationListComponent);
    }
    
}
