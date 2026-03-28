import { Routes } from "@angular/router";

export const routesPersonal: Routes = [
    {
    path: '',                                // ruta vacía
    loadComponent: () =>
      import('../personal/pages/personal-list/personal-list')
  },
  // opcional: mantener listarPersonal si quieres otra URL
  {
    path: 'listarPersonal',
    loadComponent: () =>
      import('../personal/pages/personal-list/personal-list')
  },
  {
    path: 'horarios',
    loadComponent: () =>
      import('../personal/pages/horarios/horarios').then(m=>m.Horarios)
  },
  { path: '**', redirectTo: '' }            // relativo
]