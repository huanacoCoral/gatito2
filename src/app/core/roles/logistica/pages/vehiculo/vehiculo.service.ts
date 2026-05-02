import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment.development';
import { Observable, tap } from 'rxjs';
import { VehiculoFormDialogComponent } from './vehiculo-form.dialog';


@Injectable({
  providedIn: 'root',
})
export class VehiculoService {
    private _http=inject(HttpClient);
    private readonly API_URL = environment.API_URL;

    createVehiculo(data: any){
        console.log("Este es el dato",data)
        return this._http.post(this.API_URL+'/vehiculos',data)
    }
}
