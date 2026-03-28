import { Component, inject, model, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import PersonalList from '../personal-list/personal-list';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { PersonalService } from '../../personal.service';



@Component({
  selector: 'app-personal-form',
  imports: [ MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,

    ReactiveFormsModule, 
    MatSelectModule, MatDatepickerModule, MatNativeDateModule,
  ],
  templateUrl: './personal-form.html',
  styleUrl: './personal-form.css',
  providers: [
    provideNativeDateAdapter() // <--- Agrega esto aquí
  ],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PersonalForm implements OnInit {
 readonly dialogRef = inject(MatDialogRef<PersonalList>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  readonly http=inject (PersonalService);
  private readonly fb = inject(FormBuilder);
  private id_voluntario:number| null = null;
  ngOnInit(): void {
    console.log('Datos recibidos en el diálogo:', this.data);
    if (this.data.tipo==="editar") {
      this.editar();
      this.id_voluntario=this.data.datos.id_voluntario;
    }   
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  readonly form = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    apellido_paterno: ['', Validators.required],
    apellido_materno: [''],
    ci: ['', Validators.required],
    telefono: ['', Validators.required],
    telefono_emergencia: [''],
    fecha_nacimiento: [''],
    sexo: [''],
    direccion: [''],
    correo_personal: ['', ],
    estado: [' '],
    observaciones: ['']
  });

  
  readonly formularioEstadoRol = this.fb.group({
    estado: [''],
    rol: [''],
    cargo: [''],
    usuario: [''],
    contrasena: ['']
  });

  guardar() {
    if (this.form.valid) {
      console.log('Datos guardados:', this.form.value);
      const fechaValor = this.form.get('fecha_nacimiento')?.value;
      const fecha = fechaValor ? new Date(fechaValor).toISOString() : null;
      this.form.get('fecha_nacimiento')?.setValue(fecha);
     /*const data = {
  nombre:              'Juan',
  apellido_paterno:    'Pérez',
  apellido_materno:    'García',
  ci:                  '1234567',
  telefono:            '77123456',
  telefono_emergencia: '77987654',
  
  // Desde el front, envíalo como String (ISO) o Date
  fecha_nacimiento:    '1995-05-20', 
  
  sexo:                'MASCULINO',
  direccion:           'Av. Siempre Viva 123',
  correo_personal:     'juan.perez@email.com',
  observaciones:       'Sin observaciones'
};*/
      // Aquí iría tu servicio para guardar
      if (this.data.tipo==="editar") {
        const datos={
          'datos':this.form.value,
          'idUsuario':this.data.datos.id_voluntario
        }
        console.log("vamos a editar ",datos);
        
        this.http.actualizar(datos).subscribe({
        next:(res:any)=>{
          console.log('respuestaaaa ',res);
          
        },
        error:(error:any)=>{
          console.error("error al actualizar ",error);
          
        }
      })
      const idRol=this.formularioEstadoRol.get('rol')?.value;
      console.log('idRol : ',idRol);
      
      const data={
      "fecha": new Date,
      "id_rol": idRol,
      "d_voluntario": this.id_voluntario
      }
      console.log("dataa1",data);
      
      //agregar Rol
      this.http.agregarRol(data).subscribe({
        next:(res:any)=>{
        console.log('estamossssss',res);

        },error:(error:any)=>console.error("error al guardar rol",error)
        
      })
      const dataCargo={
      "fecha": new Date,
      "id_cargo": this.formularioEstadoRol.get('cargo')?.value,
      "d_voluntario": this.id_voluntario
 
      }
      console.log("dataa1",dataCargo);
      
      //agregar Rol
      this.http.agregarCargo(dataCargo).subscribe({
        next:(res:any)=>{
        console.log('estamossssss',res);

        },error:(error:any)=>console.error("error al guardar rol",error)
        
      })

      }else{//guarda nuevo
        this.http.crearPersonal(this.form.value).subscribe({
        next:(res:any)=>{
          console.log('respuestaaaa ',res);
          
        }
      })
      }
      
      
    } else {
      this.form.markAllAsTouched();
    }
  }
  rol:any[]=[];
    cargo:any[]=[];
  async editar(){
    console.log("nuevo",this.data);
    
    this.form.patchValue({
    nombre:this.data.datos.nombre,
    apellido_paterno:this.data.datos.apellido_paterno,
    apellido_materno:this.data.datos.apellido_materno,
    ci:this.data.datos.ci,
    telefono:this.data.datos.telefono,
    telefono_emergencia:this.data.datos.telefono_emergencia,
    fecha_nacimiento:this.data.datos.fecha_nacimiento,
    sexo:this.data.datos.sexo,
    direccion:this.data.datos.direccion,
    correo_personal:this.data.datos.correo_personal,
    estado:this.data.datos.estado,
    observaciones:this.data.datos.observaciones,
    })
    console.log("listaaaaaa");
    
     await this.http.listarRol().subscribe({
      next:(res:any)=>{
        console.log("tenemos errores ",res);
        this.rol =res;
      },
      error:(error:any)=>console.error("teenmos un error al listar roles",error)    
    })

    await this.http.listarCargo().subscribe({
      next:(res:any)=>{
        console.log("tenemos errores ",res);
        this.cargo =res;
      },
      error:(error:any)=>console.error("teenmos un error al listar roles",error)    
    })

    //servicio
  }

  /*cancelar() {
    this.form.reset({ estado: 'ACTIVO' });
  }*/
}
