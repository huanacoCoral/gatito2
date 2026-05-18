import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { logisticaService } from '../../../services/logistica.service';

@Component({
  selector: 'app-devolucion-material',
  imports: [ CommonModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatIconModule,],
  templateUrl: './devolucion-material.html',
  styleUrl: './devolucion-material.css',
})
export class DevolucionMaterial implements OnInit {

  // ======================================================
  // INYECCIONES
  // ======================================================

  private fb = inject(FormBuilder);

  protected http = inject(logisticaService);

  // ======================================================
  // FORM
  // ======================================================

  formDevolucion!: FormGroup;

  // ======================================================
  // LISTAS
  // ======================================================

  lotesMaterial: any[] = [];

  lotesMaterialFiltrados: any[] = [];

  listaMaterialDevolucion: any[] = [];

  // ======================================================
  // ESTADOS
  // ======================================================

  loteMaterialSeleccionado: any = null;

  // ======================================================
  // INIT
  // ======================================================

  ngOnInit(): void {

    this.inicializarFormulario();

    this.cargarLotes();
  }

  // ======================================================
  // FORMULARIO
  // ======================================================

  inicializarFormulario(): void {

    this.formDevolucion =
      this.fb.group({

        loteMaterial: [
          '',
          Validators.required,
        ],

        cantidad: [
          null,
          Validators.required,
        ],

        unidad: [
          '',
        ],

        observacion: [
          '',
          Validators.required,
        ],
      });

    this.formDevolucion
      .get('loteMaterial')
      ?.valueChanges.subscribe((valor) => {

        this.filtrarLotes(valor);

      });
  }

  // ======================================================
  // CARGAR LOTES
  // ======================================================

  cargarLotes(): void {

    this.http
      .listarLoteMaterial()
      .subscribe({

        next: (resp: any) => {

          this.lotesMaterial =
            resp.filter(
              (x: any) =>
                x.estado === 'A'
            );

          this.lotesMaterialFiltrados =
            [...this.lotesMaterial];
        },

        error: (err) => {

          console.error(
            'Error cargando lotes',
            err
          );
        },
      });
  }

  // ======================================================
  // FILTRAR
  // ======================================================

  filtrarLotes(valor: any): void {

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
      | ${lote.nombre}
      | Stock: ${lote.stock}
    `;
  }

  // ======================================================
  // SELECCION
  // ======================================================

  onLoteSeleccionado(event: any): void {

    this.loteMaterialSeleccionado =
      event.option.value;
  }

  // ======================================================
  // AGREGAR MATERIAL
  // ======================================================

  agregarMaterial(): void {

    const lote =
      this.formDevolucion
        .get('loteMaterial')
        ?.value;

    const cantidad =
      this.formDevolucion
        .get('cantidad')
        ?.value;

    const unidad =
      this.formDevolucion
        .get('unidad')
        ?.value;

    if (!lote || !cantidad) {

      alert(
        'Complete los campos'
      );

      return;
    }

    const existe =
      this.listaMaterialDevolucion
        .some(
          (x: any) =>
            x.id_loteMaterial ===
            lote.id_loteMaterial
        );

    if (existe) {

      alert(
        'El material ya fue agregado'
      );

      return;
    }

    this.listaMaterialDevolucion.push({

      id_loteMaterial:
        lote.id_loteMaterial,

      tipo:
        lote.tipo,

      nombre:
        lote.nombre,

      cantidad,

      unidad,
    });

    this.formDevolucion.patchValue({

      loteMaterial: '',
      cantidad: null,
      unidad: '',
    });

    this.loteMaterialSeleccionado =
      null;
  }

  // ======================================================
  // ELIMINAR
  // ======================================================

  eliminarMaterial(material: any): void {

    this.listaMaterialDevolucion =
      this.listaMaterialDevolucion
        .filter(
          (x: any) =>
            x !== material
        );
  }

  // ======================================================
  // GUARDAR
  // ======================================================

  guardarDevolucion(): void {

    if (
      this.listaMaterialDevolucion
        .length === 0
    ) {

      alert(
        'Agregue materiales'
      );

      return;
    }

    const form =
      this.formDevolucion.value;

    const data = {

      observacion:
        form.observacion,

      destino:
        'DEVOLUCION MATERIAL',

      id_modificacion:
        Number(
          localStorage.getItem(
            'usuario'
          )
        ),

      lotes:
        this.listaMaterialDevolucion,
    };

    console.log(
      'enviando',
      data
    );

    this.http
      .crearDevolucionMaterial(data)
      .subscribe({

        next: (resp: any) => {

          console.log(
            'devolucion creada',
            resp
          );

          this.limpiarFormulario();
        },

        error: (err) => {

          console.error(
            'Error devolucion',
            err
          );
        },
      });
  }

  // ======================================================
  // LIMPIAR
  // ======================================================

  limpiarFormulario(): void {

    this.formDevolucion.reset();

    this.listaMaterialDevolucion = [];

    this.loteMaterialSeleccionado =
      null;
  }
}

