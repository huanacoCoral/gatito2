import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PersonalService } from '../../personal.service';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-horarios',
  imports: [MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
  FormsModule,
JsonPipe],
  templateUrl: './horarios.html',
  styleUrl: './horarios.css',
  providers: [provideNativeDateAdapter()]
})
export class Horarios implements OnInit {
  readonly http = inject(PersonalService)
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
  generarCalendario(){
    /*const fechas={
      "fechaInicio":this.fechaInicio,
      "fechaFin":this.fechaFin
    }
    this.http.listarTrayectoroariTurno(fechas).subscribe({
      next: (res: any) => {
        console.log('respuesta de turno--', res);
        //this.turno = res;
        

      }
    })*/
    const fechas = {
    fechaInicio: '2026-03-01',
    fechaFin: '2026-03-27'
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
    
    
     /*const data = {
      "id_turno": this.turnoSeleccionado,
      "id_voluntario": this.idVoluntario,
      "fechaInicio": new Date(this.fechaInicio),
      "fechaFin": new Date(this.fechaFin),
      "dia": this.dia
    }
    console.log("***",data);
    
    this.http.editarTurno(data).subscribe({
      next:(res:any)=>{
        console.log('modificacion turno',res);
        
      },error(err) {
        console.error("respeusta por error de asignacio nde turnos", err);
        
      },
    })*/
  }
  cancelar(){
    this.botonesEditar=false
  }


}
