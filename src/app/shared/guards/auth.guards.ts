import { CanActivateFn, Router } from "@angular/router";
import { AuthStateService } from "../data-access/auth-state.service";
import { inject } from "@angular/core";

export const errorInicioSesion=():CanActivateFn=>{
    console.log('somos el problema');    
    return ()=>{
        const authService=inject(AuthStateService);
        const router = inject (Router);
        const session =authService.getSession();
        console.log("tenemos en sesion",session);
        
        if(session){
            return true;
        }
        // si ya estamos en /auth/log-in, no redirigir
    
        router.navigateByUrl('/auth/log-in')
        return false;
    };
}
export const inicioSesion=():CanActivateFn=>{
    return ()=>{
        const authService=inject(AuthStateService);
        const router = inject (Router);
        const session =authService.getSession();
        if(session){
            router.navigateByUrl('/dashboard')
            return false;
        }
        
        return true;
    };
}