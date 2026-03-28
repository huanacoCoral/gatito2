import {  Injectable } from "@angular/core";

@Injectable({
    providedIn:'root',
})
export class StorageService{
    private _storage= localStorage;
    //console.log("estaos en shared data-access");
    get<T>(key: string): T | null {
        const value=this._storage.getItem(key);
        console.log("valor en storage service SHARED/dataAcces-(local Storage):",value);
        if(!value) return null
        
        return  JSON.parse(value) as T; 
    }
    set<T>(key:string, value:T):void{
        console.log("queremos meterle el token ",value); //si no funciona comentar creo q lo fuerza
        
        this._storage.setItem(key, JSON.stringify(value));
    }
    remove(key:string):void{
        this._storage.removeItem(key);
    }
}