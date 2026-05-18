import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material
import { MatButtonModule }           from '@angular/material/button';
import { MatCardModule }             from '@angular/material/card';
import { MatChipsModule }            from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule }          from '@angular/material/divider';
import { MatIconModule }             from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule }            from '@angular/material/table';
import { MatTooltipModule }          from '@angular/material/tooltip';

// Dialog del formulario (archivo separado en la misma carpeta)
//import { VehiculoFormDialogComponent } from './vehiculo-form.dialog';
import { HttpClient } from '@angular/common/http';
import { logisticaService } from '../../services/logistica.service';
import { VehiculoFormDialogComponent } from './vehiculo-form-dialog-component/vehiculo-form-dialog-component';
import { VehiculoUtilizado } from './vehiculo-utilizado/vehiculo-utilizado';
import { MantenimientoVehiculo } from './mantenimiento-vehiculo/mantenimiento-vehiculo';
import { ListaMantenimiento } from './lista-mantenimiento/lista-mantenimiento';

export type EstadoVehiculo = 'operativo' | 'mantenimiento' | 'emergencia';

export interface Vehiculo {
  id: number;
  conductor: string;
  vehiculo: string;
  kilometraje: number;
  fecha: Date;
  descripcion: string;
  observaciones: string;
  estado: EstadoVehiculo;
}

@Component({
  selector: 'app-vehiculo',
  standalone: true,
  templateUrl: './vehiculo.html',
  styleUrls: ['./vehiculo.css'],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatSnackBarModule,
    MatTableModule,
    MatTooltipModule,
  ],
})
export class VehiculoComponent implements OnInit{
 // private _http = inject(HttpClient);
  readonly http=inject(logisticaService)
  
  vehiculos: Vehiculo[] = [];
  private nextId = 1;

  
  columnas: string[] = [
    'id', 'nombre', 'marca', 'kilometraje',
    'numeroPlaca', 'tipo', 'observaciones', 'estado', 'acciones',
  ];
  @Input() tipo: string = 'Logistica';

  constructor(private dialog: MatDialog, private snack: MatSnackBar) {}

  ngOnInit(){
    this.listar();
  }
  // ── Abrir modal ─────────────────────────────
  abrirFormulario(): void {
    const dialogRef = this.dialog.open(VehiculoFormDialogComponent, {
      width: '680px',
      maxWidth: '95vw',
      disableClose: false,   // permite cerrar con Escape o click fuera
    });

    // Cuando el dialog cierra con datos → registrar
    dialogRef.afterClosed().subscribe((datos) => {
      this.listar();
      if (datos) {
        /*this.vehiculos = [
          ...this.vehiculos,
          {
            id:            this.nextId++,
            conductor:     datos.conductor,
            vehiculo:      datos.vehiculo,
            kilometraje:   datos.kilometraje ?? 0,
            fecha:         datos.fecha,
            descripcion:   datos.descripcion ?? '',
            observaciones: datos.observaciones ?? '',
            estado:        'operativo',
          },
        ];
        this.notify(`Vehículo "${datos.vehiculo}" registrado.`, 'ok');*/
        
        

      }
    });
  }
  editar(datos:any){
    console.log("datosss",datos);
    
    const dialogRef = this.dialog.open(VehiculoFormDialogComponent, {
      width: '680px',
      maxWidth: '95vw',
      disableClose: false,   // permite cerrar con Escape o click fuera
       data: datos
    });

    dialogRef.afterClosed().subscribe((datos) => {
      this.listar();
      
    });
  }

  // ── Eliminar ────────────────────────────────
  eliminar(data: any): void {
    console.log("data-----",data);
    
    //const v = this.vehiculos.find(x => x.id === id);
   // this.vehiculos = this.vehiculos.filter(x => x.id !== id);
    //if (v) this.notify(`Registro de ${v.vehiculo} eliminado.`, 'info');
    this.http.eliminarInformeVehiculos(data.id_ingresoInformeVehiculo,{estado:'B',id_modificacion:Number(localStorage.getItem('usuario'))}).subscribe({
      next:(value)=> {
        console.log(value,"value--");
        this.listar();
      },
    })
  }

  // ── Toggle mantenimiento ────────────────────
  mantenimiento(v: Vehiculo): void {
    console.log("------",v);
    
    const dialogRef = this.dialog.open(MantenimientoVehiculo, {
      width: '680px',
      maxWidth: '95vw',
      disableClose: false,   // permite cerrar con Escape o click fuera
       data: v
    });

    dialogRef.afterClosed().subscribe((datos) => {
      this.listar();
      
    });
    /*if (v.estado === 'emergencia') {
      this.notify('Desactiva la emergencia antes de cambiar a mantenimiento.', 'warn');
      return;
    }
    const nuevo: EstadoVehiculo =
      v.estado === 'mantenimiento' ? 'operativo' : 'mantenimiento';
    this.actualizarEstado(v.id, nuevo);
    this.notify(
      nuevo === 'mantenimiento'
        ? `${v.vehiculo} → En mantenimiento.`
        : `${v.vehiculo} → Operativo.`,
      nuevo === 'mantenimiento' ? 'warn' : 'ok',
    );*/
  }

  // ── Toggle emergencia ───────────────────────
  toggleEmergencia(v: Vehiculo): void {
    if (v.estado === 'mantenimiento') {
      this.notify('No se puede activar emergencia: vehículo en mantenimiento.', 'error');
      return;
    }
    const nuevo: EstadoVehiculo =
      v.estado === 'emergencia' ? 'operativo' : 'emergencia';
    this.actualizarEstado(v.id, nuevo);
    this.notify(
      nuevo === 'emergencia'
        ? `🚨 ¡EMERGENCIA activada en ${v.vehiculo}!`
        : `${v.vehiculo} → Emergencia desactivada.`,
      nuevo === 'emergencia' ? 'error' : 'ok',
    );
  }

  // ── Helpers ─────────────────────────────────

  private actualizarEstado(id: number, estado: EstadoVehiculo): void {
    this.vehiculos = this.vehiculos.map(v =>
      v.id === id ? { ...v, estado } : v,
    );
  }

  private notify(msg: string, tipo: 'ok' | 'warn' | 'error' | 'info'): void {
    const panel: Record<string, string> = {
      ok: 'snack-ok', warn: 'snack-warn',
      error: 'snack-error', info: 'snack-info',
    };
    this.snack.open(msg, '✕', {
      duration: 3500,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: [panel[tipo]],
    });
  }
  /////////////////--------------------mio ts componete ----------
  listar(){
    this.http.listarInformeVehiculos().subscribe({
      next:(value)=> {
        console.log("value---vehiculos listado ",value);
        this.vehiculos=value
      },
    })
  }
  vehiculoUtilizado(row:any){
    console.log("datosss",row);
    
    const dialogRef = this.dialog.open(VehiculoUtilizado, {
      width: 'auto',
      maxWidth: '95vw',
      disableClose: false,   // permite cerrar con Escape o click fuera
       data: row
    });

    dialogRef.afterClosed().subscribe((datos) => {
      this.listar();
      
    });
  }
  listarMatenimiento(row:any){
    const dialogRef = this.dialog.open(ListaMantenimiento, {
      width: '680px',
      maxWidth: '95vw',
      disableClose: false,   // permite cerrar con Escape o click fuera
       data: row
    });

    dialogRef.afterClosed().subscribe((datos) => {
      this.listar();
      
    });
  }
  
}