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
 
  opcion="";
  nombreStock='';
  stock:any[]=[];
  data:any={};
  listaTurno:any;
  listaRol:any;
   listaGravedad:any;
   listacrearEmergencia:any
  listarCargoArray:any[] = [];
  actaulizarTurno=false;
idTurno:any;
idUsuario=Number(localStorage.getItem('usuario'))
seleccionEditar=false;
  idGravead:any;
   constructor(){
  
  }
  listarTurno(stepper: MatStepper){
    this.opcion='crearTurno';
  this.soloListTurno();
  stepper.next();
  }
  soloListTurno(){
    this.http.listarTurno().subscribe({
    next:(value:any)=>{
      console.log("----|>",value);
      this.listaTurno=value
    },
    error(err) {
      console.error(err);
      
    },
  })
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
    this.soloListaRol();
    stepper.next();
  }
  soloListaRol(){
    this.http.listarRol().subscribe({
    next:(value:any)=>{
      console.log("----|>",value);
      this.listaRol=value
    },
    error(err) {
      console.error(err);
      
    },
  })
  }
  crearRol(){
     const dato={
      "nombre":this.data.Rol,
      "id_modificacion":this.idUsuario
     }
     console.log("1",dato);
     
     this.http.crearRol(dato).subscribe({
    next:(value)=> {
      this.soloListaRol();
      
    },
  })
  }
  editRol=false;
  idRol:any;
  editarRolAdmin(row:any){
    console.log(row,"-----");
    
    this.data.Rol=row.nombre,
    this.editRol=true;
    this.idRol=row.id_rol
  }
  actualizarRol(){
    const dato={
      "idRol":this.idRol,
      "nombre":this.data.Rol,
      "id_modificacion":this.idUsuario,
      "estado":'A'
     }
     this.http.editarRolNuevo(dato).subscribe({
      next:(value)=> {
        this.soloListaRol();
      },
     })
     this.data.Rol=null;
  }
  eliminarRol(row:any){
    const dato={
      "idRol":row.id_rol,
      "nombre":row.nombre,
      "id_modificacion":this.idUsuario,
      "estado":'I'
     }
     this.http.editarRolNuevo(dato).subscribe({
      next:(value)=> {
        this.soloListaRol();
      },
     })
  }
  cancelaRol(){
    this.editRol=false;
    this.idRol=null;
    this.data.Rol=null;
  }
 
  listarGravedad(stepper: MatStepper){
    this.opcion="crearGravedad";
    this.soloList()
    stepper.next();
  }
  soloList(){
    this.http.listarGravedad().subscribe({
      next:(value:any)=>{
        console.log('----',value);
        this.listaGravedad=value
      },
    })
  }
  crearGravedad(){
     const dato={
      "nombre":this.data.Gravedad,
      "id_modificacion":this.idUsuario
     }
     console.log("1",dato);
     
     this.http.crearGravedad(dato).subscribe({
    next:(value)=> {
      console.log("----|>-->",value);
      this.soloList();
      this.cancelarGravedad();
    },
  })
  }
  
  editarGravedadAdmin(row:any){
    this.data.Gravedad=row.nombre;
    this.seleccionEditar=true;
    this.idGravead=row.id_gravedad
  }
  eliminarGravead(row:any){
    
    const dato= {
      id_gravedad:row.id_gravedad,
        nombre:this.data.Gravedad,
        id_modificacion:this.idUsuario,
        estado:'I'
      }
      this.http.editarGravead(dato).subscribe({
    next:(value)=> {
      this.soloList()
     this.cancelarGravedad();
      
    },
  })
     
  }
  actualizarGravedad(){
    
    const dato= {
      id_gravedad:this.idGravead,
        nombre:this.data.Gravedad,
        id_modificacion:this.idUsuario,
        estado:'A'
      }
      
      this.http.editarGravead(dato).subscribe({
    next:(value)=> {
      this.soloList()
     this.cancelarGravedad();
      
    },
  })
       

  }
  cancelarGravedad(){
    this.seleccionEditar=false
    this.data.Gravedad=""
    this.idGravead=null;
  }
  
  listarEmergencia(stepper: MatStepper){
    this.opcion="crearTipoEmergencia";
    this.soloListEmerg();
    stepper.next();
  }
   crearEmergencia(){
    
     const dato={
      "nombre": this.data.nombreEmergencia,
        "codigo": this.data.codigoEmergencia,
        "id_modificacion":this.idUsuario,
      }
     console.log("1",dato);
     
     this.http.crearEmergencia(dato).subscribe({
    next:(value)=> {
      this.soloListEmerg();
    },
    error(err) {
      console.error("error al crear Emergencia");
      
    },
  })
  }
  soloListEmerg(){
    this.http.listarEmergencia().subscribe({
      next:(value:any)=>{
        console.log('---tipo emergencia-',value);
        this.listacrearEmergencia=value
      },
    })
  }
