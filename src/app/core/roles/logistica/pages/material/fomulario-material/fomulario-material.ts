import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-fomulario-material',
  imports: [ReactiveFormsModule,
    MatCardModule,

    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './fomulario-material.html',
  styleUrl: './fomulario-material.css',
})
export class FomularioMaterial {
materialForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.materialForm = this.fb.group({
      tipo: ['', Validators.required],
      estado: ['Nuevo'],
      marca: [''],
      modelo: [''],
      numSerie: [''],
      fechaAdquisicion: [new Date()],
      capacidad: [''],
      caracteristicas: [''],
      intervaloTiempoRevision: [0],
      responsableEquipo: ['', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      unidadMedida: [''],
      fechaLimiteUso: ['']
    });
  }
onSubmit() {
    if (this.materialForm.valid) {
      console.log('Datos del formulario:', this.materialForm.value);
      // Aquí iría tu servicio para guardar en la base de datos
    }
  }
}
