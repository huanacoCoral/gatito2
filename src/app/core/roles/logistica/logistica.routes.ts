import { Routes } from "@angular/router";

export const routesLogistica: Routes = [
    {
    path: '',                                // ruta vacía
    loadComponent: () =>
      import('../logistica/pages/material/material').then(m=>m.Material)
    },
    {
    path: 'personal',                                // ruta vacía
    loadComponent: () =>
      import('../logistica/pages/personal/personal').then(m=>m.Personal)
    },
    {
    path: 'material',                                // ruta vacía
    loadComponent: () =>
      import('../logistica/pages/material/material').then(m=>m.Material)
    },
    {
    path: 'vehiculos',                                // ruta vacía
    loadComponent: () =>
      import('../logistica/pages/vehiculo/vehiculo').then(m=>m.Vehiculo)
    },
    


]