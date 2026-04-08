import { Component, inject } from '@angular/core';
import { logisticaService } from '../../../services/logistica.routes';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Material } from '../material';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-fomulario-producto',
  imports: [FormsModule,CommonModule,
    
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule
  ],
  templateUrl: './fomulario-producto.html',
  styleUrl: './fomulario-producto.css',
})
export class FomularioProducto {
  readonly cerrarDialog = inject(MatDialogRef<Material>);
readonly data = inject<any>(MAT_DIALOG_DATA);
producto = {
    nombre: '',
    cantidad: 0,
    cantidadUnidad: 0,
    unidadMedida: '',
    marca: '',
    estado: '',
    fechaCreacion: '',
    fechaCaducidad: '',
    registroMantenimiento: '',
    fechaAdquisicion: '',
    id_voluntario: ''
  };

  voluntarios: any[] = [];

  constructor(private http: logisticaService) {}
  botonActualizar:boolean =false;
  ngOnInit() {
    //this.cargarVoluntarios();
    if(this.data){
      console.log('--*',this.data);
      this.producto=this.data.data;
      this.botonActualizar=true;
    }
  }

  

  guardar() {
    /*this.http.crearProducto(this.producto).subscribe({
      next: (res) => {
        console.log("Producto guardado", res);
        alert("Producto registrado correctamente");
      },
      error: (err) => {
        console.error(err);
      }
    });*/
  }
  cancelar(){
    this.cerrarDialog.close()
  }
}