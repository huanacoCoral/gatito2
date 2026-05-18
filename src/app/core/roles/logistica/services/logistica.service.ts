import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
//import { environment } from '../../../../environments/environment.development';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class logisticaService {
  private _http=inject(HttpClient);
   private readonly API_URL = environment.API_URL;


   listarPersonal(data:any):Observable<any>{
    console.log('borrar---------------');
    
    return this._http.get(this.API_URL+'/personal',data)
    .pipe(tap((res:any)=>{
      console.log(res);
      
    }))
   }
   
  listarTodoPersonal():Observable<any>{
    return this._http.get(this.API_URL+'/personal/listar')
    .pipe(tap((res:any)=>{
      console.log(res);
      
    }))
   }
  
   listarDeBaja():Observable<any>{
    return this._http.get(this.API_URL+'/personal/listar_de_baja ').pipe(tap((res:any)=>{
      console.log("respuesta de creacio nde personal",res);
      
    }))
   }
   //material
   listarMaterial():Observable<any>{
    return this._http.get(this.API_URL+'/material/listar-infomres-ingresoMaterial ').pipe(tap((res:any)=>{
      //console.log("respuesta de creacio nde personal",res);
      
    }))
   }
   //crear-ingresar-material
   crearIngresarMaterial(data:any):Observable<any>{
    return this._http.post(this.API_URL+'/material/crear-ingresar-material',data).pipe(tap((res:any)=>{
      //console.log("respuesta de creacio nde personal",res);
      
    }))
   }
   editarIngresarMaterial(id:number,data:any):Observable<any>{
    return this._http.post(this.API_URL+`/material/actualizar-ingresar-material-${id}`,data).pipe(tap((res:any)=>{
      //console.log("respuesta de creacio nde personal",res);
      
    }))
   }
   listarLoteMaterial():Observable<any>{
    return this._http.get(this.API_URL+'/material/listar-lote-material').pipe(tap((res:any)=>{
      //console.log("respuesta de creacio nde personal",res);
      
    }))
   }
   crearLoteMaterial(data:any):Observable<any>{
    return this._http.post(this.API_URL+'/material/crear-lote',data).pipe(tap((res:any)=>{
      //console.log("respuesta de creacio nde personal",res);
      
    }))
   }
   actualizarLote(id: number, data: any): Observable<any> {
  // Usamos backticks (`) para poder meter la variable ${id} fácilmente
  return this._http.patch(`${this.API_URL}/material/actualizarlote-${id}`, data).pipe(
    tap((res: any) => {
      // Aquí puedes manejar la respuesta si lo necesitas
    })
  );
  
  
}
   ///------------------producto
  listarInformeProductos(): Observable<any> {
  // Usamos backticks (`) para poder meter la variable ${id} fácilmente
  return this._http.get(`${this.API_URL}/producto/listar-ingreso-producto`).pipe(
    tap((res: any) => {
      // Aquí puedes manejar la respuesta si lo necesitas
    })
  );
}//-------creo q esta mal 
listarProductos(): Observable<any> {///listar lote productosss
  // Usamos backticks (`) para poder meter la variable ${id} fácilmente
  return this._http.get(`${this.API_URL}/producto/listar-lotes-producto`).pipe(
    tap((res: any) => {
      // Aquí puedes manejar la respuesta si lo necesitas
    })
  );
}

crearloteProductos(data:any): Observable<any> {
  // Usamos backticks (`) para poder meter la variable ${id} fácilmente
  return this._http.post(`${this.API_URL}/producto/create-lote-producto`,data).pipe(
    tap((res: any) => {
      // Aquí puedes manejar la respuesta si lo necesitas
    })
  );
}

crearProducto(data:any): Observable<any> {
  return this._http.post(`${this.API_URL}/producto/crear-ingreso-producto`, data).pipe(
    tap((res: any) => {
      // Aquí puedes manejar la respuesta si lo necesitas
    })
  );
}

