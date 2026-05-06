import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { VehiculoService } from '../vehiculo.service';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { VehiculoComponent } from '../vehiculo';
import { logisticaService } from '../../../services/logistica.service';

@Component({
  selector: 'app-vehiculo-form-dialog-component',
  imports: [ReactiveFormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,],
  templateUrl: './vehiculo-form-dialog-component.html',
  styleUrl: './vehiculo-form-dialog-component.css',
})
export class VehiculoFormDialogComponent implements OnInit{
    readonly http=inject(logisticaService)
form: FormGroup;
 //@Inject(MAT_DIALOG_DATA) public data: any

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<VehiculoComponent>,
   // private vehiculoService: VehiculoService
   @Inject(MAT_DIALOG_DATA) public data: any 
  ) {
    this.form = this.fb.group({
  tipo: ['', Validators.required],
  nombre: ['', Validators.required],
  marca: ['', Validators.required],
  modelo: ['', Validators.required],
  anioFabricacion: [new Date().getFullYear(), [Validators.required, Validators.min(1900)]],
  numeroPlaca: ['', Validators.required],
  numeroSerie: ['', Validators.required],
  kilometrajeIngreso: [, [Validators.required]],
  descripcion: [''],
  intervaloTiempoRevision: ['', Validators.required],
  registroDocumentacion: [''],
  id_voluntario: [Number(localStorage.getItem('usuario'))],
  //id_vehiculo: [1] // Si es edición, vendrá un ID; si es nuevo, puede ser nulo o autogenerado
});
  }
  ngOnInit(){
    
    //console.log("--11--mando datos del padre ", this.data);
    if(this.data){
      console.log("----mando datos del padre ", this.data);
     this.form.patchValue(this.data);
    }
  }

  limpiar(): void {
    this.form.reset({ fecha: new Date(), kilometraje: 0 });
  }

  guardar(): void {
   console.log("---entramos",this.form.value);
   
    if (!this.form.invalid) {
       const datoEnviar=this.form.value
       console.log("------->>",datoEnviar);
       
     // this.form.markAllAsTouched();
     this.http.crearInformeVehiculos(datoEnviar).subscribe({
      next:(value:any) =>{
        console.log(value);
        this.dialogRef.close(this.form.value);
      },
     })
      return;
    }
    //const {conductor, kilometraje} = this.form.value;
    //console.log(conductor,kilometraje);
    //const nombre = conductor;
    //const kilometrajeUtilizado = kilometraje; 
    //this.vehiculoService.createVehiculo({nombre,kilometrajeUtilizado}).subscribe()
    // Cierra el dialog y devuelve los datos al componente padre
    //this.dialogRef.close(this.form.value);
  }
  actualizar(){
    // this.form.markAllAsTouched();
    const datos={
      ...this.form.value,
      id_modificacion:Number(localStorage.getItem('usuario'))
    }
    console.log("datos",datos);
    

     this.http.editarInformeVehiculos(this.data.id_ingresoInformeVehiculo,datos).subscribe({
      next:(value:any) =>{
        console.log(value);
        this.dialogRef.close(this.form.value);
      },
     })
  }

}
