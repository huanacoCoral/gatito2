import { Routes } from "@angular/router";

export const jefeGuardia: Routes = [
    {
    path: '',                                // ruta vacía
    loadComponent: () =>
      import('../jefe-guardia/personal/personal').then(m=>m.Personal)
    },
    {
    path: 'personal',                                // ruta vacía
    loadComponent: () =>
      import('../jefe-guardia/personal/personal').then(m=>m.Personal)
    },
    {
    path: 'material',                                // ruta vacía
    loadComponent: () =>
      import('../jefe-guardia/material/material').then(m=>m.Material)
    },
    {
    path: 'horarios',                                // ruta vacía
    loadComponent: () =>
      import('../jefe-guardia/horarios/horarios').then(m=>m.Horarios)
    },
    {
      path: 'emergencia',                                // ruta vacía
    loadComponent: () =>
      import('../jefe-guardia/emergencia/emergencia').then(m=>m.Emergencia)
    },
    


]