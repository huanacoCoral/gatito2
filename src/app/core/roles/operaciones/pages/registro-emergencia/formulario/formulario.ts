import { ChangeDetectionStrategy, Component, inject, model, OnInit } from '@angular/core';
import { RegistroEmergencia } from '../registro-emergencia';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { OperacionesService } from '../../../service/operaciones.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-formulario',
  imports: [ MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  
    MatIconModule, 

    MatStepperModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    
    MatSelectModule,

    
    MatAutocompleteModule,
    AsyncPipe,
  ],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter()],
})
export class Formulario implements OnInit  {
  readonly dialogRef = inject(MatDialogRef<RegistroEmergencia>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  readonly animal = model(this.data.animal);
  //readonly animal=" ";
  private _formBuilder = inject(FormBuilder);
  hoy =new Date();
  recepcion = this._formBuilder.group({
    fecha: ['', Validators.required],
    direccion: [''],
    cel: [''],
    informante: [''],
    recepcion: [''],
  });
  gravedad = this._formBuilder.group({
    nombre: ['', Validators.required],
  });
  tipoEmergencia = this._formBuilder.group({
    nombre: ['', Validators.required],
    codigo: ['', Validators.required],
  });
  readonly http=inject(OperacionesService);
  tipoGravedad:any;
  tipoEmer:any;
  tipoEmerFiltrado:any;
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(){
    this.http.listarGravedad().subscribe({
      next:(res:any)=>{
        this.tipoGravedad=res;
      },
      error(err) {
        console.error(err);
        
      },
    })
    this.http.listarTipoEmergencia().subscribe({
      next:(res:any)=>{
        this.tipoEmer=res;
         this.tipoEmerFiltrado=res;
      },
      error(err) {
        console.error(err);
        
      },
    })
  }
  seleccionTipoEmergencia(event: MatAutocompleteSelectedEvent) {
  const idSeleccionado = event.option.value;
  
  const emergenciaEncontrada = this.tipoEmer.find((t:any) => t.id_tipoEmergencia === idSeleccionado);
  if (emergenciaEncontrada) {  
    this.tipoEmergencia.patchValue({
      nombre: emergenciaEncontrada.nombre
    });
  }
}
mostrarCodigo = (id: number): string => {
  const emergencia = this.tipoEmer.find((t:any) => t.id_tipoEmergencia === id);
  return emergencia ? emergencia.codigo : '';
}
filtrandoCodigo(event: any){
  console.log('olaaa');
  
  const entrada = event.target.value.toLowerCase();

  
  const x =this.tipoEmer.filter((t:any) => t.codigo.toLowerCase().includes(entrada));
  if (x) { 
     console.log('me quiero morir'); 
    this.tipoEmerFiltrado=x;
  }
}
}
