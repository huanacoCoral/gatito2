import { AsyncPipe, CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Material } from '../material';
import { logisticaService } from '../../../services/logistica.service';
import { MatStepperModule } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-fomulario-material',
  imports: [ReactiveFormsModule,
    MatCardModule,

    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,


    MatStepperModule,
    FormsModule,

    MatAutocompleteModule,
    //AsyncPipe,
  ],
  templateUrl: './fomulario-material.html',
  styleUrl: './fomulario-material.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter()],
})
export class FomularioMaterial implements OnInit {
  materialForm: FormGroup;
  secondFormGroup: FormGroup;
  readonly cerrarDialog = inject(MatDialogRef<Material>);
  readonly http = inject(logisticaService)
  readonly data = inject<any>(MAT_DIALOG_DATA);
  //filteredOptions: Observable<string[]>;
  // private _formBuilder = inject(FormBuilder);

  options: string[] = ['One', 'Two', 'Three'];
  constructor(private fb: FormBuilder) {
    this.materialForm = this.fb.group({
      tipo: ['', Validators.required],
      estado: ['Nuevo'],
      marca: [''],
      modelo: [''],
      numSerie: [''],
      fechaAdquisicion: [new Date()],
      capacidad: [''],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      cantidadUnidad: [''],
      unidadMedida: [''],
      intervaloTiempoRevision: [0],
      responsableEquipo: ['', Validators.required],

      fechaLimiteUso: [''],
      caracteristicas: [''],
      historial: [''],
    });
    this.secondFormGroup = this.fb.group({
      tipo: ['', Validators.required],
      // stock: [''],
    });

  }
  editar = false;
  listaLote: any[] = [];
  filtradorLote: any[] = [];
  cantidad: any;
  idStock: any;
  ngOnInit(): void {
    console.log('Datos recibidos en el diálogo:---', this.data);
    //console.log("------->>>>>",this.data.data.id_informeIngresoMaterial);

    if (this.data) {
      this.editar = true;
      this.materialForm.patchValue(this.data.data);//----------ok
      
      this.listarStock(this.data.data.id_loteMaterial);
      
      this.cantidad = this.data.data.cantidad;
      console.log('-inicio--', this.cantidad);

    } else {

    }

    this.listarLote();

  }
  listarLote() {
    this.http.listarLoteMaterial().subscribe({
      next: (res: any) => {
        console.log("listando lotes", res);
        this.listaLote = res;
        this.filtradorLote = res;
      }, error(err) {
        console.error("error al listar lote material", err);

      },
    })
  }
  id_stock: any
  valorIiciostock: any
  listarStock(valor: any) {

    this.http.listarLoteMaterial().subscribe({
      next: (res: any) => {
        if (valor) {
          
          
          this.secondFormGroup.get('tipo')?.setValue(res.find((x: any) => {
            return x.id_loteMaterial == valor
          }))

          this.id_stock = this.secondFormGroup.get('tipo')?.value.id_loteMaterial;//----****
         // console.log("----stock",this.id_stock);
          this.valorIiciostock = this.secondFormGroup.get('tipo')?.value.stock;

        }
      }, error(err) {
        console.error("error al listar lote material", err);

      },
    })
  }
  /*guardar(id?: any) {
    //console.log("-----tenemos id-", id);

    //PRIMERO CREAMOS STOCK
    let idStock: number;
    console.log(this.valorLote, "---valor stoskkkk");
    if (id) {


      const cantidadSotck = this.valorIiciostock - this.cantidad;

      const lote = {
        "stock": cantidadSotck,
        "id_modificacion": Number(localStorage.getItem('usuario'))
      }
      this.http.actualizarLote(this.id_stock, lote).subscribe({
        next: (resp: any) => {
          console.log("respuesta ---- restada actualizado de stock", resp);
          ///this.mandandoBD(idStock);
            this.listarLote();
        },
        error(err) {
          console.error("error en actualzia stock", err);

        },
        complete: () => {
          console.log("(OBTENEMOS DEL FORMULARIO2----"+this.secondFormGroup.get('tipo')?.value.stock );
            console.log("OBTENEMOS FORMULARIO1----->>"+this.materialForm.get('cantidad')?.value);
          
          const cantidadSotckNuevo = this.secondFormGroup.get('tipo')?.value.stock + this.materialForm.get('cantidad')?.value;
            const nuevoLote = {
              "stock": cantidadSotckNuevo,
              "tipo": this.valorLote.tipo,
            }
            console.log(nuevoLote, 'nuevoLote');
            this.http.actualizarLote(this.secondFormGroup.get('tipo')?.value.id_loteMaterial, lote).subscribe({
              next: (resp: any) => {
                console.log("respuesta SUMADAAA CON EL NUEVO actualizado de stock", resp);
                this.guardarEdiatdo(this.secondFormGroup.get('tipo')?.value.id_loteMaterial);
              },
              error(err) {
                console.error("error en actualzia stock", err);

              },
              complete: () => { // El 'complete' NO recibe parámetros

              }
            })

        }
      })

      

    } else {
      if (this.valorLote) {
        //const cantidadSotck=this.valorLote.stock+1;//actualiza lote 
        const cantidadSotck = this.valorLote.stock + this.materialForm.get('cantidad')?.value;
        const lote = {
          "stock": cantidadSotck,
          "tipo": this.valorLote.tipo,

        }
        console.log("actualiznado loteeee ", lote);

        idStock = this.valorLote.id_loteMaterial;
        this.http.actualizarLote(idStock, lote).subscribe({
          next: (resp: any) => {
            console.log("respuesta actualizado de stock", resp);
            this.mandandoBD(idStock);
          },
          error(err) {
            console.error("error en actualzia stock", err);

          },
          complete: () => { // El 'complete' NO recibe parámetros

          }
        })

      }
      else {///
        const data = {
          // "stock":1, ---- cantidad probando
          "stock": this.materialForm.get('cantidad')?.value,
          "tipo": this.secondFormGroup.get('tipo')?.value,
          "id_modificacion": Number(localStorage.getItem('usuario'))
        }
        this.http.crearLoteMaterial(data).subscribe({
          next: (res: any) => {
            console.log("creacion de lote ", res);
            idStock = res.id_loteMaterial;
            this.mandandoBD(idStock)
            console.log();

          },
          error(err: any) {
            console.error("erro al crear lote ", err);

          }
        })
      }
    }

    //con stock listo guaramos material


    this.cerrarDialog.close()
  }*/

guardar(id?: any) {
  const cantidadNueva = Number(this.materialForm.get('cantidad')?.value ?? 0);
  const loteSeleccionado = this.secondFormGroup.get('tipo')?.value;
  const idLoteSeleccionado = loteSeleccionado?.id_loteMaterial;

  if (!loteSeleccionado) {
    console.error('No hay lote seleccionado para guardar.');
    return;
  }

  if (id) {
    this.guardarEdicion(id, cantidadNueva, loteSeleccionado);
  } else {
    this.guardarNuevo(cantidadNueva, loteSeleccionado);
  }

  this.cerrarDialog.close();
}

private guardarEdicion(id: any, cantidadNueva: number, loteSeleccionado: any) {
  const idLoteAnterior = Number(this.data?.data?.id_loteMaterial ?? this.id_stock);
  const cantidadAnterior = Number(this.cantidad ?? 0);
  const idLoteNuevo = Number(loteSeleccionado.id_loteMaterial);

  if (idLoteAnterior === idLoteNuevo) {
    const diferencia = cantidadNueva - cantidadAnterior;
    const stockActual = Number(loteSeleccionado.stock ?? this.valorIiciostock ?? 0);
    const stockFinal = stockActual + diferencia;
    this.actualizarLoteYEditar(idLoteNuevo, stockFinal);
    return;
  }

  const stockAnterior = Number(this.data?.data?.stock ?? this.valorIiciostock ?? 0) - cantidadAnterior;
  const stockNuevo = Number(loteSeleccionado.stock ?? 0) + cantidadNueva;

  this.http.actualizarLote(idLoteAnterior, {
    stock: stockAnterior,
    id_modificacion: Number(localStorage.getItem('usuario'))
  }).subscribe({
    next: () => {
      this.http.actualizarLote(idLoteNuevo, {
        stock: stockNuevo,
        id_modificacion: Number(localStorage.getItem('usuario'))
      }).subscribe({
        next: () => {
          this.guardarEdiatdo(idLoteNuevo);
        },
        error: (err) => console.error('Error actualizando lote nuevo', err)
      });
    },
    error: (err) => console.error('Error actualizando lote anterior', err)
  });
}

private guardarNuevo(cantidadNueva: number, loteSeleccionado: any) {
  const idLote = Number(loteSeleccionado.id_loteMaterial ?? 0);

  if (idLote) {
    const stockFinal = Number(loteSeleccionado.stock ?? 0) + cantidadNueva;
    this.http.actualizarLote(idLote, {
      stock: stockFinal,
      id_modificacion: Number(localStorage.getItem('usuario'))
    }).subscribe({
      next: () => this.mandandoBD(idLote),
      error: (err) => console.error('Error actualizando lote existente', err)
    });
    return;
  }

  const dataLote = {
    stock: cantidadNueva,
    tipo: this.secondFormGroup.get('tipo')?.value,
    id_modificacion: Number(localStorage.getItem('usuario'))
  };

  this.http.crearLoteMaterial(dataLote).subscribe({
    next: (res: any) => {
      this.mandandoBD(res.id_loteMaterial);
    },
    error: (err) => console.error('Error creando lote nuevo', err)
  });
}

private actualizarLoteYEditar(idLote: number, stockFinal: number) {
  this.http.actualizarLote(idLote, {
    stock: stockFinal,
    id_modificacion: Number(localStorage.getItem('usuario'))
  }).subscribe({
    next: () => this.guardarEdiatdo(idLote),
    error: (err) => console.error('Error actualizando lote en edición', err)
  });
}

