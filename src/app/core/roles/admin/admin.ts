import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { adminService } from './adminService';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatTimepickerModule } from '@angular/material/timepicker';

@Component({
  selector: 'app-admin',
  providers: [provideNativeDateAdapter()], 
  imports: [MatCardModule,MatDialogContent,

    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,

    MatTimepickerModule, 
  ],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  private _formBuilder = inject(FormBuilder);
  private http = inject(adminService);
  /*dataHora = {
    horaInicio: new Date(),
    horaFin: new Date()
  };*/


 /* firstFormGroup = this._formBuilder.group({
    //firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
   // secondCtrl: ['', Validators.required],
  });*/
  opcion="";
  nombreStock='';
  stock:any[]=[];
  data:any={};
  listaTurno:any;
  listaRol:any;
   listaGravedad:any;
   listacrearEmergencia:any
  listarCargoArray:any;
   constructor(){
   /* this.http.listarLote().subscribe({
      next:(value)=> {
        console.log("----0",value);
        
        this.stock=value
      },
    })*/
  }
  listarTurno(stepper: MatStepper){
    this.opcion='crearTurno';
 /* this.opcion="crearTurno"
    const datos={
    "stock": 0,
    "tipo": this.nombreStock,
    "id_vehiculo": 0,
  }*/
  this.http.listarTurno().subscribe({
    next:(value:any)=>{
      console.log("----|>",value);
      this.listaTurno=value
    },
    error(err) {
      console.error(err);
      
    },
  })
  stepper.next();
  }
  crearTurno(){
    const hInicio = this.data.horaInicio ? new Date(this.data.horaInicio).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : '';
const hFin = this.data.horaFin ? new Date(this.data.horaFin).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : '';

     const dato={
      "nombre":this.data.turno+"/"+hInicio+"/"+hFin,
      "id_modificacion":Number(localStorage.getItem('usuario'))
     }
     console.log("1",dato);
     
     this.http.crearTurno(dato).subscribe({
    next:(value)=> {
      console.log("----|>-->",value);
      
      this.http.listarTurno().subscribe({
    next:(value:any)=>{
      console.log("----|>",value);
      this.listaTurno=value
    }})

    },
  })
  }

  listarRol(stepper: MatStepper){
    this.opcion='crearRol';
  this.http.listarRol().subscribe({
    next:(value:any)=>{
      console.log("----|>",value);
      this.listaRol=value
    },
    error(err) {
      console.error(err);
      
    },
  })
    stepper.next();
  }
  crearRol(){
     const dato={
      "nombre":this.data.Rol
     }
     console.log("1",dato);
     
     this.http.crearRol(dato).subscribe({
    next(value) {
      console.log("----|>-->",value);
      
    },
  })
  }

 
  listarGravedad(stepper: MatStepper){
    this.opcion="crearGravedad";
    this.http.listarGravedad().subscribe({
      next:(value:any)=>{
        console.log('----',value);
        this.listaGravedad=value
      },
    })
    stepper.next();
  }
  crearGravedad(){
     const dato={
      "nombre":this.data.Gravedad
     }
     console.log("1",dato);
     
     this.http.crearGravedad(dato).subscribe({
    next(value) {
      console.log("----|>-->",value);
      
    },
  })
  }

  
  listarEmergencia(stepper: MatStepper){
    this.opcion="crearTipoEmergencia";
    this.http.listarEmergencia().subscribe({
      next:(value:any)=>{
        console.log('---tipo emergencia-',value);
        this.listacrearEmergencia=value
      },
    })
    stepper.next();
  }
   crearEmergencia(){
    
     const dato={
      "nombre": this.data.nombreEmergencia,
        "codigo": this.data.codigoEmergencia
      }
     console.log("1",dato);
     
     this.http.crearEmergencia(dato).subscribe({
    next:(value)=> {
      this.http.listarEmergencia().subscribe({
      next:(value:any)=>{
        this.listacrearEmergencia=value
      },
    })
    },
    error(err) {
      console.error("error al crear Emergencia");
      
    },
  })
  }



  
  listarCargo(stepper: MatStepper){
    stepper.next();
    this.opcion="crearCargo"
    this.listandoCargo();
  }
  listandoCargo(){
     
    this.http.listarCargo().subscribe({
      next:(value)=>{
        this.listarCargoArray=value
      }
    })
  }
  crearCargo(){
    const query={
      nombre:this.data.nombreCargo
    }
    this.http.crearCargo(query).subscribe({
      next:(value)=>{
        this.listarCargoArray=value;
        this.listandoCargo();
      }
    })
  }

actaulizarTurno=false;
idTurno:any;
  editarTurnoAdmin(row:any){
    this.actaulizarTurno=true
    const partes = row.nombre.split('/'); // Resultado: ['x', '00:00', '00:30']

// 2. Extraemos las horas y minutos de cada segmento
const [horaInicio, minInicio] = partes[1].split(':').map(Number); // [0, 0]
const [horaFin, minFin] = partes[2].split(':').map(Number);       // [0, 30]

// 3. Creamos instancias de fechas del día de hoy y les asignamos el tiempo correspondiente
const fechaInicio = new Date();
fechaInicio.setHours(horaInicio, minInicio, 0, 0);

const fechaFin = new Date();
fechaFin.setHours(horaFin, minFin, 0, 0);

    console.log(row,"1111");
    this.data.turno=row.nombre.split('/')[0];
    this.data.horaInicio=fechaInicio;
    this.data.horaFin=fechaFin;
    this.idTurno=row.id_turno
  }
  cancelarTurno(){
    this.actaulizarTurno=false;
    this.data.turno=null
    this.data.horaInicio=null
    this.data.horaFin=null
    this.idTurno=null

  }
  actualizarTurno(){
    const dato={
      id_turno:this.idTurno,
      nombre:this.data.turno,

      estado:'A',

      id_modificacion:Number(localStorage.getItem('usuario'))
    }
    console.log(dato);
    
    this.http.editarTurnoAdmin(dato).subscribe({
      next(value) {
        console.log(value);
        
      },
    })
  }
  eliminar(row:any){
    const dato={
      id_turno:row.id_turno,
      nombre:this.data.nombre,

      estado:'I',

      id_modificacion:Number(localStorage.getItem('usuario'))
    }
    this.http.editarTurnoAdmin(dato).subscribe({
      next(value) {
        console.log(value);
        
      },
    })
  }
  /*editarRol(){

  const datos = {

    id_rol:this.form.value.id_rol,

    nombre:this.form.value.nombre,

    estado:this.form.value.estado,

    id_modificacion:Number(
      localStorage.getItem('usuario')
    ),
  };

  console.log(datos);

  this.http.editarRol(datos)
  .subscribe({

    next:(resp:any)=>{

      console.log(resp);

      alert('Rol actualizado');
    },

    error:(err)=>{

      console.log(err);
    }
  });
}*/
}

