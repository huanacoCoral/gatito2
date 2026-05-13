import { Component, inject, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { logisticaService } from '../../services/logistica.service';

@Component({
  selector: 'app-asignar-producto',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
  templateUrl: './asignar-producto.html',
  styleUrl: './asignar-producto.css',
})
export class AsignarProducto implements OnInit, AfterViewInit {
  private fb = inject(FormBuilder);
  protected http = inject(logisticaService);

  asignacionForm!: FormGroup;
  columnasAsignacion: string[] = ['id', 'producto', 'lote', 'cantidad', 'fecha', 'responsable', 'estado', 'acciones'];
  asignacionesSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  lotesProducto: any[] = [];
  lotesProductoFiltrados: any[] = [];
  emergencias: any[] = [];
  voluntarios: any[] = [];
  loteProductoSeleccionado: any = null;
  mostrarFormulario = false;
  cargando = false;

  ngOnInit() {
    this.inicializarFormulario();
    this.cargarDatos();
  }

  ngAfterViewInit() {
    this.asignacionesSource.paginator = this.paginator;
    this.asignacionesSource.sort = this.sort;
  }

  inicializarFormulario() {
    this.asignacionForm = this.fb.group({
      loteProducto: ['', Validators.required],
      cantidad: [0, [Validators.required, Validators.min(1)]],
      tipoDestino: ['', Validators.required],
      destino: ['', Validators.required],
      fechaAsignacion: [new Date(), Validators.required],
      descripcion: ['', Validators.required],
      responsable: [Number(localStorage.getItem('usuario')) || 0, Validators.required]
    });

    this.asignacionForm.get('tipoDestino')?.valueChanges.subscribe(() => {
      this.asignacionForm.get('destino')?.reset();
    });

    this.asignacionForm.get('loteProducto')?.valueChanges.subscribe(valor => {
      this.filtrarLotesProducto(valor);
    });
  }

  cargarDatos() {
    this.cargarLotesProducto();
    this.cargarEmergencias();
   // this.cargarVoluntarios();
    this.cargarAsignaciones();
  }

  cargarLotesProducto() {
    this.http.listarProductos().subscribe({
      next: (resp: any) => {
        this.lotesProducto = resp.filter((lote: any) => lote.stock > 0);
        this.lotesProductoFiltrados = [...this.lotesProducto];
        console.log('qqqq',this.lotesProductoFiltrados);
        
      },
      error: (err) => {
        console.error('Error cargando lotes de producto', err);
      }
    });
  }

  cargarEmergencias() {
    this.http.listarEmergencias().subscribe({
      next: (resp: any) => this.emergencias = resp,
      error: (err) => console.error('Error cargando emergencias', err)
    });
  }

 /* cargarVoluntarios() {
    this.http.listarTodoPersonal().subscribe({
      next: (resp: any) => this.voluntarios = resp,
      error: (err) => console.error('Error cargando voluntarios', err)
    });
  }*/

  cargarAsignaciones() {
    this.http.listarAsignacionesProducto().subscribe({
      next: (resp: any) => {
        console.log(resp);
        
        this.asignacionesSource.data = resp;
      },
      error: (err) => console.error('Error cargando asignaciones de producto', err)
    });
  }

  filtrarLotesProducto(valor: any) {
    if (!valor) {
      this.lotesProductoFiltrados = [...this.lotesProducto];
      return;
    }
    if (typeof valor === 'string') {
      const busqueda = valor.toLowerCase();
      this.lotesProductoFiltrados = this.lotesProducto.filter(lote =>
        lote.tipo?.toLowerCase().includes(busqueda)
      );
    } else {
      this.loteProductoSeleccionado = valor;
      this.lotesProductoFiltrados = [valor];
    }
  }

  mostrarLoteStock(lote: any): string {
    if (!lote) return '';
    if (typeof lote === 'string') return lote;
    return `${lote.tipo} ${lote.nombre} (Stock: ${lote.stock})`;
  }
  mostrarNombreLote(lote: any): string {
  return lote ? `${lote.tipo} - ${lote.nombre} (Stock: ${lote.stock})` : '';
}

  onLoteProductoSeleccionado(event: any) {
    this.loteProductoSeleccionado = event.option.value;
    const cantidadControl = this.asignacionForm.get('cantidad');
    const maxCantidad = this.loteProductoSeleccionado.stock;
    if (cantidadControl) {
      cantidadControl.setValidators([
        Validators.required,
        Validators.min(1),
        Validators.max(maxCantidad)
      ]);
      cantidadControl.updateValueAndValidity();
    }
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
    if (!this.mostrarFormulario) {
      this.limpiarFormulario();
    }
  }
  guardarInformaacion(){
     console.log("asignacionForm--",this.asignacionForm.value);
    const valor=this.asignacionForm.value
    const datos={
      destino: valor.tipoDestino+"",
  unidad: valor.descripcion,
  cantidad: valor.cantidad,
  id_emergencia: valor.tipoDestino,
      id_modificacion:Number(localStorage.getItem('usuario')),
      lotes: [{
         "id_loteProducto": valor.loteProducto.id_loteProducto,
         "cantidad":valor.cantidad
      }]
    }
    console.log("---miraaa",datos);
    
      this.limpiarFormulario();
    
    

    this.http.crearRegistroProducto(datos).subscribe({
      next(value) {
        console.log(value);
        
      },
    })
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.asignacionesSource.filter = filterValue.trim().toLowerCase();
    if (this.asignacionesSource.paginator) {
      this.asignacionesSource.paginator.firstPage();
    }
  }

  guardarAsignacion() {
    if (this.asignacionForm.invalid) {
      return;
    }

    this.cargando = true;
    const formValue = this.asignacionForm.value;
    const lote = formValue.loteProducto;
    const cantidadAsignada = formValue.cantidad;
    const nuevoStock = lote.stock - cantidadAsignada;

    this.http.actualizarLoteProducto(lote.id_loteProducto, { stock: nuevoStock, tipo: lote.tipo }).subscribe({
      next: () => {
        this.registrarAsignacion(formValue, cantidadAsignada, lote);
      },
      error: (err) => {
        console.error('Error actualizando stock de producto', err);
        this.cargando = false;
      }
    });
  }

  registrarAsignacion(formValue: any, cantidadAsignada: number, lote: any) {
    const data = {
      id_loteProducto: lote.id_loteProducto,
      cantidad: cantidadAsignada,
      tipoDestino: formValue.tipoDestino,
      destinoId: formValue.destino,
      fechaAsignacion: new Date(formValue.fechaAsignacion).toISOString(),
      descripcion: formValue.descripcion,
      id_voluntario: formValue.responsable,
      estado: 'A'
    };

    this.http.crearAsignacionProducto(data).subscribe({
      next: () => {
        this.cargarDatos();
        this.mostrarFormulario = false;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error creando asignación de producto', err);
        this.cargando = false;
      }
    });
  }

  editarAsignacion(row: any) {
    console.log('Editar asignación de producto', row);
  }

  eliminarAsignacion(row: any) {
    if (!confirm('¿Eliminar esta asignación de producto?')) {
      return;
    }
    console.log(row,"------a");
    
    const data={
      id_registroProducto:row.id_registroProducto,
      id_modificacion:Number(localStorage.getItem('usuario'))
    }
    this.http.eliminarAsignacionProducto(data).subscribe({
      next: () => this.cargarAsignaciones(),
      error: (err) => console.error('Error eliminando asignación de producto', err)
    });
  }

  devolverProducto(row: any) {
    const lote = this.lotesProducto.find(l => l.id_loteProducto === row.id_loteProducto);
    if (!lote) {
      console.error('Lote de producto no encontrado para devolución');
      return;
    }
    const nuevoStock = lote.stock + row.cantidad;
    this.http.actualizarLoteProducto(lote.id_loteProducto, { stock: nuevoStock, tipo: lote.tipo }).subscribe({
      next: () => {
        this.http.devolverAsignacionProducto(row.id || row.id_asignacionProducto, { estado: 'D' }).subscribe({
          next: () => this.cargarDatos(),
          error: (err) => console.error('Error devolviendo asignación de producto', err)
        });
      },
      error: (err) => console.error('Error actualizando stock en devolución', err)
    });
  }

  obtenerNombreDestino(tipoDestino: string, destinoId: number): string {
    if (tipoDestino === 'emergencia') {
      const emergencia = this.emergencias.find(e => e.id === destinoId);
      return emergencia?.direccion || 'Emergencia desconocida';
    }
    const voluntario = this.voluntarios.find(v => v.id_voluntario === destinoId);
    return voluntario?.nombre || 'Voluntario desconocido';
  }

  limpiarFormulario() {
    this.asignacionForm.reset({
      loteProducto: '',
      cantidad: 0,
      tipoDestino: '',
      destino: '',
      fechaAsignacion: new Date(),
      descripcion: '',
      responsable: Number(localStorage.getItem('usuario')) || 0
    });
    this.loteProductoSeleccionado = null;
    this.lotesProductoFiltrados = [...this.lotesProducto];
  }
}
