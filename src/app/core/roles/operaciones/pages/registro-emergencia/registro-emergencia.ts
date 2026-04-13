import { AfterViewInit, Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Formulario } from './formulario/formulario';
import { OperacionesService } from '../../service/operaciones.service';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


@Component({
  selector: 'app-registro-emergencia',
  imports: [MatFormFieldModule, 
    MatInputModule, 
    MatTableModule,
    MatCardModule, 
    MatButtonModule,
    MatPaginatorModule,
  MatIconModule,

  //MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
  
],
  templateUrl: './registro-emergencia.html',
  styleUrl: './registro-emergencia.css',
})
export class RegistroEmergencia implements AfterViewInit , OnInit {
  displayedColumns: string[] = ['id', 'fecha', 'nombrePersona', 'cel_ref','recepcion','opciones'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(){
    this.http.listarEmergencia().subscribe({
      next:(res:any)=>{
        console.log('morire',res);
        this.dataSource.data=res;
      },
      error(err) {
        console.error(err);
        
      },
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  readonly dialog = inject(MatDialog);
  readonly animal = signal('');
  readonly http=inject(OperacionesService);
  materialNuevoEdit(row?:any){
    const dialogRef = this.dialog.open(Formulario, {
      data: {name: "this.name()", animal: "this.animal()"},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('crerando dialog');
      if (result !== undefined) {
        this.animal.set(result);
        console.log(this.animal,"nooo puede ser ");
        
      }
    });
  }
}
