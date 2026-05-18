import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonalService {
  private _http=inject(HttpClient);
   private readonly API_URL = environment.API_URL;


   listarPersonal(data:any):Observable<any>{
    console.log('borrar---------------');
    
    return this._http.get(this.API_URL+'/personal',data)
    .pipe(tap((res:any)=>{
      console.log(res);
      
    }))
   }
   /*listarTodoPersonal(data:any):Observable<any>{
    return this._http.get(this.API_URL+'/personal/listar',data)
    .pipe(tap((res:any)=>{
      console.log(res);
      
    }))
   }*/
  listarTodoPersonal():Observable<any>{
    return this._http.get(this.API_URL+'/personal/listar')
    .pipe(tap((res:any)=>{
      console.log(res);
      
    }))
   }
   //crear personal -- datos de solo voluntario
   crearPersonal(data:any):Observable<any>{
    return this._http.post(this.API_URL+'/personal',data).pipe(tap((res:any)=>{
      console.log("respuesta de creacio nde personal",res);
      
    }))
   }
   //eliminar 
   //intalamos y ponemos en css @import 'sweetalert2/dist/sweetalert2.min.css';
   actualizar(data:any):Observable<any>{
    return this._http.post(this.API_URL+'/personal/actualizar ',data).pipe(tap((res:any)=>{
      console.log("respuesta de creacio nde personal",res);
      
    }))
   }
   eliminar(data:any):Observable<any>{
    return this._http.post(this.API_URL+'/personal/eliminar ',data).pipe(tap((res:any)=>{
      console.log("respuesta de creacio nde personal",res);
      
    }))
   }
   activar(data:any):Observable<any>{
    return this._http.post(this.API_URL+'/personal/activar ',data).pipe(tap((res:any)=>{
      console.log("respuesta de creacio nde personal",res);
      
    }))
   }
   //listar de baja 
   listarDeBaja():Observable<any>{
    return this._http.get(this.API_URL+'/personal/listar_de_baja ').pipe(tap((res:any)=>{
      console.log("respuesta de creacio nde personal",res);
      
    }))
   }
   //listar roles 
   listarRol():Observable<any>{
    return this._http.get(this.API_URL+'/personal/listar_rol ').pipe(tap((res:any)=>{
      console.log("roles",res);
      
    }))
   }
   listarCargo():Observable<any>{
    return this._http.get(this.API_URL+'/personal/listar_cargo ').pipe(tap((res:any)=>{
      console.log("cargo",res);
      
    }))
   }
   //agregar rol
   agregarRol(data:any):Observable<any>{
    return this._http.post(this.API_URL+'/personal/agregar_rol ',data).pipe(tap((res:any)=>{
      console.log("cargo",res);
      
    }))
   }
   agregarCargo(data:any):Observable<any>{
    return this._http.post(this.API_URL+'/personal/agregar_cargo',data).pipe(tap((res:any)=>{
      console.log("cargo",res);
      
    }))
   }
   agregarUsuario(data:any):Observable<any>{
    return this._http.post(this.API_URL+'/auth/sign-up',data).pipe(tap((res:any)=>{
      console.log("usuario registrado",res);
      
    }))
   }

   //turnos
    
   listarTurno():Observable<any>{
    return this._http.get(this.API_URL+'/personal/listar_turno ').pipe(tap((res:any)=>{
      console.log("turno",res);
      
    }))
   }
   listarTodoTurnosTrayecto():Observable<any>{
    return this._http.get(this.API_URL+'/turno/listar-Turnos-Trayecto').pipe(tap((res:any)=>{
      console.log("turno",res);
      
    }))
   }
   
   asignarTurno(data:any):Observable<any>{
    return this._http.post(this.API_URL+'/turno/asignar-turno',data).pipe(tap((res:any)=>{
      console.log("turno",res);
      
    }))
   }

   listarTrayectoroariTurno(data:any):Observable<any>{
    return this._http.post(this.API_URL+'/turno/listar-trayectoria-turnos',data).pipe(tap((res:any)=>{
      console.log("turno",res);
      
    }))
   }
   editarTrayectoroariTurno(id:number,data:any):Observable<any>{
    return this._http.put(this.API_URL+'/turno/editar-asignar-turno/'+id,data).pipe(tap((res:any)=>{
      console.log("turno deditado ",res);
      
    }))
   }
  //completar
   editarTurno(data:any):Observable<any>{
    return this._http.post(this.API_URL+'/turno/asignar-turno',data).pipe(tap((res:any)=>{
      console.log("turno",res);
      
    }))
   }
   crearMaquinista(data:any):Observable<any>{
    return this._http.post(this.API_URL+'/maquinista',data).pipe(tap((res:any)=>{
      console.log("maquinista",res);
      
    }))
   }
   //
   editarMaquinista(id: number, datos: any) {
      //return this._http.patch(`${this.url}editar/${id}`, dto);
      return this._http.patch(`${this.API_URL}/maquinista/editar/${id}`, datos).pipe(tap((res:any)=>{
      console.log("maquinista",res);
      
    }))
    }
    
     maquinistaVolverActivar(id: number, datos: any) {
      //return this._http.patch(`${this.url}editar/${id}`, dto);
      return this._http.patch(`${this.API_URL}/maquinista/volver-A/${id}`, datos).pipe(tap((res:any)=>{
      console.log("maquinista",res);
      
    }))
    }


    bajaMaquinista(id: number,dato:any) {
      return this._http.patch(`${this.API_URL}/maquinista/eliminar/${id}`,dato).pipe(tap((res:any)=>{
      console.log("maquinista",res);
      
    }))
    }

    actualizarUsuario(dato:any) {
      return this._http.post(`${this.API_URL}/auth/actualizar-usuario`,dato).pipe(tap((res:any)=>{
      console.log("auth",res);
      
    }))
    }

    quitarUsuario(dato:any) {
      return this._http.post(`${this.API_URL}/auth/quitar-usuario`,dato).pipe(tap((res:any)=>{
      console.log("auth",res);
      
    }))
    }
}
