import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-formulario-asignar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
  ],
  templateUrl: './formulario-asignar.html',
  styleUrl: './formulario-asignar.css'
})
export class FormularioAsignarComponent implements OnInit {
  // ========== INPUTS ==========
  @Input() lotesMaterial: any[] = [];
  @Input() emergencias: any[] = [];
  @Input() voluntarios: any[] = [];
  @Input() cargando = false;

  // ========== OUTPUTS ==========
  @Output() cancelar = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<FormGroup>();

  // ========== INYECCIONES ==========
  private fb = inject(FormBuilder);

  // ========== FORMULARIO ==========
  asignacionForm!: FormGroup;

  // ========== ESTADO ==========
  lotesMaterialFiltrados: any[] = [];
  loteMaterialSeleccionado: any = null;

  ngOnInit() {
    this.inicializarFormulario();
  }

  inicializarFormulario() {
    this.asignacionForm = this.fb.group({
      loteMaterial: ['', Validators.required],
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

    this.asignacionForm.get('loteMaterial')?.valueChanges.subscribe(valor => {
      this.filtrarLotesMaterial(valor);
    });

    this.lotesMaterialFiltrados = [...this.lotesMaterial];
  }

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

  mostrarTipoStock(lote: any): string {
    if (!lote) return '';
    if (typeof lote === 'string') return lote;
    return `${lote.tipo} (Stock: ${lote.stock})`;
  }

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

  onCancelar() {
    this.cancelar.emit();
  }

  onGuardar() {
    if (this.asignacionForm.invalid) {
      return;
    }
    this.guardar.emit(this.asignacionForm);
  }
}
