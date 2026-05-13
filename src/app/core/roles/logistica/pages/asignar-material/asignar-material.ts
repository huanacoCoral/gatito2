import { Component, inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { logisticaService } from '../../services/logistica.service';

@Component({
  selector: 'app-asignar-material',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule
  ],
  templateUrl: './asignar-material.html',
  styleUrl: './asignar-material.css',
})
export class AsignarMaterial implements OnInit, AfterViewInit {
  // ========== INYECCIONES ==========
  private fb = inject(FormBuilder);
  protected http = inject(logisticaService);

  // ========== FORMULARIOS ==========
  asignacionForm!: FormGroup;
  
  // ========== DATA TABLES ==========
  columnasAsignacion: string[] = ['id', 'material', 'loteTipo', 'cantidadAsignada', 'estado','destino', 'fecha', 'responsable',  'acciones'];
  asignacionesSource = new MatTableDataSource<any>([]);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // ========== DATA LISTAS ==========
  lotesMaterial: any[] = [];
  lotesMaterialFiltrados: any[] = [];
  emergencias: any[] = [];
  voluntarios: any[] = [];
  
  listaEmergencia: any[] = [];
   listaFiltradoEmergencia: any[] = [];
  // ========== ESTADO ==========
  loteMaterialSeleccionado: any = null;
  cargando = false;
  mostrarFormulario = false;

  ngOnInit() {
    this.inicializarFormulario();
    this.cargarDatos();
    this.asignacionesSource.filterPredicate = (data: any, filter: string) => {
      console.log('inforrr',data);
      
      const texto = filter.trim().toLowerCase();
      const material = data.loteMaterial?.tipo ?? '';
      const destino = data.tipoDestino?.nombre || data.tipoDestino?.direccion || data.tipoDestino || '';
      const responsable = data.responsableNombre ?? '';
      const cantidad = String(data.cantidadUsada ?? data.cantidad ?? '');
      const estado = String(data.estado ?? '');
      const fecha = String(data.fecha_creacion ?? data.fechaAsignacion ?? '');
      return [material, destino, responsable, cantidad, estado, fecha].join(' ').toLowerCase().includes(texto);
    };
  }

  ngAfterViewInit() {
    this.asignacionesSource.paginator = this.paginator;
    this.asignacionesSource.sort = this.sort;
  }

  // ========== INICIALIZACIÓN ==========
  inicializarFormulario() {
    this.asignacionForm = this.fb.group({
      loteMaterial: ['', Validators.required],
      cantidad: [0, [Validators.required, Validators.min(1)]],
      tipoDestino: ['', Validators.required],
      //destino: ['', Validators.required],
      fechaAsignacion: [new Date(), Validators.required],
      descripcion: ['', Validators.required],
      responsable: [Number(localStorage.getItem('usuario')) || 0, Validators.required]
    });

    // Listener para cambios en tipoDestino
    this.asignacionForm.get('tipoDestino')?.valueChanges.subscribe(tipo => {
      this.cargarDestinos(tipo);
    });

    // Listener para búsqueda de lotes
    this.asignacionForm.get('loteMaterial')?.valueChanges.subscribe(valor => {
      this.filtrarLotesMaterial(valor);
    });
  }

  // ========== CARGA DE DATOS ==========
  cargarDatos() {
    this.cargando = true;
    
    // Cargar lotes de material disponibles
    this.http.listarLoteMaterial().subscribe({
      next: (resp: any) => {
        console.log("-----",resp);
        
        this.lotesMaterial = resp.filter((lote: any) => lote.stock > 0);
        this.lotesMaterialFiltrados = [...this.lotesMaterial];
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error cargando lotes', err);
        this.cargando = false;
      }
    });
    // Cargar lotes de emergencias disponibles
    this.http.listarEmergencias().subscribe({
      next: (resp: any) => {
        console.log(resp,"-----");
        
        this.listaEmergencia = resp.map((e: any) => ({
          id_emergencia: e.id_emergencia,
          nombre: e.nombrePersona,
          direccion: e.direccion,
          hora: e.hora,
          gravedad: e.gravedad?.nombre
        }));
        this.listaFiltradoEmergencia = [...this.listaEmergencia];
        //this.cargando = false;
      },
      error: (err) => {
        console.error('Error cargando lotes', err);
        this.cargando = false;
      }
    });

    // Cargar asignaciones existentes
    this.cargarAsignaciones();
  }

  cargarAsignaciones() {
    this.http.listarRegistroMaterial().subscribe({
      next:(x)=>{
        console.log(x,"@---");
        
        this.asignacionesSource.data = x;
      },
      error(err) {
        console.error("erro a listar ",err);
        
      },
    })
    
  }

  cargarDestinos(tipo: string) {
    this.asignacionForm.get('destino')?.reset();

    if (tipo === 'emergencia') {
      this.emergencias = [];
    } else if (tipo === 'voluntario') {
      this.voluntarios = [];
    }
  }

