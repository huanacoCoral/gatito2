import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { jefeGuardiaService } from '../../server/jefeGuadia.service';


@Component({
  selector: 'app-informe-emergencia',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  MatDialogModule],
  templateUrl: './informe-emergencia.html',
  styleUrl: './informe-emergencia.css',
})
export class InformeEmergencia implements OnInit{
  private readonly http = inject(jefeGuardiaService);
  public readonly data = inject(MAT_DIALOG_DATA);
   public readonly fb = inject(FormBuilder);
  listaEmergencias: any[] = [];
listaVoluntarios: any[] = [];
form = this.fb.group({
  descripcion: ['', Validators.required]
 
});
 informe:any ;
 editar=false;
constructor() {
  console.log("---",this.data);
  this.generarInforme();
} 
ngOnInit(): void {
   // ✔ validar bien el array
    if (this.data?.informes && this.data.informes.length > 0) {
      this.editar = true;

      // ✔ tomar el primer informe (o el que necesites)
      const ultimoInforme = this.data.informes[0];

      this.form.patchValue({
        descripcion: ultimoInforme.descripcion
      });
    }
}
cancelar(){

}
guardar(){
  const dato={
    id_Emergencia:this.data.id_emergencia,
    descripcion:this.form.value.descripcion,
    id_voluntario:Number(localStorage.getItem('usuario'))
  }
  this.http.crearInformeEmergenciaTermino(dato).subscribe({
    next(value) {
      console.log(value);
      
    },
  })
}
actualiza(){
  const dato={
    id_informeEmergencia:this.data.informes[0].id_informeEmergencia,
    id_Emergencia:this.data.id_emergencia,
    descripcion:this.form.value.descripcion,
    id_modificacion:Number(localStorage.getItem('usuario'))
  }
  console.log('---ssss',dato);
  
  this.http.actualizarInformeEmergenciaTerminor(dato).subscribe({
    next(value) {
      console.log(value);
      
    },
  })
}
datosPdf:any
generarInforme() {

  const e = this.data;

  const voluntario = e.voluntario
    ? `${e.voluntario.nombre} ${e.voluntario.apellido_paterno} ${e.voluntario.apellido_materno}`
    : 'No asignado';

  const vehiculos = e.vehiculos?.length > 0
    ? e.vehiculos.map((v: any) => v.nombre || v.id_vehiculo).join(', ')
    : 'No se usó vehículo';

  const participantes = e.recepciones?.length > 0
    ? e.recepciones.map((r: any) => r.id_voluntario).join(', ')
    : 'Sin participantes';
const vehiculosX = e.vehiculos?.length > 0
  ? e.vehiculos.map((v: any, i: number) => `
Vehículo ${i + 1}
- ID Vehículo: ${v.id_vehiculo}
- Maquinista: ${v.maquinista?.nombre || ''} ${v.maquinista?.apellido_paterno || ''}
- Licencia: ${v.maquinista?.tipoLicencia || 'No tiene'}
- Fecha asignación: ${v.fecha_creacion}
`).join('\n')
  : 'No se usaron vehículos';
  this.informe = `
EMERGENCIA
------------------------
Tipo: ${e.tipoRecepcion}
Gravedad: ${e.gravedad?.nombre || 'Sin gravedad'}
Nivel de gravedad: ${e.gravedad?.nivel || 'No definido'}

VEHÍCULO:
${vehiculosX}

RECEPCIONADO POR:
${voluntario}

PARTICIPANTES:
${participantes}

FECHA:
${e.fecha}

HORA:
${e.hora}

DIRECCIÓN:
${e.direccion}

CÉLULAR:
${e.cel_ref}

PERSONA REPORTADA:
${e.nombrePersona}
  `;
  this.datosPdf=voluntario
}
generarPdf() {
  window.print();
}
}
