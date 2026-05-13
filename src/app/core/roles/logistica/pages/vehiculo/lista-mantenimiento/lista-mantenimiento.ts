import { Component, Inject, inject } from '@angular/core';
import { logisticaService } from '../../../services/logistica.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-lista-mantenimiento',
  imports: [MatTableModule,
  MatButtonModule,
  MatIconModule],
  templateUrl: './lista-mantenimiento.html',
  styleUrl: './lista-mantenimiento.css',
})
export class ListaMantenimiento {
  readonly http=inject(logisticaService)
  mantenimiento:any;
  displayedColumns: string[] = [
  'id',
  'descripcion',
  'fecha',
  'voluntario',
  'acciones'
];

    constructor(private dialogRef: MatDialogRef<ListaMantenimiento>,
    @Inject(MAT_DIALOG_DATA) public data: any
){
  console.log("----->",data);
        this.listar();
 
  }
  listar(){
     this.http.listarMatenimiento({id_vehiculo:this.data.vehiculo.id_vehiculo}).subscribe({
    next:(value)=> {
      console.log(value);
      this.mantenimiento=value
    },
    error(err) {
      console.error(err);
      
    },
  })
  }
  eliminar(x:any){
     console.log("----*->",x);
        const datos ={
          id_modificacion:Number(localStorage.getItem('usuario'))
        }
  this.http.eliminarMantenimientoVehiculos(x.id_mantenimiento,datos  ).subscribe({
    next:(value)=> {
      console.log(value);
      this.mantenimiento=value;
      this.listar();
    },
    error(err) {
      console.error(err);
      
    },
  })
  }


}
