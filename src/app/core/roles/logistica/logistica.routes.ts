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
      import('../logistica/pages/vehiculo/vehiculo').then(m=>m.VehiculoComponent)
    },
    {
    path: 'asignar-material',                                // ruta vacía
    loadComponent: () =>
      import('../logistica/pages/asignar-material/asignar-material').then(m=>m.AsignarMaterial)
    },
    {
    path: 'asignar-producto',                                // ruta vacía
    loadComponent: () =>
      import('../logistica/pages/asignar-producto/asignar-producto').then(m=>m.AsignarProducto)
    },
    
    


]