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
   listarVehiculos(): Observable<any> {
  return this._http.get(`${this.API_URL}/vehiculos/vehiculo`).pipe(
    tap((res: any) => {
      // Aquí puedes manejar la respuesta si lo necesitas
    })
  );
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
    guardarEmergencia(datos:any):Observable<any>{
   
      return this._http.post(this.API_URL+'/emergencias',datos).pipe(tap((res:any)=>{
      
      
    }))
   }
    emergenciaTieneTipoEmergencia(datos:any):Observable<any>{
    return this._http.post(this.API_URL+'/emergencias/asignar-tipo',datos).pipe(tap((res:any)=>{
      
      
    }))
   }
   voluntarioRecepcionEmergencia(datos:any):Observable<any>{
    return this._http.post(this.API_URL+'/emergencias/recepcion',datos).pipe(tap((res:any)=>{
      
      
    }))
   }
   crearCondujoVhiculo(data: any): Observable<any> {

  return this._http.post(
    `${this.API_URL}/maquinista/crear_Condujo_vehi`,
    data
  );
}
crearParticipioVehiculo(data: any): Observable<any> {

  return this._http.post(
    `${this.API_URL}/vehiculos/crear-participacion`,
    data
  );

  
} 
editarEmergencia(id: number,data: any): Observable<any> {

  return this._http.put(

    `${this.API_URL}/emergencias/${id}`,

    data

  );

}
eliminarEmergencia(id: number,data: any): Observable<any> {
  return this._http.put(
    `${this.API_URL}/emergencias/eliminar/${id}`,data  );
}

crearInformeEmergenciaTermino(data: any): Observable<any> {
  return this._http.post(
    `${this.API_URL}/emergencias/informe-emergencia-termino`,
    data

  );

}
actualizarInformeEmergenciaTerminor(data: any): Observable<any> {
  return this._http.post(
    `${this.API_URL}/emergencias/actualiza-infrome-emergencia-termino`,
    data
  );
}

}