actualizarLoteProducto(id: number, data: any): Observable<any> {
  console.log("id",id,"data",data);
  
  return this._http.put(`${this.API_URL}/producto/actualizar-lote-producto/${id}`, data).pipe(
    tap((res: any) => {
      // Aquí puedes manejar la respuesta si lo necesitas
    })
  );
}
eliminarLoteProducto(id: number, data: any): Observable<any> {
  console.log("id",id,"data",data);
  
  return this._http.put(`${this.API_URL}/producto/eliminar-lote-producto/${id}`, data).pipe(
    tap((res: any) => {
      // Aquí puedes manejar la respuesta si lo necesitas
    })
  );
}

crearAsignacionProducto(data:any): Observable<any> {
  return this._http.post(`${this.API_URL}/producto/crear-asignacion-producto`, data).pipe(
    tap((res: any) => {
      // Aquí puedes manejar la respuesta si lo necesitas
    })
  );
}

listarAsignacionesProducto(): Observable<any> {
  return this._http.get(`${this.API_URL}/producto/listar-asignaciones-producto`).pipe(
    tap((res: any) => {
      // Aquí puedes manejar la respuesta si lo necesites
    })
  );
}

eliminarAsignacionProducto(data: any): Observable<any> {
  return this._http.post(`${this.API_URL}/producto/eliminar-asignacion-producto`, data).pipe(
    tap((res: any) => {
      // Aquí puedes manejar la respuesta si lo necesites
    })
  );
}

devolverAsignacionProducto(id: number, data: any): Observable<any> {
  return this._http.put(`${this.API_URL}/producto/devolver-asignacion-producto/${id}`, data).pipe(
    tap((res: any) => {
      // Aquí puedes manejar la respuesta si lo necesites
    })
  );
}


eliminarIngresarProducto(id: number, data: any): Observable<any> {
  return this._http.put(`${this.API_URL}/producto/eliminar-ingreso-producto/${id}`, data).pipe(
    tap((res: any) => {
      // Aquí puedes manejar la respuesta si lo necesitas
    })
  );
}
actualizarIngresoProducto(id: number, data: any): Observable<any> {
  return this._http.put(`${this.API_URL}/producto/actualizar-ingreso-producto/${id}`, data).pipe(
    tap((res: any) => {
      // Aquí puedes manejar la respuesta si lo necesitas
    })
  );
}

///---------
listarInformeVehiculos(): Observable<any> {
  return this._http.get(`${this.API_URL}/vehiculos/ingreso`).pipe(
    tap((res: any) => {
      // Aquí puedes manejar la respuesta si lo necesitas
    })
  );
}
crearInformeVehiculos(data:any): Observable<any> {
  return this._http.post(`${this.API_URL}/vehiculos/ingreso`,data).pipe(
    tap((res: any) => {
      // Aquí puedes manejar la respuesta si lo necesitas
    })
  );
}