//editarTipoEmergencia
 seleccionEditarEmerge=false;
  idEmerge:any
  editarEmergeAdmin(row:any){
    this.data.nombreEmergencia=row.nombre;
    this.data.codigoEmergencia=row.codigo;

    this.seleccionEditarEmerge=true;
    this.idEmerge=row.id_tipoEmergencia
  }
  eliminarEmerge(row:any){
    
    const dato= {
      id_tipoEmergencia:row.id_tipoEmergencia,
        nombre:this.data.nombreEmergencia,
        codigo:this.data.codigoEmergencia,
        id_modificacion:this.idUsuario,
        estado:'I'
      }
      this.http.eliminarTipoEmergencia(dato).subscribe({
    next:(value)=> {
      this.soloListEmerg()
     this.cancelarEmergencia();
      
    },
  })
     
  }
  actualizarEmergencia(){
    const dato= {
      id_tipoEmergencia:this.idEmerge,
        nombre:this.data.nombreEmergencia,
        codigo:this.data.codigoEmergencia,
        id_modificacion:this.idUsuario,
        estado:'A'
      }
      
      this.http.editarTipoEmergencia(dato).subscribe({
    next:(value)=> {
      this.soloListEmerg()
     this.cancelarEmergencia();
      
    },
  })
       

  }
  cancelarEmergencia(){
    this.seleccionEditarEmerge=false
    this.data.nombreEmergencia=""
    this.data.codigoEmergencia=''
    this.idEmerge=null;
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
      nombre:this.data.nombreCargo,
      id_modificacion:this.idUsuario,
    }
    this.http.crearCargo(query).subscribe({
      next:(value)=>{
        this.listarCargoArray=value;
        this.listandoCargo();
        this.cancelarCargo();
      }
    })
  }
  editarC=false;
  idCargo:any;
  editarCargo(wor:any){
    this.data.nombreCargo=wor.nombre;
    this.idCargo=wor.id_cargo;
    this.editarC=true;
  }
  actualizarCargo(){
    const query={
      id_cargo:this.editarC,
      nombre:this.data.nombreCargo,
      id_modificacion:this.idUsuario,
    }
    this.http.editarCargo(query).subscribe({
      next:(value)=>{
      //  this.listarCargoArray=value;
        this.listandoCargo();
      }
    })
    this.cancelarCargo();
  }
  eliminarCargo(row:any){
    const query={

      id_cargo:row.id_cargo,
      nombre:this.data.nombreCargo,
      id_modificacion:this.idUsuario,
    }
    this.http.eliminarCargo(query).subscribe({
      next:(value)=>{
       // this.listarCargoArray=value;
        this.listandoCargo();
      }
    })
  }
  cancelarCargo(){
    this.editarC=false;
    this.idCargo=null;
    this.data.nombreCargo=null;
  }





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
    const hInicio = this.data.horaInicio ? new Date(this.data.horaInicio).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : '';
const hFin = this.data.horaFin ? new Date(this.data.horaFin).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : '';

    const dato={
      id_turno:this.idTurno,
      nombre:this.data.turno+"/"+hInicio+"/"+hFin,

      estado:'A',

      id_modificacion:Number(localStorage.getItem('usuario'))
    }
    console.log(dato);
    
    this.http.editarTurnoAdmin(dato).subscribe({
      next:(value)=> {
        console.log(value);
        this.soloListTurno();
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
      next:(value)=> {
        console.log(value);
        this.soloListTurno();
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
  actulizar(){

  }
  rolesOcultos = [1, 2, 12, 13, 14, 15];

// Función para validar en el HTML
mostrarAcciones(idRol: any): boolean {
  // Convertimos a número por si acaso llega como string
  return !this.rolesOcultos.includes(Number(idRol));
}
}

