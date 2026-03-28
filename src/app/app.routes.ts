import { Routes } from '@angular/router';
import { errorInicioSesion, inicioSesion } from './shared/guards/auth.guards';
//import { privateGuard, publicGuard } from './shared/guards/auth.guard';

export const routes: Routes = [ //para redireccionar
   {
    path:'auth',
    canActivate: [inicioSesion()],
    loadChildren:()=>import('./core/auth/auth.routes')
   },
   {
    path:'',
    canActivate: [errorInicioSesion()], 
    loadComponent: () => import('./core/layout/private-layout.component') .then((m:any) => m.PrivateLayoutComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./core/dashboard/dashboard')
      },
      {
        path: 'rol',
        loadChildren: () => import('./core/roles/roles.routes').then(m => m.routesRoles),
      }
    ]
  },
   {
        path:'**',
        redirectTo:'auth/log-in'
    }
];
