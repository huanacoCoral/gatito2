import { Component, inject, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { logisticaService } from '../../../services/logistica.service';
import { CommonModule, NgClass } from '@angular/common';
@Component({
  selector: 'app-vehiculo-utilizado',
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  FormsModule,
NgClass,
CommonModule ],
  templateUrl: './vehiculo-utilizado.html',
  styleUrl: './vehiculo-utilizado.css',
})
export class VehiculoUtilizado implements OnInit{
  //@Inject(MAT_DIALOG_DATA) public data: any
  private http= inject(logisticaService)
  kilometraje:any;
  kilometrajeActual:any;
  mostrar:any;
  animarAuto: boolean = false; 
  constructor(
    public dialogRef: MatDialogRef<VehiculoUtilizado>,
    @Inject(MAT_DIALOG_DATA) public data: any // <--- Asegúrate de que esto esté así
  ) {}
  ngOnInit(){
    console.log("----",this.data);
    this.mostrar=this.data
    this.kilometraje=this.data.vehiculo.kilometrajeUtilizado;
    this.kilometrajeActual=this.data.vehiculo.kilometrajeUtilizado;
    
  }
  kilometrajeRegistro(){
    const valor={
      id_vehiculo:this.data.vehiculo.id_vehiculo,
      kilometrajeUtilizado:Number(this.kilometraje),
      id_modificacion:Number(localStorage.getItem('usuario'))
    }
    this.http.agregarKilometraje(valor).subscribe({
      next:(value)=> {
        console.log(value);
        this.animarAuto = true; // Activa la animación;
    setTimeout(() => {
      this.animarAuto = false; // Devuelve el auto a su lugar
      this.dialogRef.close(value);
    }, 600);

      },
    })
  }
}
