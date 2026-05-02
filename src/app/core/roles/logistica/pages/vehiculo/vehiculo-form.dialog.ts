import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

// Angular Material
import { MatButtonModule }     from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule }  from '@angular/material/form-field';
import { MatIconModule }       from '@angular/material/icon';
import { MatInputModule }      from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { VehiculoService } from './vehiculo.service';

@Component({
  selector: 'app-vehiculo-form-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
  ],
  template: `
    <h2 mat-dialog-title>
      <mat-icon>directions_car</mat-icon>
      Nuevo Vehículo
    </h2>

    <mat-dialog-content>
      <form [formGroup]="form" class="dialog-form">

        <div class="form-row">
          <mat-form-field appearance="outline" class="field-grow">
            <mat-label>Conductor</mat-label>
            <input matInput formControlName="conductor" placeholder="Nombre completo" />
            <mat-icon matSuffix>person</mat-icon>
            @if (form.get('conductor')?.invalid && form.get('conductor')?.touched) {
              <mat-error>El conductor es requerido</mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="outline" class="field-grow">
            <mat-label>Vehículo / Placa</mat-label>
            <input matInput formControlName="vehiculo" placeholder="Ej: Toyota RAV4 · ABC-123" />
            <mat-icon matSuffix>directions_car</mat-icon>
            @if (form.get('vehiculo')?.invalid && form.get('vehiculo')?.touched) {
              <mat-error>El vehículo es requerido</mat-error>
            }
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline" class="field-sm">
            <mat-label>Kilometraje</mat-label>
            <input matInput type="number" formControlName="kilometraje" min="0" />
            <span matSuffix>km</span>
          </mat-form-field>

          <mat-form-field appearance="outline" class="field-sm">
            <mat-label>Fecha</mat-label>
            <input matInput [matDatepicker]="picker" formControlName="fecha" />
            <mat-datepicker-toggle matIconSuffix [for]="picker" />
            <mat-datepicker #picker />
            @if (form.get('fecha')?.invalid && form.get('fecha')?.touched) {
              <mat-error>La fecha es requerida</mat-error>
            }
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline" class="field-grow">
            <mat-label>Descripción</mat-label>
            <input matInput formControlName="descripcion" placeholder="Motivo del registro" />
            <mat-icon matSuffix>description</mat-icon>
          </mat-form-field>

          <mat-form-field appearance="outline" class="field-grow">
            <mat-label>Observaciones</mat-label>
            <input matInput formControlName="observaciones" placeholder="Notas adicionales" />
            <mat-icon matSuffix>notes</mat-icon>
          </mat-form-field>
        </div>

      </form>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-stroked-button (click)="limpiar()">
        <mat-icon>clear_all</mat-icon> Limpiar
      </button>
      <button mat-stroked-button mat-dialog-close>
        <mat-icon>close</mat-icon> Cancelar
      </button>
      <button mat-flat-button color="primary" (click)="guardar()">
        <mat-icon>save</mat-icon> Guardar
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    h2[mat-dialog-title] {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 18px;
      font-weight: 500;
    }

    h2[mat-dialog-title] mat-icon {
      color: #1565c0;
    }

    .dialog-form {
      padding-top: 8px;
      min-width: 560px;
    }

    .form-row {
      display: flex;
      gap: 14px;
      flex-wrap: wrap;
      margin-bottom: 4px;
    }

    .field-grow { flex: 1; min-width: 200px; }
    .field-sm   { flex: 0 0 180px; }

    @media (max-width: 640px) {
      .dialog-form  { min-width: unset; width: 100%; }
      .form-row     { flex-direction: column; }
      .field-sm     { flex: 1; }
    }
  `],
})
export class VehiculoFormDialogComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<VehiculoFormDialogComponent>,
    private vehiculoService: VehiculoService
  ) {
    this.form = this.fb.group({
      conductor:     ['', Validators.required],
      vehiculo:      ['', Validators.required],
      kilometraje:   [0, [Validators.required, Validators.min(0)]],
      fecha:         [new Date(), Validators.required],
      descripcion:   [''],
      observaciones: [''],
    });
  }

  limpiar(): void {
    this.form.reset({ fecha: new Date(), kilometraje: 0 });
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const {conductor, kilometraje} = this.form.value;
    console.log(conductor,kilometraje);
    const nombre = conductor;
    const kilometrajeUtilizado = kilometraje; 
    this.vehiculoService.createVehiculo({nombre,kilometrajeUtilizado}).subscribe()
    // Cierra el dialog y devuelve los datos al componente padre
    this.dialogRef.close(this.form.value);
  }
}