import {
  Component,
  inject,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import {
  MatPaginator,
  MatPaginatorModule,
} from '@angular/material/paginator';

import {
  MatSort,
  MatSortModule,
} from '@angular/material/sort';

import {
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';

import { MatSelectModule } from '@angular/material/select';

import {
  MatAutocompleteModule,
} from '@angular/material/autocomplete';

import {
  MatDatepickerModule,
} from '@angular/material/datepicker';

import {
  MatNativeDateModule,
} from '@angular/material/core';

import { MatDialogModule } from '@angular/material/dialog';

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
    MatDialogModule,
  ],

  templateUrl: './asignar-material.html',
  styleUrl: './asignar-material.css',
})
export class AsignarMaterial
  implements OnInit, AfterViewInit {
  // ======================================================
  // INYECCIONES
  // ======================================================

  private fb = inject(FormBuilder);

  protected http = inject(logisticaService);

  // ======================================================
  // FORMULARIO
  // ======================================================

  asignacionForm!: FormGroup;

  columnasAsignacion: string[] = [
    'id',
    'material',
    'cantidad',
    'tipoMovimiento',
    'destino',
    'fecha',
    'estado',
    'acciones',
  ];

  asignacionesSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  // ======================================================
  // LISTAS
  // ======================================================

  lotesMaterial: any[] = [];

  lotesMaterialFiltrados: any[] = [];

  listaEmergencia: any[] = [];

  listaFiltradoEmergencia: any[] = [];

  // ======================================================
  // ESTADOS
  // ======================================================

  loteMaterialSeleccionado: any = null;

  cargando = false;

  mostrarFormulario = false;

  // ======================================================
  // INIT
  // ======================================================

  ngOnInit(): void {
    this.inicializarFormulario();
    this.cargarDatos();
    this.asignacionesSource.filterPredicate =
      (data: any, filter: string) => {
        const texto = filter.trim().toLowerCase();
        const material =data.lotes?.[0]?.loteMaterial?.tipo ?? '';
        const cantidad = data.lotes?.[0]?.cantidad ?? '';
        const movimiento = data.tipoMovimiento ?? '';
        const destino = data.destino ?? '';
        return `
          ${material}
          ${cantidad}
          ${movimiento}
          ${destino}
        `
          .toLowerCase()
          .includes(texto);
      };
  }

  ngAfterViewInit(): void {

    this.asignacionesSource.paginator =this.paginator;
    this.asignacionesSource.sort =this.sort;
  }

  // ======================================================
  // FORM
  // ======================================================
  listaMaterialAsignar:any []=[];
listandoMaterial() {
  const lote = this.asignacionForm.get('loteMaterial')?.value;
  const cantidadSolicitada = this.asignacionForm.get('cantidad')?.value;

  if (cantidadSolicitada > 0 && this.cantidadMateria >= cantidadSolicitada) {
    
    const yaExiste = this.listaMaterialAsignar.some(
      item => item.id_loteMaterial === lote?.id_loteMaterial
    );

    if (yaExiste) {
      alert('Este material ya ha sido agregado.');
      return;
    }

    const datos = {
      id_loteMaterial: lote.id_loteMaterial,
      cantidad: cantidadSolicitada,
      unidad: this.asignacionForm.get('unidad')?.value,
      tipo: lote.tipo,
      nombre: lote.nombre,
    };

    this.listaMaterialAsignar = [
      ...this.listaMaterialAsignar,
      datos
    ];

    this.asignacionForm.patchValue({
      loteMaterial: null,
      unidad: null,
      cantidad: null
    });
  }
}
eliminarMaterialSeleccionado(material: any): void {
  this.listaMaterialAsignar = this.listaMaterialAsignar.filter(
    item => item !== material
  );
}
  inicializarFormulario(): void {
    this.asignacionForm =
      this.fb.group({
        loteMaterial: [''],
        cantidad: [
          0,
          [],
        ],

        tipoMovimiento: [
          'SALIDA',Validators.required,],
        destino: ['',Validators.required,],

        id_emergencia: [
          null,
        ],

        unidad: [
          '',
        ],

        responsable: [
          Number( localStorage.getItem('usuario')) || 0,
        ],
      });

    // filtrar lote
    this.asignacionForm .get('loteMaterial')?.valueChanges.subscribe((valor) => {
        this.filtrarLotesMaterial(valor);
      });
  }

  // ======================================================
  // CARGAR DATOS
  // ======================================================

  cargarDatos(): void {

    this.cargando = true;

    // =========================
    // LOTES
    // =========================

    this.http.listarLoteMaterial()
      .subscribe({

        next: (resp: any) => {

          this.lotesMaterial =
            resp.filter(
              (x: any) =>
                x.estado === 'A'
            );

          this.lotesMaterialFiltrados =
            [...this.lotesMaterial];

          this.cargando = false;
        },

        error: (err) => {

          console.error(
            'Error cargando lotes',
            err
          );

          this.cargando = false;
        },
      });

    // =========================
    // EMERGENCIAS
    // =========================

    this.http.listarEmergencias()
      .subscribe({

        next: (resp: any) => {

          this.listaEmergencia = resp;

          this.listaFiltradoEmergencia =
            [...this.listaEmergencia];
        },

        error: (err) => {

          console.error(
            'Error emergencias',
            err
          );
        },
      });

    // =========================
    // MOVIMIENTOS
    // =========================

    this.cargarAsignaciones();
  }

  cargarAsignaciones(): void {

    this.http
      .listarRegistroMaterial()
      .subscribe({

        next: (resp: any) => {

          console.log(
            'movimientos',
            resp
          );

          this.asignacionesSource.data =
            resp;
        },

        error: (err) => {

          console.error(
            'Error listando',
            err
          );
        },
      });
  }

  // ======================================================
  // FILTROS
  // ======================================================

  filtrarLotesMaterial(valor: any): void {

    if (!valor) {

      this.lotesMaterialFiltrados =
        [...this.lotesMaterial];

      return;
    }

    if (typeof valor === 'string') {

      const texto =
        valor.toLowerCase();

      this.lotesMaterialFiltrados =
        this.lotesMaterial.filter(
          (x: any) =>
            x.tipo
              ?.toLowerCase()
              .includes(texto)
        );

    } else {

      this.loteMaterialSeleccionado =
        valor;
    }
  }

  aplicarFiltroTabla(event: Event): void {

    const valor =
      (event.target as HTMLInputElement)
        .value;

    this.asignacionesSource.filter =
      valor.trim().toLowerCase();

    if (this.asignacionesSource.paginator) {

      this.asignacionesSource
        .paginator
        .firstPage();
    }
  }

  // ======================================================
  // DISPLAY
  // ======================================================

  mostrarLote(lote: any): string {

    if (!lote) return '';

    if (typeof lote === 'string') {
      return lote;
    }

    return `
      ${lote.tipo}
      | ${lote.nombre ?? ''}
      | Stock: ${lote.stock}
    `;
  }

  mostrarEmergencia(e: any): string {

    if (!e) return '';

    return `
      ${e.id_emergencia}
      - ${e.nombrePersona}
      - ${e.direccion}
    `;
  }

  // ======================================================
  // SELECCION
  // ======================================================
cantidadMateria:any
  onLoteSeleccionado(event: any): void {

    this.loteMaterialSeleccionado =
      event.option.value;
    console.log("sss",this.loteMaterialSeleccionado);
    
    const cantidadControl =
      this.asignacionForm.get(
        'cantidad'
      );
      this.cantidadMateria=this.loteMaterialSeleccionado.stock;
     
  }

  // ======================================================
  // GUARDAR
  // ======================================================

  guardarAsignacion(): void {
    console.log("this.asignacionForm.",this.asignacionForm.value);
    
    if (this.asignacionForm.invalid ) {
      console.error('Formulario inválido');
      return;
    }

    if (!this.loteMaterialSeleccionado) {
      console.error(
        'Seleccione un lote'
      );
      return;
    }

    const form = this.asignacionForm.value;

    // =========================
    // validar stock
    // =========================

    if (
      form.tipoMovimiento ==='SALIDA') {
      if (form.cantidad > this.loteMaterialSeleccionado.stock) {

        alert(
          'No hay stock suficiente'
        );

        return;
      }
    }

    const data = {
      tipoMovimiento:form.tipoMovimiento,
      destino:form.destino,
      id_emergencia:form.id_emergencia?.id_emergencia,
      id_modificacion:Number(localStorage.getItem('usuario')),
      lotes:this.listaMaterialAsignar
      /*lotes: [
        {
          id_loteMaterial:this.loteMaterialSeleccionado.id_loteMaterial,
          cantidad:Number(form.cantidad),
          unidad: form.unidad,
        },
      ],*/
    };

    console.log('enviando',data);

    // =========================
    // SALIDA
    // =========================

    if (form.tipoMovimiento ==='SALIDA') {

      this.http.crearSalidaMaterial(data).subscribe({
          next: (resp: any) => {
            console.log(
              'salida creada',
              resp
            );
            this.limpiarFormulario();
            this.cargarDatos();
          },
          error: (err) => {
            console.error('Error salida',err);
          },
        });
      return;
    }

    // =========================
    // DEVOLUCION
    // =========================

    
  }

  // ======================================================
  // ELIMINAR
  // ======================================================

  eliminarAsignacion(
    asignacion: any
  ): void {

    const ok = confirm(
      '¿Desea eliminar el movimiento?'
    );

    if (!ok) return;

    this.http
      .darBajaMovimientoMaterial(
        asignacion.id_registroMaterial,

        Number(
          localStorage.getItem(
            'usuario'
          )
        )
      )
      .subscribe({

        next: () => {

          this.cargarDatos();
        },

        error: (err) => {

          console.error(
            'Error eliminando',
            err
          );
        },
      });
  }

  // ======================================================
  // UTILIDADES
  // ======================================================

  limpiarFormulario(): void {

    this.asignacionForm.reset({

      tipoMovimiento:
        'SALIDA',

      responsable:
        Number(
          localStorage.getItem(
            'usuario'
          )
        ) || 0,
    });

    this.loteMaterialSeleccionado =
      null;
  }

  toggleFormulario(): void {

    this.mostrarFormulario =
      !this.mostrarFormulario;

    if (
      !this.mostrarFormulario
    ) {

      this.limpiarFormulario();
    }
  }


  //-------------------------------------------------
  //-------------------------------------------
  

}