import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { FomularioMaterial } from './fomulario-material/fomulario-material';
import { FomularioProducto } from './fomulario-producto/fomulario-producto';
import { logisticaService } from '../../services/logistica.routes';
import { JsonPipe } from '@angular/common';
export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}



@Component({
  selector: 'app-material',
  imports: [MatButtonModule, MatDividerModule, MatIconModule,
    MatCardModule,
    //JsonPipe,
    MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule
    
  ],
  templateUrl: './material.html',
  styleUrl: './material.css',
})
export class Material {
tablaMaterial: string[] = ['id', 'lote', 'responsable', 'tipo','estado','cantidad','opciones'];//
  materialSource!: MatTableDataSource<UserData>;//---cracion de tabla

  @ViewChild(MatPaginator) paginatorMaterial!: MatPaginator;
  @ViewChild(MatSort) sortMaterial!: MatSort;
  mostrarMaterial:boolean =false;
  

productoColumns: string[] = ['id', 'id_loteProducto', 'estado', 'marca','opciones'];
  productoSource!: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginatorProducto!: MatPaginator;
  @ViewChild(MatSort) sortProducto!: MatSort;
  


  mostrarProductos:boolean =false;
  protected http=inject(logisticaService);
  constructor() {
    // Create 100 users
    //const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    
     this.materialSource = new MatTableDataSource<any>([]);
    this.listar();

    this.productoSource= new MatTableDataSource<any>([]);
    this.listarProducto();
  }

  ngAfterViewInit() {
    this.productoSource.paginator = this.paginatorProducto;
    this.productoSource.sort = this.sortProducto;
  }
  listar(){
    this.http.listarMaterial().subscribe({
      next:(resp:any)=>{
        console.log("respeusta de material A",resp);
        this.materialSource.data=resp;
        console.log(this.materialSource.data);
        
      },
      error(err) {
        console.error("error listar material",err);
        
      },
    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.productoSource.filter = filterValue.trim().toLowerCase();

    if (this.productoSource.paginator) {
      this.productoSource.paginator.firstPage();
    }
  }
  dialogMaterial=inject(MatDialog);
  materialNuevoEdit(datos?:any){
    //data:{}
      if(datos){
        const nuevoMaterial=this.dialogMaterial.open(FomularioMaterial,{
        data:{data:datos},
        width: '700px',      // Ancho fijo
    height: '90vh',     // Se ajusta al contenido 
    autoFocus: false
      });
      nuevoMaterial.afterClosed().subscribe(respuesta=>{
        console.log('cerrado dialog');
        this.listar();
      })
      }else{
      const nuevoMaterial=this.dialogMaterial.open(FomularioMaterial,{
      //data:{}
       width: '700px',      // Ancho fijo
      height: '90vh',     // Se ajusta al contenido
      //disableClose: true
      });
      nuevoMaterial.afterClosed().subscribe(respuesta=>{
        console.log('cerrado dialog');
        this.listar();
        
      })
    }
    
    
  }

  //-------------------------------------------producto
  listarProducto(){
    this.http.listarProductos().subscribe({
      next:(value:any)=>{
        console.log('respuestaaa ',value);
        this.productoSource.data=value
        
      },
      error(err) {
        console.error('error en listar producto',err);
        
      },
    })
  }

  dialogProducto=inject(MatDialog);
  productoDialog(datos?:any){
    console.log('lll');
    
    if(datos){
      const nuevoMaterial=this.dialogProducto.open(FomularioProducto,{
      data:{data:datos},
        width: '700px',      // Ancho fijo
        height: '90vh',     // Se ajusta al contenido 
        autoFocus: false
        });
        nuevoMaterial.afterClosed().subscribe(respuesta=>{
          console.log('cerrado');
          
        })
    }else{
      const nuevoMaterial=this.dialogProducto.open(FomularioProducto,{
      
        width: '700px',      // Ancho fijo
        height: '90vh',     // Se ajusta al contenido 
        autoFocus: false
        });
        nuevoMaterial.afterClosed().subscribe(respuesta=>{
          console.log('cerrado');
          
        })
    }
    
   
  }
  verInfo(){

  }
}