editarInformeVehiculos(id:number,data:any): Observable<any> {
  return this._http.put(`${this.API_URL}/vehiculos/ingreso-editar/${id}`,data).pipe(
    tap((res: any) => {
      // Aquí puedes manejar la respuesta si lo necesitas
    })
  );
}
eliminarInformeVehiculos(id:number,data:any): Observable<any> {
  return this._http.put(`${this.API_URL}/vehiculos/eliminar-editar/${id}`,data).pipe(
    tap((res: any) => {
      // Aquí puedes manejar la respuesta si lo necesitas
    })
  );
}
 //--mateniiento-
 listarMatenimiento(data:any): Observable<any> {
  return this._http.post(`${this.API_URL}/vehiculos/listar-mantenimiento`,data).pipe(
    tap((res: any) => {
      // Aquí puedes manejar la respuesta si lo necesitas
    })
  );
}
 crearMantenimiento(data:any): Observable<any> {
  return this._http.post(`${this.API_URL}/vehiculos/crear-mantenimiento/`,data).pipe(
    tap((res: any) => {
      // Aquí puedes manejar la respuesta si lo necesitas
    })
  );
}
editarMantenimientoVehiculos(id:number,data:any): Observable<any> {
  return this._http.put(`${this.API_URL}/vehiculos/editar-mantenimiento`,data).pipe(
    tap((res: any) => {
      // Aquí puedes manejar la respuesta si lo necesitas
    })
  );
}
eliminarMantenimientoVehiculos(id:number,data:any): Observable<any> {
  return this._http.put(`${this.API_URL}/vehiculos/eliminar-mantenimiento/${id}`,data).pipe(
    tap((res: any) => {
      // Aquí puedes manejar la respuesta si lo necesitas
    })
  );
}
listarEmergencias():Observable<any>{
    return this._http.get(this.API_URL+'/emergencias').pipe(tap((res:any)=>{
      //console.log("respuesta de creacio nde personal",res);
      
    }))
   }
   agregarKilometraje(datos:any):Observable<any>{
    return this._http.post(this.API_URL+'/vehiculos/actualizar-kilometraje',datos).pipe(tap((res:any)=>{
      //console.log("respuesta de creacio nde personal",res);
      
    }))
   }

crearRegistroMaterial(data:any): Observable<any> {
  return this._http.post(`${this.API_URL}/material/crear-registroMaterial/`,data).pipe(
    tap((res: any) => {
      // Aquí puedes manejar la respuesta si lo necesitas
    })
  );
}



   
   relacionEmergenciaMaterial(data:any):Observable<any>{
    return this._http.post(this.API_URL+'/material/relacion-emergencia-utilizo-material',data).pipe(tap((res:any)=>{
      //console.log("respuesta de creacio nde personal",res);
      
    }))
   }
   listarRegistroMaterial():Observable<any>{
    return this._http.get(this.API_URL+'/material/listar-registroMaterial').pipe(tap((res:any)=>{
      //console.log("respuesta de creacio nde personal",res);
      
    }))
   }

    crearResitroMaterTieneLote(data:any):Observable<any>{
    return this._http.post(this.API_URL+'/material/crear-reg-material-lote',data).pipe(tap((res:any)=>{
      //console.log("respuesta de creacio nde personal",res);
      
    }))
   }
   eliminarAsignacionMaterial(data:any):Observable<any>{
    return this._http.post(this.API_URL+'/material/eliminar-asignacion',data).pipe(tap((res:any)=>{
      //console.log("respuesta de creacio nde personal",res);
      
    }))
   }

   crearRegistroProducto(data:any):Observable<any>{
    return this._http.post(this.API_URL+'/producto/crear-registro-producto',data).pipe(tap((res:any)=>{
      //console.log("respuesta de creacio nde personal",res);
      
    }))
   }

   ///////////////////////
    // ======================================================
  // SALIDA MATERIAL
  // ======================================================

  crearSalidaMaterial(data: any) {

    return this._http.post(this.API_URL+`/material/salida`,
      data,
    );

  }

  // ======================================================
  // DEVOLUCION MATERIAL
  // ======================================================

  crearDevolucionMaterial(data: any) {

    return this._http.post(this.API_URL+`/material/devolucion`,
      data,
    );

  }

  // ======================================================
  // MATERIAL DAÑADO
  // ======================================================

  registrarDanioMaterial(data: any) {

    return this._http.post(this.API_URL+`/material//danado`,
      data,
    );

  }

  // ======================================================
  // MATERIAL PERDIDO
  // ======================================================

  registrarPerdidaMaterial(data: any) {

    return this._http.post(this.API_URL+`/material//perdida`,
      data,
    );

  }

  // ======================================================
  // DAR BAJA MOVIMIENTO
  // ======================================================

  darBajaMovimientoMaterial(
    id_registroMaterial: number,
    id_modificacion: number,
  ) {

    return this._http.delete(this.API_URL+`/material/baja/${id_registroMaterial}/${id_modificacion}`,
    );

  }

}
