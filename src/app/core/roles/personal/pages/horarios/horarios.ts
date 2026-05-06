import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PersonalService } from '../../personal.service';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule, MatOptionModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-horarios',
  standalone: true,
  imports: [MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
  FormsModule,
JsonPipe, ReactiveFormsModule,
CommonModule,

    MatAutocompleteModule,
    MatTableModule,      // Soluciona el error de [dataSource]
    MatPaginatorModule,  // Soluciona el error de <mat-paginator>
    MatSortModule,       // Permite el ordenamiento
    MatIconModule,
    MatNativeDateModule,
     
],
  templateUrl: './horarios.html',
  styleUrl: './horarios.css',
  providers: [provideNativeDateAdapter()]
})
export class Horarios implements OnInit {
 /* readonly http = inject(PersonalService)
  turno: any[] = [];
  personal: any[] = [];
  ngOnInit() {
    this.http.listarTodoPersonal().subscribe({
      next: (res: any) => {
        console.log('respuesta personal', res);
        //this.turno=res;
        this.personal = res;
      }
    })
    this.http.listarTurno().subscribe({
      next: (res: any) => {
        console.log('respuesta de turno', res);
        this.turno = res;
      }
    })
    this.inicializarTabla();
    
  }
  readonly fechas = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  generarCalendario(){
    const fechas = {
    fechaInicio: this.fechas.get('start')?.value,
    fechaFin: this.fechas.get('end')?.value
  };

  this.http.listarTrayectoroariTurno(fechas)
    .subscribe((data: any[]) => { //recibimos la data completa ok

      data.forEach(//(Producto por producto)
        (item, index) => {
        console.log("intemmmm",item);// objeto individual que estamos parados
        console.log('index', index);
        
        

        const fecha = new Date(item.fechaInicio);

        // obtener día (0=domingo → ajustamos)
        let dia = fecha.getDay(); //obtendremos el di de la semana
        dia = dia === 0 ? 6 : dia - 1;//reorganizaremos el calendario y sera lunes el primer dia ya no domingo

        // fila (puedes usar turno)
        const fila = index % 3; //usas para distribuir los turnos en una cuadrícula. hacer calculo, sera de 3  en 3 y luego salto
        //aqui lo dibujamos la tabla
        this.tabla[fila][dia] =
          `${item.turno?.nombre}\n${item.voluntario?.nombre}`;
        
      });

    });

  }


  asSemana = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'];

tabla: any[][] = []; 
  inicializarTabla() {//ssolo dibujmos la tabla
      this.tabla = [];

      // 3 filas (puedes cambiar según turnos)
      for (let i = 0; i < 3; i++) {
        const fila = [];
        for (let j = 0; j < 7; j++) {
          fila.push('--:--');
        }
        this.tabla.push(fila);
      }
    }




  fechaInicio: any
  fechaFin: any
  dia: any
  turnoSeleccionado:any
  idVoluntario:any
  guardarHorario() {
    const data = {
      "id_turno": this.turnoSeleccionado,
      "id_voluntario": this.idVoluntario,
      "fechaInicio": new Date(this.fechaInicio),
      "fechaFin": new Date(this.fechaFin),
      "dia": this.dia
    }
    console.log("***",data);
    
    this.http.asignarTurno(data).subscribe({
      next:(res:any)=>{
        console.log('repuet de asignacio nde turno',res);
        
      },error(err) {
        console.error("respeusta por error de asignacio nde turnos", err);
        
      },
    })
  }
   @ViewChild('miDialogo') miDialogo!: ElementRef<HTMLDialogElement>;
  botonesEditar=false;
  editarHorario(element:any){
   this.miDialogo.nativeElement.showModal();
    this.botonesEditar=true;
    console.log("----* mira esotm andamos ",element);
    
  }
  cancelar(){
    this.botonesEditar=false
  }


}*/
listadoTurnos: any[] = [];
  //trayectoriaTurnos: any[] = [];
  listaPersonal:any;
  filtrarPersonal:any;
  // Formulario de asignación
  turnoForm = new FormGroup({
    d_voluntario: new FormControl('', [Validators.required]),
    id_turno: new FormControl('', [Validators.required]),
    fechaInicio: new FormControl('', [Validators.required]),
    fechaFin: new FormControl(''),
    dia: new FormControl('')
  });

