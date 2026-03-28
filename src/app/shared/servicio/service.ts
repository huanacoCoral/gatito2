/*import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "../../../../environments/environment.development";

interface User{
    id:string;
    email:string;
}

@Injectable({
providedIn: 'root',
})
export class AuthService{
    private _http = inject(HttpClient);
    token = localStorage.getItem('session');
    autorizacion={ headers: {
                Authorization: `Bearer ${this.token}`
            }
        }
    getUsuarios():Observable<User[]>{
        console.log("tenemos la info aqui para mostrar");
        
            return this._http.get<User[]>(
            `${environment.API_URL}/auth/User`,
            {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            }
        );
    }
    
}*/