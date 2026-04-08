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
readonly http = inject (logisticaService)
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
    this.secondFormGroup= this.fb.group({
      tipo: [''],
      stock: [''],
    });

  }
  editar=false;
  listaLote:any[]=[];
  filtradorLote:any[]=[];
 ngOnInit(): void {
    console.log('Datos recibidos en el diálogo:---', this.data);
    if (this.data) {
      //this.materialForm.get('tipo')?.setValue(this.data.data.tipo);
      //this.materialForm.get('estado')?.setValue(this.data.data.estado);
      this.materialForm.patchValue(this.data.data);
      this.editar=true;
      //this.editar();
      //this.id_voluntario=this.data.datos.id_voluntario;
    } 
    this.http.listarLoteMaterial().subscribe({
      next:(res:any)=>{
        console.log("listando lotes",res);
        this.listaLote=res;
        this.filtradorLote=res;
      },error(err) {
        console.error("error al listar lote material",err);
        
      },
    })

  }

 guardar(id?:any){
   //PRIMERO CREAMOS STOCK
  let idStock:number;
  console.log(this.valorLote,"valor stoskkkk");
       if (id) {
        console.log("vamos  a editar--- er lote como reducir lote ");
        
       }else{
      if(this.valorLote){
         const cantidadSotck=this.valorLote.stock+1;//actualiza lote 
         const lote={
           "stock":cantidadSotck,
            "tipo":this.valorLote.tipo
         }
         idStock=this.valorLote.id_loteMaterial;
         this.http.actualizarLote(idStock,lote).subscribe({
          next:(resp:any)=>{
            console.log("respuesta actualizado de stock",resp );
            this.mandandoBD(idStock);
          },
          error(err) {
            console.error("error en actualzia stock",err);
            
          },
          complete: () => { // El 'complete' NO recibe parámetros

          }
         })
         
      }
      else{
        const data={
           "stock":1,
           "tipo":this.secondFormGroup.get('tipo')?.value
        }
        this.http.crearLote(data).subscribe({
          next:(res:any)=>{
            console.log("creacion de lote ",res);
            idStock=res.id_loteMaterial;
            this.mandandoBD(idStock)
            console.log();
            
          },
          error(err:any){
            console.error("erro al crear lote ",err);
            
          }
        })
      }
    }

      //con stock listo guaramos material

  
  this.cerrarDialog.close()
 }

 mandandoBD(idSotck:number){
  const datosFormulario = this.materialForm.value;
  const data={
            tipo:datosFormulario.tipo,
            estado:datosFormulario.estado,
            marca:datosFormulario.marca,
            modelo:datosFormulario.modelo,
            numSerie:datosFormulario.numSerie,
            fechaAdquisicion:new Date(datosFormulario.fechaAdquisicion),
            capacidad:datosFormulario.capacidad,
            caracteristicas:datosFormulario.caracteristicas,
            historial:datosFormulario.historial,
            responsableEquipo:datosFormulario.responsableEquipo,
            cantidad:datosFormulario.cantidad,
            cantidadUnidad:datosFormulario.cantidadUnidad,
            unidadMedida:datosFormulario.unidadMedida,
            fechaLimiteUso:new Date(datosFormulario.fechaLimiteUso),
            intervaloTiempoRevision:datosFormulario.intervaloTiempoRevision,
           //historial:datosFormulario.historial,
            id_voluntario:1,//----------------
            id_loteMaterial:idSotck,
           
  }
  console.log("----------**",data,"------");
 
  
  this.http.crearIngresarMaterial(data).subscribe({
    next:(res:any)=>{
      console.log('respuesta Creacion ', res);
      //verificar si hay lote
      
      //actualizar lote 
     ///--------- verificar si asi se aumenta stock

    }
  })
 }

 verificarLote(event:any){
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
 valorLote:any;
mostrarTipoStock(lote: any): string {
  
  /*if (lote && typeof lote === 'object') {
    this.valorLote = lote;
    console.log("Valor guardado correctamente:", this.valorLote);
  }*/
  console.log("cambiando valorLote" , this.valorLote);
  return lote && lote.tipo ? lote.tipo : '';  
}
seleccionarLote(event: any) {
  this.valorLote = event.option.value;
  console.log("Lote seleccionado para guardar:", this.valorLote);
}

}
