import { Routes } from '@angular/router';

export const routesOperaciones: Routes = [
    {
     path: '',                                // ruta vacía
    loadComponent: () =>
      import('../operaciones/pages/personal/personal').then(m=>m.Personal)
    },
     {
     path: 'personal',                                
    loadComponent: () =>
      import('../operaciones/pages/personal/personal').then(m=>m.Personal)
    },
    {
    path: 'material',                                
    loadComponent: () =>
      import('../operaciones/pages/material/material').then(m=>m.Material)
    },
    {
     path: 'vehiculo',                                
    loadComponent: () =>
      import('../operaciones/pages/vehiculo/vehiculo').then(m=>m.Vehiculo)
    },
    {
     path: 'emergencia',                                
    loadComponent: () =>
      import('../operaciones/pages/reportes/reportes').then(m=>m.Reportes)
    },

    
]