  displayedColumns: string[] = ['voluntario', 'turno', 'dia', 'inicio', 'fin', 'estado','opcion'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  constructor(private _turnosService: PersonalService) { }

  ngOnInit(): void {
    this.cargarCatalogos();
    this.obtenerHistorial();
    this.listarPersonal();
  }

  cargarCatalogos() {
    this._turnosService.listarTurno().subscribe((res:any) => {
      this.listadoTurnos = res;
      console.log("this.listadoTurnos",this.listadoTurnos);
      
    });
  }
  listarPersonal(){
     this._turnosService.listarTodoPersonal().subscribe({
      next: (res: any) => {
        // Asignamos el array a la propiedad .data del MatTableDataSource
        //this.dataSource = new MatTableDataSource(res);
        this.listaPersonal=res;
        this.filtrarPersonal=res;
        console.log(res, "ooooo");

      },
      error: (err) => console.error(err)
    })
  }
 filterCi(): void {
    const valorInput = this.turnoForm.get('d_voluntario')?.value || '';
    const filterValue = valorInput.toString().toLowerCase();

    this.filtrarPersonal = this.listaPersonal.filter((opcion:any) => 
      opcion.ci.toString().toLowerCase().includes(filterValue)
    );
  }
  validarSeleccion(): void {
  const valorActual = this.turnoForm.get('d_voluntario')?.value;

  const existe = this.listaPersonal.some((p:any) => 
    p.id_voluntario === valorActual || p.ci.toString() === valorActual?.toString()
  );

  if (!existe) {
    this.turnoForm.get('d_voluntario')?.setValue(null);
    this.filtrarPersonal = [...this.listaPersonal]; 
  }
}
displayFn(id: number): string {
  if (!id || !this.listaPersonal) return '';
  const persona = this.listaPersonal.find((p:any) => p.id_voluntario === id);
  return persona ? persona.ci.toString() : '';
}
get nombreSeleccionado(): string {
  const id = this.turnoForm.get('d_voluntario')?.value;
  if (!id) return '';
  const persona = this.listaPersonal.find((p:any) => p.id_voluntario === id);
  return persona ? `${persona.nombre} ${persona.apellido_paterno || ''} ${persona.apellido_materno || ''}` : '';
}

  obtenerHistorial() {
    // Si necesitas filtrar por un voluntario específico, pasa el ID en el objeto
    const data = {}; 
    this._turnosService.listarTodoTurnosTrayecto().subscribe(res => {
    //  this.trayectoriaTurnos = res;
    console.log("res",res);
    
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      // Configuramos el filtrado para que busque dentro de objetos anidados (voluntario y turno)
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const dataStr = `${data.voluntario?.nombre} ${data.voluntario?.apellido_paterno} ${data.turno?.nombre} ${data.dia}`.toLowerCase();
        return dataStr.includes(filter);
      };
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  asignar() {
    console.log(this.turnoForm.get('d_voluntario')?.value,"--------------------");
     //const persona = this.listaPersonal.find((p:any) => p.id_voluntario === this.turnoForm.get('d_voluntario')?.value);
    const datos={
      "id_voluntario":Number(this.turnoForm.get('d_voluntario')?.value),
      "dia":this.turnoForm.get('dia')?.value,
      "fechaFin":this.turnoForm.get('fechaFin')?.value,
      "fechaInicio":this.turnoForm.get('fechaInicio')?.value,
      "id_turno":this.turnoForm.get('id_turno')?.value,
      "id_modificacion":Number(localStorage.getItem('usuario'))
    }
    console.log("datosdatos",datos);
    
    if (this.turnoForm.valid) {
      this._turnosService.asignarTurno(datos).subscribe({
        next: (res) => {
          console.log("Asignado con éxito", res);
          this.obtenerHistorial(); // Refrescar tabla
          this.turnoForm.reset();
        },
        error: (err) => console.error("Error al asignar", err)
      });
    }
  }
  eliminar(row:any){
    console.log(row,"----*//");
     const datos={
      "estado":'B',
      "id_modificacion":Number(localStorage.getItem('usuario'))
    }
    
      this._turnosService.editarTrayectoroariTurno(row.id_turnoTrayecto,datos).subscribe({
        next: (res) => {
          console.log("Asignado con éxito", res);
          this.obtenerHistorial(); // Refrescar tabla
          this.turnoForm.reset();
        },
        error: (err) => console.error("Error al asignar", err)
      });
    
  }
  idTurnoTrayecto:any;
  editar(row:any){
    this.editarBoton=true;
    this.turnoForm.patchValue(row);
    const dataFormateada = {
    ...row,
    // Extraemos solo los primeros 10 caracteres: "YYYY-MM-DD"
    fechaInicio: row.fechaInicio ? row.fechaInicio.substring(0, 10) + 'T00:00:00' : '',
    fechaFin: row.fechaFin ? row.fechaFin.substring(0, 10) + 'T00:00:00' : ''
  };
  console.log(dataFormateada,"dataFormateada");
  

  this.turnoForm.patchValue(dataFormateada);
     console.log("--------->>",this.turnoForm.value);
     
    this.idTurnoTrayecto=row.id_turnoTrayecto
  
    
  }
  editarBoton=false;
  actualizar(){
     const formatFecha = (fecha: any) => {
    if (!fecha) return null;
    const d = new Date(fecha);
    // Usamos métodos locales para que no reste un día por la zona horaria
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
   // this.editarBoton=true;
    const datos={
      "d_voluntario":Number(this.turnoForm.get('d_voluntario')?.value),
      "dia":this.turnoForm.get('dia')?.value,
      "fechaFin":formatFecha(this.turnoForm.get('fechaFin')?.value),
      "fechaInicio":formatFecha(this.turnoForm.get('fechaInicio')?.value),
      "id_turno":this.turnoForm.get('id_turno')?.value,
      "id_modificacion":Number(localStorage.getItem('usuario'))
    }
    console.log(datos,"-------------------");
    
    this._turnosService.editarTrayectoroariTurno(this.idTurnoTrayecto,datos).subscribe({
        next: (res) => {
          console.log("Asignado con éxito", res);
          this.obtenerHistorial(); // Refrescar tabla
          this.turnoForm.reset();
        },
        error: (err) => console.error("Error al asignar", err)
      });
  }
  cancelar(){
    this.editarBoton=false;
    this.idTurnoTrayecto=null;
    this.turnoForm.reset({
    d_voluntario: null,
    id_turno: null,
    dia: '',
    fechaInicio: null,
    fechaFin: null
  });

  // 2. Marcar como "no tocado" para quitar los bordes rojos de validación
  this.turnoForm.markAsPristine();
  this.turnoForm.markAsUntouched();

  // 3. Limpiar explícitamente los errores
  Object.keys(this.turnoForm.controls).forEach(key => {
    const control = this.turnoForm.get(key);
    control?.setErrors(null);
  });
  }
  
}
