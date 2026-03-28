import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { Observable, tap } from "rxjs";

@Injectable({
    providedIn:'root',
})
export class DashboardService {
    private _http= inject (HttpClient);
    private readonly API_URL = environment.API_URL;
   // token = localStorage.getItem('session');
    mostrarInformacion(): Observable<any> {
    return this._http.get(`${this.API_URL}/auth/entramos`).pipe(
      tap((res: any) => {
        console.log("Nos devuelve token por primera consulta:", res);
      })
    );
  }
}