  mandandoBD(idSotck: number) {
    const datosFormulario = this.materialForm.value;
    const data = {
      tipo: datosFormulario.tipo,
      estado: datosFormulario.estado,
      marca: datosFormulario.marca,
      modelo: datosFormulario.modelo,
      numSerie: datosFormulario.numSerie,
      fechaAdquisicion: new Date(datosFormulario.fechaAdquisicion),
      capacidad: datosFormulario.capacidad,
      caracteristicas: datosFormulario.caracteristicas,
      historial: datosFormulario.historial,
      responsableEquipo: datosFormulario.responsableEquipo,
      cantidad: datosFormulario.cantidad,
      cantidadUnidad: datosFormulario.cantidadUnidad,
      unidadMedida: datosFormulario.unidadMedida,
      fechaLimiteUso: new Date(datosFormulario.fechaLimiteUso),
      intervaloTiempoRevision: String(datosFormulario.intervaloTiempoRevision),
      //historial:datosFormulario.historial,
      id_voluntario: Number(localStorage.getItem('usuario')),//----------------
      id_loteMaterial: idSotck,

    }
    console.log("----------**", data, "------");


    this.http.crearIngresarMaterial(data).subscribe({
      next: (res: any) => {
        console.log('respuesta Creacion ', res);
        //verificar si hay lote

        //actualizar lote 
        ///--------- verificar si asi se aumenta stock
        this.listarLote();
      }
    })
  }

