import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { logisticaService } from '../../../services/logistica.service';

@Component({
  selector: 'app-mantenimiento-vehiculo',
  imports: [ReactiveFormsModule,
 MatFormFieldModule, // Para el contenedor <mat-form-field>
    MatInputModule,     // Para que funcione el directiva matInput
     
    MatDialogModule

  ],
  templateUrl: './mantenimiento-vehiculo.html',
  styleUrl: './mantenimiento-vehiculo.css',
})
export class MantenimientoVehiculo {
  readonly http=inject(logisticaService)
    
vehiculos: any[] = [];
  voluntarios: any[] = [];
  private fb=inject( FormBuilder);
  editar:any;
  constructor(
    
    private dialogRef: MatDialogRef<MantenimientoVehiculo>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  form = this.fb.group({
    descripcion: ['', Validators.required],
    fecha: ['', Validators.required],
   
  });

  ngOnInit() {
    // si mandas datos desde el padre
    //this.vehiculos = this.data.vehiculos || [];
    //this.voluntarios = this.data.voluntarios || [];
  }

  guardar() {
    const dato = {
      ...this.form.value,
      id_vehiculo: this.data.vehiculo.id_vehiculo,

      id_voluntario:Number(localStorage.getItem('usuario'))
    };
    this.http.crearMantenimiento(dato).subscribe({
      next:(value)=> {
        console.log(value,"--*");
        
      },
    })

    console.log("GUARDAR MANTENIMIENTO:", dato);


    this.dialogRef.close(dato);
  }
    actualizar() {
    const dato = {
      ...this.form.value,
      id_vehiculo: this.data.vehiculo.id_vehiculo,

      id_voluntario:Number(localStorage.getItem('usuario'))
    };
    this.http.crearMantenimiento(dato).subscribe({
      next:(value)=> {
        console.log(value,"--*");
        
      },
    })

    console.log("GUARDAR MANTENIMIENTO:", dato);


    this.dialogRef.close(dato);
  }

  cerrar() {
    this.dialogRef.close();
  }
}
