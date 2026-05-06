import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { logisticaService } from '../../../services/logistica.service';
import { Material } from '../material';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-formulario-lote',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatCardModule],
  templateUrl: './formulario-lote.html',
  styleUrl: './formulario-lote.css',
})
export class FormularioLote implements OnInit{
readonly data = inject<any>(MAT_DIALOG_DATA);
readonly http=inject(logisticaService);
readonly cerrarDialog = inject(MatDialogRef<Material>);
loteMaterial:any;
loteProdcuto:any;
dataL:any={};

 ngOnInit(): void {
  this.dataL.stockMaterial=0;
  this.dataL.stockProducto=0;
  console.log(this.data,"dataaa");
  if(this.data.data=='material'){
    this.listarMaterial();
  }else{
    this.listarProducto();
  }
 }
 listarMaterial(){
  this.http.listarLoteMaterial().subscribe({
      next:(value)=> {
        console.log(value);
        this.loteMaterial=value
      },
      error(err) {
        console.error("error  lote materiall",err);
        
      },
    })
 }
 listarProducto(){
  this.http.listarProductos().subscribe({
      next:(value)=> {
        console.log(value);
         this.loteProdcuto=value
      },
      error(err) {
        console.error("error  lote productos",err);
        
      },
    })
 }
 guardarLoteMaterial(){
  const data={
    "stock":this.dataL.stockMaterial,
    "tipo":this.dataL.tipoMaterial,
    "id_modificacion":Number(localStorage.getItem('usuario'))
  }
  console.log(
    data,"------------**"
  );
  
  this.http.crearLoteMaterial(data).subscribe({
    next:(value)=> {
      console.log('value',value);
      this.listarMaterial();
    },
    error:(err)=> {
      console.error("error ",err);
      
    },
  })
 }


 //--------lote formulario producto 
 guardarLoteProducto(){
  const data={
    "stock":this.dataL.stockProducto,
    "tipo":this.dataL.tipoProducto,
    "id_modificacion":Number(localStorage.getItem('usuario'))
  }
  console.log("11111",data);
  
  this.http.crearloteProductos(data).subscribe({
    next:(value)=> {
      console.log('value',value);
      this.listarProducto();
    },
    error:(err)=> {
      console.error("error ",err);
      
    },
  })
 }

}