  verificarLote(event: any) {
    // Extraemos el valor del input correctamente
    const valor = event.target.value.toLowerCase();

    // Si el input está vacío, mostramos todos
    if (!valor) {
      this.filtradorLote = [...this.listaLote];
      return;
    }

    // Filtramos sobre la lista original y actualizamos la lista visual
    this.filtradorLote = this.listaLote.filter(lote =>
      lote.tipo.toLowerCase().includes(valor)
    );
  }
  // Esta función se encarga de "traducir" el objeto al texto que verá el usuario
  valorLote: any;
  mostrarTipoStock(lote: any): string {

    /*if (lote && typeof lote === 'object') {
      this.valorLote = lote;
      console.log("Valor guardado correctamente:", this.valorLote);
    }*/
    console.log("cambiando valorLote", this.valorLote);
    return lote && lote.tipo ? lote.tipo : '';
  }
  seleccionarLote(event: any) {
    this.valorLote = event.option.value;
    console.log("Lote seleccionado para guardar:", this.valorLote);
  }

  guardarEdiatdo(idSotck: any) {
    const datosFormulario = this.materialForm.value;
    const data = {
      tipo: datosFormulario.tipo,
      estado: datosFormulario.estado,
      marca: datosFormulario.marca,
      modelo: datosFormulario.modelo,
      numSerie: datosFormulario.numSerie,
      fechaAdquisicion: new Date(datosFormulario.fechaAdquisicion),
      capacidad: datosFormulario.capacidad,
      caracteristicas: datosFormulario.caracteristicas,
      historial: datosFormulario.historial,
      responsableEquipo: datosFormulario.responsableEquipo,
      cantidad: datosFormulario.cantidad,
      cantidadUnidad: datosFormulario.cantidadUnidad,
      unidadMedida: datosFormulario.unidadMedida,
      fechaLimiteUso: new Date(datosFormulario.fechaLimiteUso),
      intervaloTiempoRevision: String(datosFormulario.intervaloTiempoRevision),
      //historial:datosFormulario.historial,
      id_voluntario: this.data.data.id_voluntario,//----------------
      id_modificacion: Number(localStorage.getItem('usuario')),//----------------
      id_loteMaterial: idSotck,

    }
    console.log("----------**", data, "------");


    this.http.editarIngresarMaterial(this.data.data.id_informeIngresoMaterial, data).subscribe({
      next: (res: any) => {
        console.log('respuesta ediatdo ', res);
        //verificar si hay lote

        //actualizar lote 
        ///--------- verificar si asi se aumenta stock
        this.listarLote();
      }
    })
  }

}
