import { Injectable }       from '@angular/core';
import { Response, Http }   from '@angular/http';

import { Vehicule }                         from './vehicule';
import { Observable }                       from 'rxjs/Observable';

import { environment }                      from '../../environments/environment';

@Injectable()
export class VehiculeService {
 
    baseUrl: string = 'http://' + environment.API_PATH;
           
    constructor (
        private http: Http) {}
 
    getListVehicule (): Observable<Vehicule[]> {
        
        let url = this.baseUrl + 'vehicule/all';

        return this.http.get(url)
                   .map( this.extractData )
                   .catch(this.handleError);         
    }
    
    getSearchVehicule (term: string): Observable<Vehicule[]> {
        
        let url = this.baseUrl + 'industries/' + term;

        return this.http.get(url)
                   .map( this.extractData )
                   .catch(this.handleError);         
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || { };
    }

    private handleError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
          const body = error.json() || '';
          const err = body.error || JSON.stringify(body);
          errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
          errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        console.error("errMsg");
        return Observable.throw(errMsg);
    }
}
