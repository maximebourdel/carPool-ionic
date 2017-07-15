import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { VehiculeListComponent }            from '../pages/vehicule/vehicule-list.component';
import { VehiculeService }                  from '../pages/vehicule/vehicule.service';

import { ReservationListComponent }         from '../pages/reservation/reservation-list.component';
import { ReservationCreateComponent }       from '../pages/reservation/reservation-create.component';
import { ReservationValidateComponent }     from '../pages/reservation/reservation-validate.component';

import { ReservationService }               from '../pages/reservation/reservation.service';

import { Http, HttpModule, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig }             from 'angular2-jwt';

import { MomentModule } from 'angular2-moment';

//Imports RXJS
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'; 

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
    return new AuthHttp( new AuthConfig({}), http, options);
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
	VehiculeListComponent,
	ReservationListComponent,
	ReservationCreateComponent,
	ReservationValidateComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
	MomentModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
	VehiculeListComponent,
	ReservationListComponent,
	ReservationCreateComponent,
	ReservationValidateComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
	VehiculeService,
	ReservationService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {
       provide: AuthHttp,
       useFactory: authHttpServiceFactory,
       deps: [ Http, RequestOptions ]
    }, 
  ]
})
export class AppModule {}
