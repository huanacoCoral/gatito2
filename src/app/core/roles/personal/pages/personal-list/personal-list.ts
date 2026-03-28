
import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import PersonalForm from '../personal-form/personal-form';
import { PersonalService } from '../../personal.service';
import { VerDatosTs } from '../ver-datos.ts/ver-datos.ts';
import Swal from 'sweetalert2';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}



@Component({
  selector: 'app-personal-list',
  imports: [MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
 MatSortModule, MatPaginatorModule
  ],
  templateUrl: './personal-list.html',
  styleUrl: './personal-list.css',
})
export default class PersonalList implements OnInit,AfterViewInit {
  readonly http = inject(PersonalService)
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
  dataSource = new MatTableDataSource<any>([]);;
  readonly _http = inject(PersonalService);
  ngOnInit() {
    this._http.listarTodoPersonal().subscribe({
      next: (res: any) => {
        // Asignamos el array a la propiedad .data del MatTableDataSource
        //this.dataSource = new MatTableDataSource(res);
        this.dataSource.data=res
        console.log(res, "ooooo");

      },
      error: (err) => console.error(err)
    }
    )
    this.http.listarDeBaja().subscribe({
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

  private _formBuilder = inject(FormBuilder);
  firstFormGroup = this._formBuilder.group({
   
  });
  secondFormGroup = this._formBuilder.group({
  
  });
  actualizar(){
    this._http.listarTodoPersonal().subscribe({
      next: (res: any) => {
        this.dataSource.data = res;
        console.log(res, "ooooo");

      },
      error: (err) => console.error(err)
    }
    )
  }
  //solo ver de baja
    displayedColumnsDeBaja: string[] = ['id', 'name', 'progress', 'fruit'];
    dataSourceDeBaja = new MatTableDataSource<any>([]);

    @ViewChild(MatPaginator) paginatorDeBaja!: MatPaginator;
    @ViewChild(MatSort) sortDeBaja!: MatSort;
  
    

    ngAfterViewInit() {
      this.dataSourceDeBaja.paginator = this.paginatorDeBaja;
      this.dataSourceDeBaja.sort = this.sortDeBaja;
    }

    applyFilterDeBaja(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSourceDeBaja.filter = filterValue.trim().toLowerCase();

      if (this.dataSourceDeBaja.paginator) {
        this.dataSourceDeBaja.paginator.firstPage();
      }
    }


  //

  readonly dialog = inject(MatDialog);
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filter, "qqqq");

  }
  agregarNuevo() {
    const dialogRef = this.dialog.open(PersonalForm, {
      data: { name: "this.name()", animal: "this.animal()" },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      /*if (result !== undefined) {
        this.animal.set(result);
      }*/
    });

  }
  respuestaDatos = '';
  verDatos(datos: any) {
    console.log("datos", datos);
    const dialogRef = this.dialog.open(VerDatosTs, {
      data: { datos: datos, animal: 'this.animal()' },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      /*if (result !== undefined) {
        this.respuestaDatos=result;
      }*/
    });
  }
  editar(row: any) {
    console.log("datos a enviar: ", row);

    const dialogRef = this.dialog.open(PersonalForm, {
      data: { datos: row, tipo: "editar" },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      /*if (result !== undefined) {
        this.animal.set(result);
      }*/
    });
  }
  eliminar(row: any) {
    console.log("----row", row);
    this.http.eliminar(row).subscribe({
      next: (res: any) => {
        console.log('respuestaaaa ', res);

      },
      error: (err: any) => {
        console.error("error", err);
        const mensajeError = err.error?.message || 'Error desconocido';
        const detalleTecnico = err.error?.detail || '';
        Swal.fire({
          icon: 'error',
          title: 'Hubo un problema',
          text: mensajeError,
          footer: `<span>${detalleTecnico}</span>` // Para ver el error técnico en pequeñito
        })
      }
    })
    Swal.fire({
      title: '¡Buen trabajo!',
      text: 'SweetAlert2 ya está funcionando',
      icon: 'success',
      confirmButtonText: 'Genial'
    });
  }


}
