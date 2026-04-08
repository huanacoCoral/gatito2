import { Component } from '@angular/core';

@Component({
  selector: 'app-reportes',
  imports: [],
  templateUrl: './reportes.html',
  styleUrl: './reportes.css',
})
export class Reportes {
emergencias: any[] = [];

crearEmergencia() {
  console.log("Ir a crear emergencia");
}

ver(e: any) {
  console.log("Ver", e);
}

editar(e: any) {
  console.log("Editar", e);
}
}
