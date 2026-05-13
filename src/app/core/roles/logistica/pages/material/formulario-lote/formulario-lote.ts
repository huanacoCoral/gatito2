import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { logisticaService } from '../../../services/logistica.service';
import { Material } from '../material';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-formulario-lote',
  imports: [FormsModule,
     MatFormFieldModule,
     MatButtonModule,
  MatIconModule,
      MatInputModule, MatCardModule,MatDialogModule],
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
    "nombre":this.dataL.nombre,
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
editraLoteMaterialOpcion=false;
id:any
editarLoteMaterialPoblado(row:any){
  console.log("-----",row);
   this.dataL = {
    tipoMaterial: row.tipo,
    nombre: row.nombre || '',
    stockMaterial: row.stock
  };
this.dataL.tipoMaterial=row.tipo
this.dataL.nombre=row.nombre
this.dataL.stockMaterial=row.stock,
this.id=row.id_loteMaterial
this.editraLoteMaterialOpcion=true;
}
 editarLoteMaterial(){
  
  //console.log("-----",row);
  const datos={
    stock:this.dataL.stockMaterial,
    tipo:this.dataL.tipoMaterial,
    nombre:this.dataL.nombre,
    id_modificacion:Number(localStorage.getItem('usuario'))
  }
  
  this.http.actualizarLote(this.id, datos).subscribe({
              next: (res) => {
                console.log('Stock actualizado con éxito', res);
                this.listarMaterial(); 
              },
              error: (err) => console.error('Error al actualizar stock', err)
            });
 }
 eliminarMaterial(row:any){
  this.id=row.id_loteMaterial;
  
this.http.actualizarLote(this.id, {estado:'B',id_modificacion:Number(localStorage.getItem('usuario'))}).subscribe({
              next: (res) => {
                console.log('Stock eliminar con éxito', res);
                this.listarMaterial(); 
              },
              error: (err) => console.error('Error al actualizar stock', err)
            });
 }


 //--------lote formulario producto 
 guardarLoteProducto(){
  const data={
    "stock":this.dataL.stockProducto,
    "tipo":this.dataL.tipoProducto,
    "nombre":this.dataL.nombre,
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
 editarLoteProductoOpcion=false;
 seleccionaProducEdit(row:any){
    console.log("-----",row);
   this.dataL = {
    tipoProducto: row.tipo,
    nombre: row.nombre || '',
    stockProducto: row.stock
  };
this.id=row.id_loteProducto//---------
this.editarLoteProductoOpcion=true;
 }
 actualizarLote(){
  const datos={
    stock:this.dataL.stockMaterial,
    tipo:this.dataL.tipoMaterial,
    nombre:this.dataL.nombre,
    id_modificacion:Number(localStorage.getItem('usuario'))
  }
  this.http.actualizarLoteProducto(this.id,datos).subscribe({
    next:(value)=> {
      console.log(value);
      this.listarProducto();
    },
  })
 }
 eliminaProducEdit(row:any){
  this.id=row.id_loteProducto
  const datos={
    id_modificacion:Number(localStorage.getItem('usuario'))
  }
  this.http.eliminarLoteProducto(this.id,datos).subscribe({
    next:(value)=> {
      console.log(value);
      this.listarProducto();
    },
    error(err) {
      console.error("error al eliminar",err);
      
    },
  })
 }

}