  // ========== FILTROS ==========
  filtrarLotesMaterial(valor: any) {
    if (!valor) {
      this.lotesMaterialFiltrados = [...this.lotesMaterial];
      return;
    }

    if (typeof valor === 'string') {
      const busqueda = valor.toLowerCase();
      this.lotesMaterialFiltrados = this.lotesMaterial.filter(lote =>
        lote.tipo?.toLowerCase().includes(busqueda)
      );
    } else {
      this.loteMaterialSeleccionado = valor;
      this.lotesMaterialFiltrados = [valor];
    }
  }

  aplicarFiltroTabla(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.asignacionesSource.filter = filterValue.trim().toLowerCase();
    if (this.asignacionesSource.paginator) {
      this.asignacionesSource.paginator.firstPage();
    }
  }

  mostrarTipoStock(lote: any): string {
    if (!lote) return '';
    if (typeof lote === 'string') return lote;
    return `${lote.tipo} ${lote.nombre} (Stock: ${lote.stock})`;
  }
  mostrarLote(lote: any): string {
  if (!lote) return '';

  return `${lote.tipo} |  ${lote.nombre}| Stock: ${lote.stock}`;
}

  // ========== SELECCIÓN ==========
  onLoteSeleccionado(event: any) {
    this.loteMaterialSeleccionado = event.option.value;
    
    const cantidadControl = this.asignacionForm.get('cantidad');
    const maxCantidad = this.loteMaterialSeleccionado.stock;
    
    if (cantidadControl) {
      cantidadControl.setValidators([
        Validators.required,
        Validators.min(1),
        Validators.max(maxCantidad)
      ]);
      cantidadControl.updateValueAndValidity();
    }
  }
  oemergenciaSeleccionado(event: any) {
  const emergencia = event.option.value;

  console.log('Seleccionado:', emergencia);

  this.asignacionForm.get('tipoDestino')?.setValue(emergencia);
}
filtrarEmergencias(event: any) {
  const valor = (event.target?.value ?? '').toLowerCase();

  if (!valor) {
    this.listaFiltradoEmergencia = [...this.listaEmergencia];
    return;
  }

  this.listaFiltradoEmergencia = this.listaEmergencia.filter((e: any) =>
    `${e.id_emergencia ?? ''} ${e.nombrePersona ?? ''} ${e.direccion ?? ''}`
      .toLowerCase()
      .includes(valor)
  );
}
mostrarEmergencia(e: any): string {
  console.log("----**/",e);
  
  if (!e) return '';

  return `${e.id_emergencia} - ${e.nombre} | ${e.direccion} | ${e.hora} | ${e.gravedad}`;
}

