import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogContent } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { logisticaService } from '../../services/logistica.service';
export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

@Component({
  selector: 'app-asignar-material',
  imports: [MatButtonModule, MatDividerModule, MatIconModule,
    MatCardModule,
    //JsonPipe,
    MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,

    MatDialogContent,

    
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    ],
  templateUrl: './asignar-material.html',
  styleUrl: './asignar-material.css',
})
export class AsignarMaterial {
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

applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.productoSource.filter = filterValue.trim().toLowerCase();

    if (this.productoSource.paginator) {
      this.productoSource.paginator.firstPage();
    }
  }
}
