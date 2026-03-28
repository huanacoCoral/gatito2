import { Injectable } from "@angular/core";
import { StorageService } from "./storage.service";
interface Session {
    access_token: string;
}
interface Rol {
    rol: string;
}
@Injectable({
    providedIn: 'root',
})
export class AuthStateService {
    private _storageService = new StorageService();
    //salir
    singOut() {
        this._storageService.remove('session');
    }
    //entrar
    getSession(): Session | null {  // es un metodo que va a devolver Session o null
        let currentSession: Session | null = null;  
        console.log("estamos aqui");
        
        const maybeSession = this._storageService.get<Session>('session');
        console.log("verificaremos si es valido el tockens",maybeSession);
        
        if (maybeSession !== null) {
            
            if (this._isValidSession(maybeSession)) {
                currentSession = maybeSession;
            }
            else{
                this.singOut();
                //verificar si llega session pero con un codigo raro en json
            }
        }
        else{
            this.singOut();
        }
        
        return currentSession;
    }
    private _isValidSession(maybeSession: unknown): boolean {
        return (
            typeof maybeSession === 'object' &&
            maybeSession !== null &&
            'access_token' in maybeSession
        );
    }
    //guardar  -rol 
   
}