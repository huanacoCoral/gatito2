import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importante para pipes de fecha
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { jefeGuardiaService } from '../server/jefeGuadia.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-horarios',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule, 
    MatCardModule, 
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule
  ],
  templateUrl: './horarios.html',
  styleUrl: './horarios.css',
})
export class Horarios implements OnInit {
  private readonly http = inject(jefeGuardiaService);
diasSemana: string[] = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  // Fuente de datos para la tabla
  dataSource = new MatTableDataSource<any>([]);
  
  // Columnas que definimos en el HTML
  displayedColumns: string[] = ['voluntario','dia', 'turno', 'vigencia', 'disponibilidad'];
   hoy = new Date();
 anio = this.hoy.getFullYear();
 mes = this.hoy.getMonth();
// El día 1 del mes actual
semanaInicio = new Date(this.anio, this.mes, 1);

// El día 0 del mes siguiente es el último día del mes actual
semanaFin = new Date(this.anio, this.mes + 1, 0);
  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    const dato={
      inicio: this.semanaInicio.toISOString(),
    fin: this.semanaFin.toISOString()
    }
    this.http.listarTurnoTrayecto(dato).subscribe({
      next: (value: any) => {
        console.log("Datos recibidos:", value);
        // Asignamos la respuesta (el array de objetos) al dataSource
        this.dataSource.data = value;
      },
      error: (err) => console.error("Error al cargar horarios", err)
    });
  }

  // Lógica para determinar si el voluntario está en su rango de fechas
  esVigente(fechaFin: string): boolean {
    if (!fechaFin) return false;
    const hoy = new Date();
    const fin = new Date(fechaFin);
    
    // Seteamos las horas a 0 para comparar solo fechas si es necesario
  //  hoy.setHours(0, 0, 0, 0);
    return fin >= hoy;
  }
}