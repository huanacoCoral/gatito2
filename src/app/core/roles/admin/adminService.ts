import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class adminService {
  private _http=inject(HttpClient);
   private readonly API_URL = environment.API_URL;

   listarTurno():Observable<any>{
    return this._http.get(this.API_URL+'/personal/listar_turno')
    .pipe(tap((res:any)=>{
      console.log(res);
      
    }))
   }

   crearTurno(data:any):Observable<any>{
    console.log("---2",data);
    
    return this._http.post(this.API_URL+'/turno',data)
    .pipe(tap((res:any)=>{
      console.log(res);
      
    }))
   }

   listarRol():Observable<any>{
    return this._http.get(this.API_URL+'/rol')
    .pipe(tap((res:any)=>{
      console.log(res);
      
    }))
   }

   crearRol(data:any):Observable<any>{
    console.log("---2",data);
    
    return this._http.post(this.API_URL+'/rol',data)
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

   crearGravedad(data:any):Observable<any>{
    console.log("---2",data);
    
    return this._http.post(this.API_URL+'/gravedad',data)
    .pipe(tap((res:any)=>{
      console.log(res);
      
    }))
   }


listarEmergencia():Observable<any>{
    return this._http.get(this.API_URL+'/emergencias/tipo-emergencia')
    .pipe(tap((res:any)=>{
      console.log(res);
      
    }))
   }

   crearEmergencia(data:any):Observable<any>{
    //console.log("---2",data);
    
    return this._http.post(this.API_URL+'/emergencias/tipo-emergencia',data)
    .pipe(tap((res:any)=>{
      console.log(res);
      
    }))
   }
   listarCargo():Observable<any>{
    return this._http.get(this.API_URL+'/cargo')
    .pipe(tap((res:any)=>{
      console.log(res);
      
    }))
   }
   crearCargo(data:any):Observable<any>{
    return this._http.post(this.API_URL+'/cargo',data)
    .pipe(tap((res:any)=>{
      console.log(res);
      
    }))
   }

    /*listarLote():Observable<any>{
    return this._http.get(this.API_URL+'/vehiculos/lote')
    .pipe(tap((res:any)=>{
      console.log(res);
      
    }))
   }

   crearloteVehiculo(data:any):Observable<any>{
    
    
    return this._http.post(this.API_URL+'/vehiculos/lote',data)
    .pipe(tap((res:any)=>{
      console.log(res);
      
    }))
   }*/
}