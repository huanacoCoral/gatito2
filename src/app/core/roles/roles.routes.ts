import { Routes } from '@angular/router';

export const routesRoles: Routes = [
  {
    path: 'personal',
    canActivate: [],
    loadChildren: () =>
      import('../roles/personal/personal.routes').then(m => m.routesPersonal)
  },
  {
    path: 'logistica',
    canActivate: [],
    loadChildren: () =>
      import('../roles/logistica/logistica.routes').then(m => m.routesLogistica)
  },
  {
    path: 'operaciones',
    canActivate: [],
    loadChildren: () =>
      import('../roles/operaciones/operaciones.routes').then(m => m.routesOperaciones)
  },
  

  

  {
    path: 'jefe-guardia',
    canActivate: [],
    loadChildren: () =>
      import('../roles/operaciones/operaciones.routes').then(m => m.routesOperaciones)
  },

  { path: '**', redirectTo: 'dashboard' }
];