import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { jefeGuardiaService } from '../../server/jefeGuadia.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-formulario-emergencia',
  imports: [ ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule, 
    MatButtonModule,
    MatAutocompleteModule,],
  templateUrl: './formulario-emergencia.html',
  styleUrl: './formulario-emergencia.css',
})
export class FormularioEmergencia implements OnInit{
  private http=inject(jefeGuardiaService)
  form!: FormGroup;
  listarTipoEmergenciaGravedadOriginal:any
  listarGravedadOriginal:any
  
  // Lista de ejemplo para tus selectores (asumiendo una interfaz con id y nombre)
  gravedadListaOriginalt : any;
  listarVoluntariosDisponibles:any;
  filtrarVoluntariosDisponibles:any;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.listarGravedad();
    this.listarTipoEmergencia();
    this.listarPersonalDisponible();
    this.listarMaquinista();
  }

  initForm(): void {
    this.form = this.fb.group({
      nombrePersona: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      cel_ref: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      fecha: [new Date().toISOString().substring(0, 10), [Validators.required]], // Fecha por defecto hoy
      tipoRecepcion: ['', [Validators.required]],
      id_gravedad: [null, [Validators.required]],
      nivelEmergencia: [null, [Validators.required]],
      voluntario: [null], // Ajusté el nombre para que no se repita
      maquinistasAsignados: [null]  // Ajusté el nombre para que no se repita
    });
  }

  guardarEmergencia(): void {
    if (this.form.valid) {
      console.log('Datos del formulario:', this.form.value);
      // Aquí iría tu lógica para llamar al servicio y guardar en la BD
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
     // 1. Obtenemos el objeto del voluntario seleccionado
  const voluntario = event.option.value;

  if (voluntario) {
    // 2. Verificamos que no haya sido agregado antes (para no repetir)
    const yaExiste = this.voluntariosSeleccionados.some(v => v.id_voluntario === voluntario.id_voluntario);

    if (!yaExiste) {
      this.voluntariosSeleccionados.push(voluntario);
     
    }

    
    setTimeout(() => {
      this.form.get('voluntario')?.setValue('');
    });
  }
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
listarMaquinista(){
this.http.listarMaquinista().subscribe({
  next:(value)=> {
    console.log(value);
    this.gravedadListaOriginalt=value;
  },
  error(err) {
    console.error("error en maquinista listado ",err);
    
  },
})
}

}

