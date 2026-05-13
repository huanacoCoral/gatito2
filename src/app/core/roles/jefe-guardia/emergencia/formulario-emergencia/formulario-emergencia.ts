import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { jefeGuardiaService } from '../../server/jefeGuadia.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JsonPipe } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
@Component({
  selector: 'app-formulario-emergencia',
  imports: [ ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule, 
    MatButtonModule,
    MatAutocompleteModule,
  MatIconModule,
    JsonPipe,

    MatCheckboxModule
],
  templateUrl: './formulario-emergencia.html',
  styleUrl: './formulario-emergencia.css',
})
export class FormularioEmergencia implements OnInit{
  public readonly data = inject(MAT_DIALOG_DATA);
  private http=inject(jefeGuardiaService)
  form!: FormGroup;
  listarTipoEmergenciaGravedadOriginal:any
  listarGravedadOriginal:any
  
  // Lista de ejemplo para tus selectores (asumiendo una interfaz con id y nombre)
  litarMaquinista : any;
  listarVoluntariosDisponibles:any;
  filtrarVoluntariosDisponibles:any;
 ahora = new Date();
 horaActual = `${this.ahora.getHours()}:${this.ahora.getMinutes()}`;
 esActualizar=false;
 listarVehiculos:any
  constructor(private fb: FormBuilder) {
    this.initForm();
   }

  ngOnInit(): void {
    console.log("----",this.form.value);
    
    this.listarGravedad();
    this.listarTipoEmergencia();
    this.listarPersonalDisponible();
    this.listarVehiculo();
    this.listarMaquinista();
    console.log("----:",this.data);
    if (this.data) {
      this.esActualizar=true;
      if(this.data.vehiculos.length===0){
        console.log("no lelgo vehiculo");
        this.form.patchValue({ opcioneleccionarVehiculo: false });
        
      }else{
        console.log('si funciona ');
        
        this.form.patchValue({ opcioneleccionarVehiculo: true });
        console.log(this.form.value);
        
        this.poblarVehiculoMaquinista();
      }
      this.repoblarVoluntario(this.data.recepciones);
      /*this.form = this.fb.group({
        nombrePersona: [this.data.nombrePersona || ''],
        direccion: [this.data.direccion || ''],
        cel_ref: [this.data.cel_ref || ''],
        fecha: [this.formatearFecha(this.data.fecha ||'')], // Si no hay fecha, pone la de hoy
        horaActual: [this.data.hora || ''],
        tipoRecepcion: [this.data.tipoRecepcion || ''],
        id_gravedad: [this.data.id_gravedad || null],

        nivelEmergencia: [this.data.tiposEmergencia[0].id_tipoEmergencia || ''], // Se agregó el origen de data
        voluntario: [''], 
       // maquinistasAsignados: [this.data.maquinistasAsignados || []] // Se inicializa como array si son varios
      
      });*/
      this.form.patchValue({
      nombrePersona: this.data.nombrePersona || '',
      direccion: this.data.direccion || '',
      cel_ref: this.data.cel_ref || '',
      fecha: this.formatearFecha(this.data.fecha || ''),
      horaActual: this.data.hora || '',
      tipoRecepcion: this.data.tipoRecepcion || '',
      id_gravedad: this.data.id_gravedad || null,
      nivelEmergencia: this.data.tiposEmergencia?.[0]?.id_tipoEmergencia || '',
    });
      // 2. Lógica del Vehículo
    if (this.data.vehiculos && this.data.vehiculos.length === 0) {
      this.form.patchValue({ opcioneleccionarVehiculo: false });
    } else {
      this.form.patchValue({ opcioneleccionarVehiculo: true });
      this.poblarVehiculoMaquinista();
    }
      

    }
  
 
     
  }

  initForm(): void {
    this.form = this.fb.group({
      nombrePersona: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      cel_ref: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      fecha: [new Date().toISOString().substring(0, 10), [Validators.required]], // Fecha por defecto hoy
      horaActual:[`${this.ahora.getHours()}:${this.ahora.getMinutes()}`],
      tipoRecepcion: ['', [Validators.required]],
      id_gravedad: [null, [Validators.required]],
      nivelEmergencia: [null, [Validators.required]],
      voluntario: [null], // Ajusté el nombre para que no se repita
      maquinistasAsignados: [null], // Ajusté el nombre para que no se repita
      vehiculoAsignado:[null],
      opcioneleccionarVehiculo:[false],
    });
  }

