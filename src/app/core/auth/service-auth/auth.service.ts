import { HttpClient } from "@angular/common/http";
import { inject, Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';
import { environment } from "../../../../environments/environment.development";
import { StorageService } from "../../../shared/data-access/storage.service";
//import { StorageService } from "../../shared/data-access/storage.service";

@Injectable({
    providedIn:'root',
})
export class AuthService {
    private _http= inject (HttpClient);
    private _storage= inject(StorageService)
    private readonly API_URL = environment.API_URL;
   // token = localStorage.getItem('session');
     inicioSesion(data:any):Observable<any>{
        return this._http
        .post(this.API_URL+'/auth/log-in',data)
        .pipe(tap((res:any)=>
           {
            const body = typeof res === 'string' ? JSON.parse(res) : res;
            this._storage.set('session',  { access_token: body.access_token })
            this._storage.set('rol',res.rol)
            }
            
        ))

    }

}