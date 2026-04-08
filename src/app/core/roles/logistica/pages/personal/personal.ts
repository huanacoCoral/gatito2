import { Component, inject, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { logisticaService } from '../../services/logistica.service';
import { MatDialog } from '@angular/material/dialog';
import { VisualizarInf } from './visualizar-inf/visualizar-inf';

@Component({
  selector: 'app-personal',
  imports: [MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,

    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatSortModule, MatPaginatorModule],
  templateUrl: './personal.html',
  styleUrl: './personal.css',
})
export class Personal {
  @Input() tipo:string='Logistica'
  displayedColumns: string[] = [
    'position',
    'nombre',
    //'apellido_materno', 
    //'apellido_paterno', 
    'ci',
    //'correo_personal',
    'direccion',
    'estado',
    //'fecha_ingreso',
    //'fecha_nacimiento',
    //'id_voluntario',
    //'nombre',
    //'observaciones',
    'sexo',
    //'telefono',
    //'telefono_emergencia'
    'opciones'
  ];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSourceDeBaja = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginatorDeBaja!: MatPaginator;
  @ViewChild(MatSort) sortDeBaja!: MatSort;
  displayedColumnsDeBaja: string[] = ['id', 'name', 'progress', 'fruit'];

  private _formBuilder = inject(FormBuilder);
  readonly _http = inject(logisticaService);

  firstFormGroup = this._formBuilder.group({

  });
  secondFormGroup = this._formBuilder.group({

  });

  ngOnInit() {
    this._http.listarTodoPersonal().subscribe({
      next: (res: any) => {
        // Asignamos el array a la propiedad .data del MatTableDataSource
        //this.dataSource = new MatTableDataSource(res);
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
        console.log(res, "ooooo");

      },
      error: (err) => console.error(err)
    }
    )
    this._http.listarDeBaja().subscribe({
      next: (res: any) => {
        // prueba
        this.dataSourceDeBaja.data = res;
        this.dataSourceDeBaja.paginator = this.paginatorDeBaja;
        this.dataSourceDeBaja.sort = this.sortDeBaja;
        console.log(res, "ooo.o...........o");

      },
      error: (err) => console.error(err)
    })
  }
  filtrarActivos(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  filtrarBaja(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceDeBaja.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceDeBaja.paginator) {
      this.dataSourceDeBaja.paginator.firstPage();
    }
  }
readonly dialog = inject(MatDialog);
  verInformacion(datos:any){
    const nuevaVentana=this.dialog.open(VisualizarInf, {
      data:{
        datos:datos
      }
    });
    nuevaVentana.afterClosed().subscribe(res=>{

    })

  }

}
