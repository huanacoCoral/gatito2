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
      { label: 'Vehículos', route: '/rol/logistica/vehiculos' },
      { label: 'Asignar material', route: '/rol/logistica/asignar-material' },
      { label: 'Asignar producto', route: '/rol/logistica/asignar-producto' },
      { label: 'Devolucion material', route: '/rol/logistica/devolver-producto'}//devolver-producto
    ],
    OPERACIONES: [
      { label: 'Administración', route: '/rol/operaciones/admin' },
      { label: 'Verificar personal', route: '/rol/operaciones/personal' },
      { label: 'Verificar material / producto', route: '/rol/operaciones/material' },
      { label: 'Verificar estado de vehículo', route: '/rol/operaciones/vehiculo' },
      { label: 'Registrar emergencias', route: '/rol/operaciones/emergencia' },
    ],
    
    JEFE_GUARDIA: [
      { label: 'Verificar personal', route: '/rol/jefe-guardia/personal' },
      { label: 'Visualizar Material', route: '/rol/jefe-guardia/material' },
      { label: 'Visualizar Horarios', route: '/rol/jefe-guardia/horarios' },
      { label: 'Emergencia', route: '/rol/jefe-guardia/emergencia' }
      
    ],
    COMANDANTE: [
      { label: 'Dashboard', route: '/jefe/dashboard' },
      { label: 'Personal', route: '/rol/logistica/personal' }
    ]
  };

  getMenuPorRol(rol: string) {
    console.log("estamos en el menu", rol);
    return this.menuPorRol[rol] ?? [];
  }
}