import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menuPorRol: any = {
    PERSONAL: [
      { label: 'VERIFICAR PERSONAL', route: '/rol/personal' },
      { label: 'Asignar horarios', route: '/rol/personal/horarios' }
    ],
    LOGISTICA: [
      { label: 'Personal', route: '/rol/logistica/personal' },
      { label: 'Material', route: '/rol/logistica/material' },
      { label: 'Vehículos', route: '/rol/logistica/vehiculos' }
    ],
    OPERACIONES: [
      { label: 'Emergencias', route: '/operaciones/emergencias' },
      { label: 'Informes', route: '/operaciones/informes' }
    ],
    
    JEFE_GUARDIA: [
      { label: 'Dashboard', route: '/jefe/dashboard' },
      { label: 'Personal', route: '/jefe/personal' }
    ],
    COMANDANTE: [
      { label: 'Dashboard', route: '/jefe/dashboard' },
      { label: 'Personal', route: '/jefe/personal' }
    ]
  };

  getMenuPorRol(rol: string) {
    console.log("estamos en el menu", rol);
    return this.menuPorRol[rol] ?? [];
  }
}