  guardarEmergencia(): void {
    //console.log("this.form.value.maquinistasAsignados---",this.form.value.maquinistasAsignados);
    //console.log("this.form.value.maquinistasAsignados---",this.form.get('maquinistasAsignados')?.value);
     
    if (this.form.valid) {
      console.log('Datos del formulario:', this.form.value);
      let valor=this.form.value
    
       const valores={
          fecha:valor.fecha,
  hora:valor.horaActual,
  direccion:valor.direccion,
  cel_ref:valor.cel_ref,
  nombrePersona:valor.nombrePersona,
  tipoRecepcion:valor.tipoRecepcion,

  // Relaciones obligatorias
  id_gravedad:valor.id_gravedad,
  id_voluntario:Number(localStorage.getItem('usuario')),

  // Campos de auditoría (los que preguntaste)

 // estado:valor.;             //por defecto A
 // id_modificacion:valor.;  
        }
        //console.log("-------valores",valores);
        if(!this.esActualizar){
      this.http.guardarEmergencia(valores).subscribe({
        next:(value)=> {
          //console.log(value,"-----aaa");
          let idEmergencia=value.id_emergencia;
          // luego guardamos tipo de emergergencia para relacionarlos con tipo de emergencia
          const relacionTipoEmergencia={
            id_emergencia: idEmergencia,
            id_tipo_emergencia: valor.nivelEmergencia

          };
          this.http.emergenciaTieneTipoEmergencia(relacionTipoEmergencia).subscribe({
            next:(value)=> {
              console.log("----emergia tipo relacion ",value);
              
            },
            error(err) {
              console.error("error",err);
              
            },
          })
          
          
          for (let i = 0; i < this.voluntariosSeleccionados.length; i++) {
            const element = this.voluntariosSeleccionados[i];
             const datoRelacionTipoEmergencia={
        id_voluntario:this.voluntariosSeleccionados[i].id_voluntario,
        id_emergencia:idEmergencia

      }
      this.http.voluntarioRecepcionEmergencia(datoRelacionTipoEmergencia).subscribe({
        next:(value)=> {
          console.log("logramos enviar al l voluntario ",value);
          
        },
        error(err) {
          console.error("error",err);
          
        },
      })
          }
          ///

          

           // si utilizo vehulo debemos  relacionar  
           console.log(this.agregarVehiculos,"-----");
           
           for (let k = 0; k < this.agregarVehiculos.length; k++) {
            const element = this.agregarVehiculos[k];
            //AGREGAMOS VEHICULO UTILIZADO
          const valorParVhl={
            id_vehiculo:this.agregarVehiculos[k].id_vehiculo,
            id_emergencia:idEmergencia,
            id_voluntario:this.agregarVehiculos[k].id_voluntario,
          }

          this.http.crearParticipioVehiculo(valorParVhl).subscribe({
            next(value) {
              console.log(value,"---");
              
            },
            error(err) {
              console.error();
              
            },
          })

            /* if(this.form.value.opcioneleccionarVehiculo){
            console.log("---tenemos vehiculo asignado ");
            const data = {

                id_voluntario: this.agregarVehiculos[k].id_voluntario,

                id_vehiculo: this.agregarVehiculos[k].id_vehiculo

              };

              this.http.crearCondujoVhiculo(data)
              .subscribe({

                next: (resp: any) => {

                  console.log('guardado', resp);

                },

                error: (err) => {

                  console.log('error', err);

                }

              });

              


           }*/
           }
          

        },
        error(err) {
          console.error("error",err);
          
        },
      })
    }else{
      console.log('Datos del formulario:this.voluntariosSeleccionados---', this.voluntariosSeleccionados);
      let valorForm=this.form.value
    
       
      const valor={
  "emergencia": {

    "fecha":new Date( valorForm.fecha),

    "hora": valorForm.horaActual,

    "direccion": valorForm.direccion,

    "cel_ref": valorForm.cel_ref,

    "nombrePersona": valorForm.nombrePersona,

    "tipoRecepcion": valorForm.tipoRecepcion,

    "id_gravedad": valorForm.id_gravedad,

    "id_modificacion": Number(localStorage.getItem('usuario')),

  },

  "tiposEmergencia": [

    {
      "id_tipoEmergencia": valorForm.nivelEmergencia
    }

  ],

  /*"voluntariosRecepcion": [

    {
      "id_voluntario": 1
    },

    {
      "id_voluntario": 2
    }

  ],*/
  "voluntariosRecepcion": this.voluntariosSeleccionados,


 /* "vehiculos": [

    {

      "id_vehiculo": 1,

      "id_voluntario": 2

    }

  ]*/
 "vehiculos":this.agregarVehiculos

}
console.log("mandamos valores raros ",valor);

this.http.editarEmergencia(this.data.id_emergencia,valor).subscribe({
  next(value) {
    console.log(value);
    
  },
  error(err) {
    console.error("Error en editar",err);
    
  },
})
    }

     /* */

      // luego toca guardar relacion con voluntario implicados
    
      

//maquinistasAsignados: 3
//nivelEmergencia: 2

    } else {
      this.form.markAllAsTouched();
    }
  }
  listarGravedad(){
    this.http.listarGravedad().subscribe({
      next:(value)=> {
        console.log(value,"gravedad");
        this.listarGravedadOriginal=value;
       
      },
      error(err) {
        console.error("erroR en gravedad");
        
      },
    })
  }
  listarTipoEmergencia(){
     this.http.listarTipoEmergencia().subscribe({
      next:(value)=> {
        console.log(value,"TipoEmergencia");
        this.listarTipoEmergenciaGravedadOriginal=value;
      },
      error(err) {
        console.error("erro en TipoEmergencia");
        
      },
    })
  }
  listarPersonalDisponible(){
     const ahora = new Date(); // Captura el instante actual
    
    const fecha = ahora.toLocaleDateString(); // Ejemplo: "3/5/2026"
    const dia = ahora.getDay();               // Número del día (0 para domingo, 1 lunes, etc.)
    const hora = ahora.getHours() + ":" + ahora.getMinutes(); // Ejemplo: "17:15"

    const datos={
      fecha:fecha,
      dia:dia,
      hora:hora
    }
    console.log(datos,"@----");
    
    // Si tu servicio necesita estos parámetros, los pasas así:
    this.http.listarVoluntariodisponible(datos).subscribe(data => {
      console.log("voluntarios disponibles",data);
      this.listarVoluntariosDisponibles=data;
      this.filtrarVoluntariosDisponibles=data;
    });

  }
  filtrando(event: any) {
  const valor = event.target.value.toLowerCase();

  this.filtrarVoluntariosDisponibles = this.listarVoluntariosDisponibles.filter((v:any) => 
    v.ci.toLowerCase().includes(valor) || 
    v.nombre.toLowerCase().includes(valor) ||
    v.apellido_paterno.toLowerCase().includes(valor)
  );
}
  voluntariosSeleccionados: any[] = []; 
  seleccionado(event: any) {

  const voluntario = event.option.value;

  if (voluntario) {
 
    const yaExiste = this.voluntariosSeleccionados.some(v => v.id_voluntario === voluntario.id_voluntario);

    if (!yaExiste) {
      this.voluntariosSeleccionados.push(voluntario);
     
    }

    
    setTimeout(() => {
      this.form.get('voluntario')?.setValue('');
    });
  }
}
quitar(row:any){
  console.log(row);
    this.voluntariosSeleccionados = this.voluntariosSeleccionados.filter(
    v => v.id_voluntario !== row.id_voluntario
  );
  
  console.log('Lista actualizada:', this.voluntariosSeleccionados);
}

mostrarNombre(voluntario: any): string {
  // Si existe el objeto voluntario, retorna el nombre completo, si no, string vacío
  return voluntario ? `${voluntario.nombre} ${voluntario.apellido_paterno}` : '';
}
limpiarSiNoEsValido() {
    const control = this.form.get('voluntario');
  const valorActual = control?.value;

  // 1. Si está vacío, no hacemos nada
  if (!valorActual) return;

  const existe = this.listarVoluntariosDisponibles.some(
    (v:any) => v.id_voluntario === valorActual.id_voluntario
  );

  if (!existe) {
    control?.setValue('');
  }
}
listarVehiculo(){
 this.http.listarVehiculos().subscribe({
  next:(value)=> {
    console.log("-----VEHI",value);
    this.listarVehiculos=value;
  },
  error(err) {
    console.error("error en maquinista listado ",err);
    
  },
}) 
}
listarMaquinista(){
this.http.listarMaquinista().subscribe({
  next:(value)=> {
    console.log(value);
    this.litarMaquinista=value;
  },
  error(err) {
    console.error("error en maquinista listado ",err);
    
  },
})
}
formatearFecha(fechaIso: string | Date): string {
  const fecha = new Date(fechaIso);
  // toISOString() devuelve "2026-05-09T23:58:36.257Z"
  // split('T')[0] toma solo la parte antes de la T: "2026-05-09"
  return fecha.toISOString().split('T')[0];
}
repoblarVoluntario(datos:any){
  
   const obtenerPersonal=datos.map((x:any)=>x.voluntario);
   this.voluntariosSeleccionados=obtenerPersonal;
   
}
maquinistaSeleccionado=false;
seleccionarVehiculoTrue(){
  //console.log("--- opcionselect");
  
   this.form.get('opcioneleccionarVehiculo')?.valueChanges.subscribe((estaMarcado: boolean) => {
   /* const vAsignado = this.form.get('vehiculoAsignado');
    const mAsignados = this.form.get('maquinistasAsignados');

    if (estaMarcado) {
      vAsignado?.setValidators([Validators.required]);
      mAsignados?.setValidators([Validators.required]);
    } else {

      vAsignado?.clearValidators();
      mAsignados?.clearValidators();
      
    }

    vAsignado?.updateValueAndValidity();
    mAsignados?.updateValueAndValidity();*/
   // console.log("---",estaMarcado,"--",this.agregarVehiculos.length);
    
    if(estaMarcado && this.agregarVehiculos.length===0){
      this.maquinistaSeleccionado=false;

    }else{
      
      
    }
    if (!estaMarcado&& this.agregarVehiculos.length >0) {
        this.agregarVehiculos = [];
        this.maquinistaSeleccionado=false;
      }
      if (estaMarcado&& this.agregarVehiculos.length >0) {
       
        this.maquinistaSeleccionado=true;

      }
  });
}
agregarVehiculos: any[] = [];
agregarVehiculo(){
  //console.log('this.form.value.vehiculoAsignado.id_vehiculo----',this.form.value.vehiculoAsignado.id_vehiculo);
  //console.log('this.form.value.maquinistasAsignados.id_voluntario--',this.form.value.maquinistasAsignados.id_voluntario);
  
   const vehiculo = this.form.value.vehiculoAsignado;
  const maquinista = this.form.value.maquinistasAsignados;

  //console.log('vehiculo', vehiculo);
 // console.log('maquinista', maquinista);

  // validar duplicados
  
   const yaExiste = this.agregarVehiculos.some(
    (v: any) =>{
  let coincidencia = v.id_vehiculo === vehiculo.id_vehiculo ||  v.id_voluntario === maquinista.id_voluntario;



  return coincidencia;
}
  
  );
 

  if (yaExiste) {

    console.log('Ese vehículo ya fue agregado');
    return;

  }

  // agregar
  this.agregarVehiculos.push({

    id_vehiculo: vehiculo.id_vehiculo,
    nombreVehiculo: vehiculo.ingreso.nombre,

    id_voluntario: maquinista.id_voluntario,
    nombreMaquinista:
      maquinista.voluntario.nombre + ' ' +
      maquinista.voluntario.apellido_paterno

  });

  //console.log('LISTA FINAL', this.agregarVehiculos);

  // limpiar selects
  this.form.patchValue({
    vehiculoAsignado: null,
    maquinistasAsignados: null
  });
}
poblarVehiculoMaquinista() {

  console.log("poblando");

  const vehiculos = this.data.vehiculos.map((valor: any) => {

    return {

      id_vehiculo:
        valor.vehiculo.id_vehiculo,

      nombreVehiculo:
        valor.vehiculo.ingreso.nombre,

      id_voluntario:
        valor.maquinista.id_voluntario,

      nombreMaquinista:

        valor.maquinista.voluntario.nombre + ' ' +

        valor.maquinista.voluntario.apellido_paterno + ' ' +

        (valor.maquinista.voluntario.apellido_materno || '')

    };

  });
  this.agregarVehiculos=vehiculos

  console.log("vehiculos", vehiculos);

  this.agregarVehiculos = vehiculos;

}
quitarMaquinista(row:any){
  console.log("----row-",row);
  
   console.log(row);
    this.agregarVehiculos = this.agregarVehiculos.filter(
    v => v.id_voluntario !== row.id_voluntario
  );
  
  console.log('Lista actualizada:', this.agregarVehiculos);
}
}