  // ========== OPERACIONES ==========
  /*guardarAsignacion() {
    if (this.asignacionForm.invalid) {
      console.error('Formulario inválido', this.asignacionForm.errors);
      return;
    }
    let idMaterial;
    const formValue = this.asignacionForm.value;
    console.log("---ayudaaaaaa",formValue);
    
    const cantidadAsignada = formValue.cantidad;
    const nuevoStock = this.loteMaterialSeleccionado.stock - cantidadAsignada;
    //PASO 1 CREAR REGISTRO
    const datosRegistro={ 
       cantidadUnidad: formValue.descripcion,
        cantidadUsada: formValue.cantidad,
        id_modificacion: Number(localStorage.getItem('usuario'))
    }
    this.http.crearRegistroMaterial(datosRegistro).subscribe({
      next:(value)=> {
        console.log("*****registramos Material",value);
        //Paso2 unir a emergencia
    const datos={
          id_emergencia:formValue.tipoDestino.id_emergencia,
          id_registroMaterial:value.id_registroMaterial,//this.--DEBO CREARLO PRIMERO
          id_modificacion:Number(localStorage.getItem('usuario'))
        }
        this.http.relacionEmergenciaMaterial(datos).subscribe({
          next(value) {
            console.log(value,'@---*');
            //------------------------------------------actualizar
            
          },
        })
        idMaterial=value.id_registroMaterial
        const datoLoteMaterial={
      id_registroMaterial: value.id_registroMaterial,
        id_loteMaterial: this.loteMaterialSeleccionado.id_loteMaterial,
        id_modificacion:Number(localStorage.getItem('usuario'))
     }
     this.http.crearResitroMaterTieneLote(datoLoteMaterial).subscribe({
      next(value) {
        console.log("registtro material tiene lote mater",value);
        
      },
     })
      },
    })
    //paso 3 enlazar con stok  materia relacion tienelote material
    

    // PASO 4: Descontar del stock
    const actualizarLote = {
      stock: nuevoStock,
      tipo: this.loteMaterialSeleccionado.tipo
    };

    this.http.actualizarLote(this.loteMaterialSeleccionado.id_loteMaterial, actualizarLote).subscribe({
      next: (resp: any) => {
        console.log('Lote actualizado:', resp);
        this.registrarAsignacion(formValue, cantidadAsignada);
      },
      error: (err) => {
        console.error('Error actualizando lote', err);
      }
    });
     

  }*/
 guardarAsignacion() {

  if (this.asignacionForm.invalid) {
    console.error('Formulario inválido');
    return;
  }

  const formValue = this.asignacionForm.value;

  const cantidadAsignada = formValue.cantidad;

  // validar stock
  if (cantidadAsignada > this.loteMaterialSeleccionado.stock) {
    console.error('No hay suficiente stock');
    return;
  }

  const nuevoStock =
    this.loteMaterialSeleccionado.stock - cantidadAsignada;

  // PASO 1
  const datosRegistro = {
    cantidadUnidad: formValue.descripcion,
    cantidadUsada: formValue.cantidad,
    id_modificacion: Number(localStorage.getItem('usuario'))
  };

  this.http.crearRegistroMaterial(datosRegistro).subscribe({

    next: (registro: any) => {

      console.log('Registro creado', registro);

      // PASO 2
      const datosEmergencia = {
        id_emergencia: formValue.tipoDestino.id_emergencia,
        id_registroMaterial: registro.id_registroMaterial,
        id_modificacion: Number(localStorage.getItem('usuario'))
      };

      this.http.relacionEmergenciaMaterial(datosEmergencia).subscribe({

        next: (respEmer: any) => {

          console.log('Relacion emergencia OK', respEmer);

          // PASO 3
          const datoLoteMaterial = {
            id_registroMaterial: registro.id_registroMaterial,
            id_loteMaterial: this.loteMaterialSeleccionado.id_loteMaterial,
            id_modificacion: Number(localStorage.getItem('usuario'))
          };

          this.http.crearResitroMaterTieneLote(datoLoteMaterial)
            .subscribe({

            next: (respLote: any) => {

              console.log('Relacion lote OK', respLote);

              // PASO 4 actualizar stock
              const actualizarLote = {
                stock: nuevoStock,
                tipo: this.loteMaterialSeleccionado.tipo
              };

              this.http.actualizarLote(
                this.loteMaterialSeleccionado.id_loteMaterial,
                actualizarLote
              ).subscribe({

                next: (respStock: any) => {

                  console.log('Stock actualizado', respStock);

                  // PASO FINAL
                  this.registrarAsignacion(
                    formValue,
                    cantidadAsignada
                  );

                  console.log('TODO OK');
                },

                error: (err) => {
                  console.error(
                    'Error actualizando stock',
                    err
                  );
                }

              });

            },

            error: (err) => {
              console.error(
                'Error relacionando lote',
                err
              );
            }

          });

        },

        error: (err) => {
          console.error(
            'Error relacionando emergencia',
            err
          );
        }

      });

    },

    error: (err) => {
      console.error(
        'Error creando registro material',
        err
      );
    }

  });

}

  registrarAsignacion(formValue: any, cantidadAsignada: number) {
    const dataAsignacion = {
      id_loteMaterial: this.loteMaterialSeleccionado.id_loteMaterial,
      cantidad: cantidadAsignada,
      tipoDestino: formValue.tipoDestino,
      destinoId: formValue.destino,
      fechaAsignacion: new Date(formValue.fechaAsignacion).toISOString(),
      descripcion: formValue.descripcion,
      id_voluntario: formValue.responsable,
      estado: 'A'
    };

    console.log('Asignación a registrar:', dataAsignacion);
    this.limpiarFormulario();
    this.cargarAsignaciones();
  }

  // ========== ACCIONES EN TABLA ==========
  editarAsignacion(asignacion: any) {
    console.log('Editar asignación:', asignacion);
  }

  eliminarAsignacion(asignacion: any) {
    if (confirm('¿Estás seguro de que deseas eliminar esta asignación?')) {
      console.log('Eliminar asignación:', asignacion);
      this.http.eliminarAsignacionMaterial({id_registroMaterial:asignacion.id_registroMaterial}).subscribe({
        next:(value)=>{
          this.cargarAsignaciones();
        },
      })
    }

  }

  devolverMaterial(asignacion: any) {
    console.log('Devolver material:', asignacion);
  }

  // ========== UTILIDADES ==========
  limpiarFormulario() {
    this.asignacionForm.reset({
      tipoDestino: '',
      destino: '',
      fechaAsignacion: new Date(),
      responsable: Number(localStorage.getItem('usuario')) || 0
    });
    this.loteMaterialSeleccionado = null;
    this.mostrarFormulario = false;
  }

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
    if (!this.mostrarFormulario) {
      this.limpiarFormulario();
    }else{
      this.cargarAsignaciones();
    }
  }

  obtenerNombreDestino(tipoDestino: string, destinoId: number): string {
    if (tipoDestino === 'emergencia') {
      const emergencia = this.emergencias.find(e => e.id === destinoId);
      return emergencia?.direccion || 'Emergencia desconocida';
    } else if (tipoDestino === 'voluntario') {
      const voluntario = this.voluntarios.find(v => v.id_voluntario === destinoId);
      return voluntario?.nombre || 'Voluntario desconocido';
    }
    return 'Destino desconocido';
  }

  //-----------------------
  

}
