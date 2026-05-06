import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
//import { environment } from '../../../../environments/environment.development';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class jefeGuardiaService {
  private _http=inject(HttpClient);
   private readonly API_URL = environment.API_URL;
  listarEmergencias():Observable<any>{
    return this._http.get(this.API_URL+'/emergencias').pipe(tap((res:any)=>{
      //console.log("respuesta de creacio nde personal",res);
      
    }))
   }
  listarGravedad():Observable<any>{
    return this._http.get(this.API_URL+'/gravedad').pipe(tap((res:any)=>{
      //console.log("respuesta de creacio nde personal",res);
      
    }))
   }
  listarTipoEmergencia():Observable<any>{
    return this._http.get(this.API_URL+'/emergencias/tipo-emergencia').pipe(tap((res:any)=>{
      //console.log("respuesta de creacio nde personal",res);
      
    }))
   }
   listarVoluntariodisponible(datos:any):Observable<any>{
    const params = new HttpParams()
    .set('fecha', datos.fecha)
    .set('dia', datos.dia.toString())
    .set('hora', datos.hora);
    return this._http.get(this.API_URL+'/emergencias/listar-voluntario-disponible',{ params }).pipe(tap((res:any)=>{
      //console.log("respuesta de creacio nde personal",res);
      
    }))
   }
   listarMaquinista():Observable<any>{
    return this._http.get(this.API_URL+'/maquinista').pipe(tap((res:any)=>{
      //console.log("respuesta de creacio nde personal",res);
      
    }))
   }
   // LISTAR TURNOS 
   listarTurnosTrayectos():Observable<any>{
    return this._http.get(this.API_URL+'/turno/listar-Turnos-Trayecto').pipe(tap((res:any)=>{
      //console.log("respuesta de creacio nde personal",res);
      
    }))
   }
   listarTurnoTrayecto(dto:any):Observable<any>{
    return this._http.post(this.API_URL+'/turno/rango-turno-trayecto',dto).pipe(tap((res:any)=>{
      //console.log("respuesta de creacio nde personal",res);
      
    }))
   }
   
}
