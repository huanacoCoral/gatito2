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
   
   
   
  
   

}
