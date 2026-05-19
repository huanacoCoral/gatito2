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
import Swal from 'sweetalert2';



@Component({
  selector: 'app-personal-form',
  imports: [MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,

    ReactiveFormsModule,
    MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatIconModule
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
  readonly http = inject(PersonalService);
  private readonly fb = inject(FormBuilder);
  private id_voluntario: number | null = null;
  fechaMaxima!: Date;
  ngOnInit(): void {
    console.log('Datos recibidos en el diálogo:', this.data);
    if (this.data.tipo === "editar") {
      this.editar();
      this.id_voluntario = this.data.datos.id_voluntario;
    }
    const hoy = new Date();

    // Restamos 18 años al año actual
    this.fechaMaxima = new Date(
      hoy.getFullYear() - 18,
      hoy.getMonth(),
      hoy.getDate()
    );
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
    correo_personal: ['',],
    estado: [' '],
    observaciones: ['']
  });


  readonly formularioEstadoRol = this.fb.group({
    estado: ['A'],
    rol: [''],
    cargo: [''],
    usuario: ['',[Validators.required]],
    contrasena: ['',[Validators.required]]
  });

  guardar() {
    if (this.form.valid) {
      console.log('Datos guardados:', this.form.value);
      const fechaValor = this.form.get('fecha_nacimiento')?.value;
      const fecha = fechaValor ? new Date(fechaValor).toISOString() : null;
      this.form.get('fecha_nacimiento')?.setValue(fecha);

      if (this.data.tipo === "editar") {
        const datos = {
          'datos': this.form.value,
          'idUsuario': this.data.datos.id_voluntario,
          'id_modificacion': Number(localStorage.getItem('usuario'))
        }
        console.log("vamos a editar ", datos);

        this.http.actualizar(datos).subscribe({
          next: (res: any) => {
            console.log('respuestaaaa ', res);

          },
          error: (error: any) => {
            console.error("error al actualizar ", error);

          }
        })
        ///actualizar aunqu no tenga srol u otra relacion

        const idRol = this.formularioEstadoRol.get('rol')?.value;
        console.log('idRol : ', idRol);
        if (idRol) {
          console.log("hay rol");


          const data = {
            "fecha": new Date,
            "id_rol": idRol,
            "d_voluntario": this.id_voluntario,
            "id_modificacion": Number(localStorage.getItem('usuario'))
          }
          console.log("dataa1", data);

          //agregar Rol
          this.http.agregarRol(data).subscribe({
            next: (res: any) => {
              console.log('estamossssss', res);

            }, error: (error: any) => console.error("error al guardar rol", error)

          })
        }
        if (this.formularioEstadoRol.get('cargo')?.value) {
          console.log("hay cargo");

          const dataCargo = {
            "fecha": new Date,
            "id_cargo": this.formularioEstadoRol.get('cargo')?.value,
            "d_voluntario": this.id_voluntario,
            "id_modificacion": Number(localStorage.getItem('usuario'))
          }
          console.log("dataa1 para cargo", dataCargo);

          //agregar Rol
          this.http.agregarCargo(dataCargo).subscribe({
            next: (res: any) => {
              console.log('estamossssss', res);

            }, error: (error: any) => console.error("error al guardar rol", error)

          })

        }



      } else {//guarda nuevo
        const dataEnvio = {
          ...this.form.value,
          id_modificacion: Number(localStorage.getItem('usuario'))
        };

        this.http.crearPersonal(dataEnvio).subscribe({
          next: (res: any) => {
            console.log('respuestaaaa ', res);

          }
        })
      }


    } else {
      this.form.markAllAsTouched();
    }
  }
  rol: any[] = [];
  cargo: any[] = [];
  asignarUsuarioNuevo = false;
  seQuitoAlUsuario=false;
  async editar() {
    console.log("nuevo----", this.data);

    this.form.patchValue({
      nombre: this.data.datos.nombre,
      apellido_paterno: this.data.datos.apellido_paterno,
      apellido_materno: this.data.datos.apellido_materno,
      ci: this.data.datos.ci,
      telefono: this.data.datos.telefono,
      telefono_emergencia: this.data.datos.telefono_emergencia,
      fecha_nacimiento: this.data.datos.fecha_nacimiento,
      sexo: this.data.datos.sexo,
      direccion: this.data.datos.direccion,
      correo_personal: this.data.datos.correo_personal,
      estado: this.data.datos.estado,
      observaciones: this.data.datos.observaciones,

    })
    const rolAdquirido = this.data.datos.rolesTrayecto[this.data.datos.rolesTrayecto.length - 1]?.rol.id_rol;
    const usuarioAdquirido = this.data.datos.usuario?.email
    console.log("rolAdquirido", rolAdquirido);

    this.formularioEstadoRol.patchValue({
      rol: rolAdquirido ?? '',
      cargo: this.data.datos.cargosTrayecto[this.data.datos.cargosTrayecto.length - 1]?.cargo.id_cargo,
      
    })

    await this.http.listarRol().subscribe({
      next: (res: any) => {
        console.log("tenemos roles", res);
        this.rol = res;
        //const rolEncontrado = res.find((valor:any) => valor.id_rol == rolAdquirido);

        //  this.formularioEstadoRol.get('rol')?.patchValue(rolEncontrado.id_rol);
      },
      error: (error: any) => console.error("teenmos un error al listar roles", error)
    })

    await this.http.listarCargo().subscribe({
      next: (res: any) => {
        console.log("tenemos errores ", res);
        this.cargo = res;
      },
      error: (error: any) => console.error("teenmos un error al listar roles", error)
    })

    //tenemos usuario?
    if (this.data.datos.usuario) {

      console.log("YA TIENE USUARIO ");
     
      if(this.data.datos.usuario.estado!='B'){
        console.log("es diferentea a b entonces llenamos");
       
        this.formularioEstadoRol.patchValue({
          usuario: this.data.datos.usuario?.email
        })

      }
      this.asignarUsuarioNuevo = true;

    }
    if(this.data.datos.usuario.estado=='A'){
        
          this.seQuitoAlUsuario=true;
        
    }
  }
  asignarUsuario() {
    if (this.formularioEstadoRol.get('usuario')?.value && this.formularioEstadoRol.get('contrasena')?.value) {
      const datos = {
        id_voluntario: this.data.datos.id_voluntario,
        email: this.formularioEstadoRol.get('usuario')?.value,
        password: this.formularioEstadoRol.get('contrasena')?.value,
        id_modificacion: Number(localStorage.getItem('usuario'))
      }
      this.http.agregarUsuario(datos).subscribe({
        next: (res: any) => {
          console.log('estamossssss crear usuario', res);
          Swal.fire({
                title: 'Actualizo correctamente',
                text: 'Se asigno un usuario al voluntario',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });
        }, error: (error: any) =>{ console.error("error al guardar rol", error)
          Swal.fire({
          title: '¡Error al asignar!',
          text: 'No se pudo asignar el usuario al voluntario. Es probable que el usuario ya exista.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        }
      }
    )
    }
  }
  actalizarUsuario() {
    const datos = {
      id_voluntario: this.data.datos.id_voluntario,
      usuario: this.formularioEstadoRol.get('usuario')?.value,
      password: this.formularioEstadoRol.get('contrasena')?.value,
      id_modificacion: Number(localStorage.getItem('usuario'))
    }
    this.http.actualizarUsuario(datos).subscribe({
      next(value) {
        console.log("loggg", value);
        Swal.fire({
                title: 'SE  actualizo correctamente al usuario',
                text: 'se actualizo correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });
      },
      error(err) {
        console.error(err,"------errror");
        
        Swal.fire({
          title: '¡Error al actualizar!',
          text: 'No se pudo actualizar el usuario al voluntario. Es probable que el usuario ya exista.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      },
    })
  }
  quitarUsuario() {
    const datos = {
      id_voluntario: this.data.datos.id_voluntario,
      id_modificacion: Number(localStorage.getItem('usuario'))
    }
    
    this.http.quitarUsuario(datos).subscribe({
      next(value) {
          Swal.fire({
                title: 'Usuario quitado',
                text: 'El usuario se quito correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });
      },
      error(err) {
        console.error("errrr",err);
        Swal.fire({
          title: '¡Error al Quitar usuario!',
          text: 'No se pudo quitar el usuario al voluntario.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      },
    })
  }
  /*cancelar() {
    this.form.reset({ estado: 'ACTIVO' });
  }*/
}
