import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
//import { environment } from '../../../../environments/environment.development';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class OperacionesService {
  private _http=inject(HttpClient);
   private readonly API_URL = environment.API_URL;
   listarEmergencia():Observable<any>{
    return this._http.get(this.API_URL+'/emergencias/listar-mergencias')
    .pipe(tap((res:any)=>{
      console.log(res);
      
    }))
   }
   listarGravedad():Observable<any>{
    return this._http.get(this.API_URL+'/gravedad')
    .pipe(tap((res:any)=>{
      console.log(res);
      
    }))
   }
   listarTipoEmergencia():Observable<any>{
    return this._http.get(this.API_URL+'/emergencias/tipo-emergencia')
    .pipe(tap((res:any)=>{
      console.log(res);
      
    }))
   }
   
}
