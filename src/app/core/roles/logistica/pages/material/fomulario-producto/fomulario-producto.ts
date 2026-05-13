import { Component, inject, OnInit } from '@angular/core';
import { logisticaService } from '../../../services/logistica.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Material } from '../material';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-fomulario-producto',
  imports: [FormsModule, CommonModule, ReactiveFormsModule,
    
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatAutocompleteModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './fomulario-producto.html',
  styleUrl: './fomulario-producto.css',
})
export class FomularioProducto implements OnInit {
  readonly cerrarDialog = inject(MatDialogRef<Material>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  readonly fb = inject(FormBuilder);

  productoForm: FormGroup;
  secondFormGroup: FormGroup;

  lotes: any[] = [];
  valorLote: any = null;
  id_stock: number = 0;
  cantidad: number = 0;
  valorIiciostock: number = 0;

  constructor(private http: logisticaService) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      cantidad: [0, Validators.required],
      cantidadUnidad: [0, Validators.required],
      unidadMedida: ['', Validators.required],
      marca: ['', Validators.required],
      estado: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      fechaCaducidad: ['', Validators.required],
      registroMantenimiento: ['', Validators.required],
      fechaAdquisicion: ['', Validators.required],
      id_voluntario: [Number(localStorage.getItem('usuario')), Validators.required]
    });

    this.secondFormGroup = this.fb.group({
      tipo: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.listarLote();
    if (this.data) { // si llega data es para editar 
      console.log('--*', this.data);
      this.productoForm.patchValue(this.data.data);
      //this.secondFormGroup.patchValue({ tipo: this.data.data.id_loteProducto });
      console.log(this.secondFormGroup.get("tipo")?.value);
     this.listarStock(this.data.data.id_loteProducto)
      this.cantidad = this.data.data.cantidad;
      this.id_stock = this.data.data.id_loteProducto;
      this.botonActualizar = true;

    }
  }
filtradorLote:any
listaLote:any
  listarLote() {
    this.http.listarProductos().subscribe({
      next: (res: any) => {
        this.lotes = res;
        this.filtradorLote=res;
        this.listaLote=res;
        console.log('Lotes de producto:', this.lotes);
      },
      error: (err) => console.error('Error listando lotes', err)
    });
  }
   listarStock(valor: any) {
    console.log("valor",valor);
    
    this.http.listarProductos().subscribe({
      next: (res: any) => {
        if (valor) {
          
          console.log("this.secondFormGroup.get('tipo')?.setValue---",this.secondFormGroup.get('tipo')?.value);
          
          const loteEncontrado = res.find((x: any) => x.id_loteProducto === valor);
        console.log("loteEncontrado---",loteEncontrado,);
        
        if (loteEncontrado) {
          // 1. Seteamos el objeto completo al formulario
          this.secondFormGroup.get('tipo')?.setValue(loteEncontrado);
          
          // 2. Actualizamos las referencias locales para la lógica de guardado
          this.valorLote = loteEncontrado;
          this.id_stock = loteEncontrado.id_loteProducto;
          this.valorIiciostock = loteEncontrado.stock;
          console.log("this.id_stock 1111",this.id_stock);
          
          console.log("Lote cargado en input:", loteEncontrado);
        }

        }
      }, error(err) {
        console.error("error al listar lote material", err);

      },
    })
  }

  guardar(id?: any) {
    console.log("-----tenemos id-", id);

    // PRIMERO CREAMOS STOCK
    let idStock: number;
    console.log(this.valorLote, "---valor lote");
    if (id) {
      // Edición: restar cantidad anterior del lote actual
      const cantidadRestar = this.valorIiciostock - this.cantidad;
      const loteRestar = {
        stock: cantidadRestar,
        id_modificacion: Number(localStorage.getItem('usuario'))
      };
      console.log("this.id_stock--",this.id_stock);
      
      this.http.actualizarLoteProducto(this.id_stock, loteRestar).subscribe({
        next: (resp: any) => {
          console.log("respuesta ---- restada actualizado de stock", resp);
          this.listarLote();
        },
        error(err) {
          console.error("error en actualizar stock", err);
        },
        complete: () => {
          console.log("OBTENEMOS FORMULARIO1----->>" + this.productoForm.get('cantidad')?.value);
          
          const cantidadNueva = this.secondFormGroup.get('tipo')?.value.stock + this.productoForm.get('cantidad')?.value;
          const nuevoLote = {
            stock: cantidadNueva,
            tipo: this.valorLote.tipo,
          };
          console.log(nuevoLote, 'nuevoLote');
          this.http.actualizarLoteProducto(this.secondFormGroup.get('tipo')?.value.id_loteProducto, nuevoLote).subscribe({
            next: (resp: any) => {
              console.log("respuesta SUMADA CON EL NUEVO actualizado de stock", resp);
              this.guardarEditado(this.secondFormGroup.get('tipo')?.value.id_loteProducto);
            },
            error(err) {
              console.error("error en actualizar stock", err);
            },
            complete: () => {}
          });
        }
      });
    } else {//GUARDAR
      if (this.valorLote) {
        // Actualizar lote existente
        const cantidadNueva = this.valorLote.stock + this.productoForm.get('cantidad')?.value;
        const lote = {
          stock: cantidadNueva,
          tipo: this.valorLote.tipo,
        };
        console.log("actualizando lote existente ", lote);
        idStock = this.valorLote.id_loteProducto;
        this.http.actualizarLoteProducto(idStock, lote).subscribe({
          next: (resp: any) => {
            console.log("respuesta actualizado de stock", resp);
            this.mandandoBD(idStock);
          },
          error(err) {
            console.error("error en actualizar stock", err);
          },
          complete: () => {}
        });
      } else {
        // Crear nuevo lote
        const dataLote = {
          stock: this.productoForm.get('cantidad')?.value,
          tipo: this.secondFormGroup.get('tipo')?.value,
          id_modificacion: Number(localStorage.getItem('usuario'))
        };
        console.log("dataLote---",dataLote);
        
        this.http.crearloteProductos(dataLote).subscribe({
          next: (res: any) => {
            console.log("creacion de lote producto ", res);
            idStock = res.id_loteProducto;
            this.mandandoBD(idStock);
            console.log();
          },
          error(err: any) {
            console.error("error al crear lote producto ", err);
          }
        });
      }
    }

    // Con stock listo, guardamos producto
    this.cerrarDialog.close();
  }

  mandandoBD(idStock: number) {
    const dataProducto = {
      ...this.productoForm.value,
      fechaCreacion: new Date(this.productoForm.get('fechaCreacion')?.value).toISOString(),
      fechaCaducidad: new Date(this.productoForm.get('fechaCaducidad')?.value).toISOString(),
      fechaAdquisicion: new Date(this.productoForm.get('fechaAdquisicion')?.value).toISOString(),
      id_loteProducto:idStock
    
    };
    
    this.http.crearProducto(dataProducto).subscribe({
      next: (res: any) => {
        console.log("Producto creado", res);

      },
      error: (err) => console.error("Error creando producto", err)
    });
  }
  verificarLote(event: any) {
    const valor = event.target.value.toLowerCase();
    if (!valor) {
      this.filtradorLote = [...this.listaLote];
      return;
    }

    this.filtradorLote = this.listaLote.filter((lote:any) =>
      lote.tipo.toLowerCase().includes(valor)
    );
  }

  guardarEditado(idStock: number) {
    // Lógica para editar producto existente
    // Similar a mandandoBD pero para actualización
    const dataProducto = {
      ...this.productoForm.value,
      fechaCreacion: new Date(this.productoForm.get('fechaCreacion')?.value).toISOString(),
      fechaCaducidad: new Date(this.productoForm.get('fechaCaducidad')?.value).toISOString(),
      fechaAdquisicion: new Date(this.productoForm.get('fechaAdquisicion')?.value).toISOString(),
      id_loteProducto:idStock,
      id_modificacion: Number(localStorage.getItem('usuario'))
    
    };
    
    this.http.actualizarIngresoProducto(this.data.data.id_informeIngresoProducto,dataProducto).subscribe({
      next: (res: any) => {
        console.log("Producto creado", res);

      },
      error: (err) => console.error("Error creando producto", err)
    });
    console.log("Editando producto con idStock:", idStock);
    


    // Implementar actualización del ingreso si es necesario
  }

  onLoteChange(event: any) {
    // event.option.value contiene el objeto del lote completo
    this.valorLote = event.option.value;
    this.valorIiciostock = this.valorLote.stock; // Guardar stock inicial para edición
    console.log('Lote seleccionado:', this.valorLote);
  }

  mostrarTipoStock(lote: any): string {

    console.log("cambiando valorLote", this.valorLote);
    return lote && lote.tipo ? lote.tipo +" "+lote.nombre : '';
  }

  cancelar() {
    this.cerrarDialog.close();
  }

  botonActualizar: boolean = false;
}