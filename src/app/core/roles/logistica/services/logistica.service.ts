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
 

}
