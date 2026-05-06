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


}

