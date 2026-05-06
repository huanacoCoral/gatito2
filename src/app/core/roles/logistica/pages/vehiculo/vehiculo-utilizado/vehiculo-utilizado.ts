import { Component, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-vehiculo-utilizado',
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  FormsModule],
  templateUrl: './vehiculo-utilizado.html',
  styleUrl: './vehiculo-utilizado.css',
})
export class VehiculoUtilizado implements OnInit{
  //@Inject(MAT_DIALOG_DATA) public data: any
  kilometraje:any={};
  mostrar:any
  constructor(
    public dialogRef: MatDialogRef<VehiculoUtilizado>,
    @Inject(MAT_DIALOG_DATA) public data: any // <--- Asegúrate de que esto esté así
  ) {}
  ngOnInit(){
    console.log("----",this.data);
    this.mostrar=this.data

  }
}
