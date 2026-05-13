import { Component, inject, OnInit, ViewChild } from '@angular/core'; // Añadido ViewChild
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'; // Importante para el paginador
import { MatSort, MatSortModule } from '@angular/material/sort'; // Importante para el ordenamiento
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { jefeGuardiaService } from '../server/jefeGuadia.service';
import { MatDialog } from '@angular/material/dialog';
import { FormularioEmergencia } from './formulario-emergencia/formulario-emergencia';
import { InformeEmergencia } from './informe-emergencia/informe-emergencia';

@Component({
  selector: 'app-emergencia',
  standalone: true, // Asegúrate de que esto esté presente
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './emergencia.html',
  styleUrl: './emergencia.css',
})
export class Emergencia implements OnInit {
  private readonly http = inject(jefeGuardiaService);

  // Estas columnas deben coincidir EXACTAMENTE con los matColumnDef de tu HTML
  displayedColumnsDeBaja: string[] = ['id', 'direccion', 'nombrePersona', 'fecha','hora','opcion','informe'];
  
  dataSource = new MatTableDataSource<any>([]);

  // Referencias para que el paginador y el sort funcionen
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog: MatDialog) {}
  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.http.listarEmergencias().subscribe({
      next: (value) => {
        this.dataSource.data = value;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  agregarNuevo() {
    const nuevoMaterial=this.dialog.open(FormularioEmergencia,{
         
            width: '700px',      // Ancho fijo
            height: '90vh',     // Se ajusta al contenido 
            autoFocus: false
            });
            nuevoMaterial.afterClosed().subscribe(respuesta=>{
              console.log('cerrado');
              this.listar();
            })
  }
  editar(datos:any) {
    const nuevoMaterial=this.dialog.open(FormularioEmergencia,{
          data:datos,
            width: '700px',      // Ancho fijo
            height: '90vh',     // Se ajusta al contenido 
            autoFocus: false
            });
            nuevoMaterial.afterClosed().subscribe(respuesta=>{
              console.log('cerrado');
              
            })
  }
  eliminar(datos:any){
    const dato={
      id_modificacion:Number(localStorage.getItem('usuario'))
    }
    this.http.eliminarEmergencia(datos.id_emergencia,dato).subscribe({
      next:(value)=> {
        console.log(value);
        this.listar();
      },
    })
    
  }
  informe(row:any){
    const nuevoMaterial=this.dialog.open(InformeEmergencia,{
          data:row,
            width: '700px',      // Ancho fijo
            height: '90vh',     // Se ajusta al contenido 
            autoFocus: false
            });
            nuevoMaterial.afterClosed().subscribe(respuesta=>{
              console.log('cerrado');
              
            })
  }
}