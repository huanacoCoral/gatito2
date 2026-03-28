import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../service-auth/auth.service';

@Component({
  selector: 'app-log-in.component',
  standalone: true,
  imports: [MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    RouterLink,
    ReactiveFormsModule ],
  templateUrl: './log-in.component.html',
  styles: ``,
})
export default class LogInComponent {
 
  private _formBuilder = inject(FormBuilder);
  private http=inject(AuthService)
  usuario: string = '';
  contrasena: string = '';
  private _router= inject(Router);

  signUpFormGroup = this._formBuilder.group({
    usuario: ['', Validators.required],
    contrasena: ['', Validators.required]
  });
  onSubmit() {
    console.log('Formulario enviado:', this.usuario, this.contrasena);
    // Aquí iría la lógica para enviar los datos a tu backend
    //alert(`Iniciando sesión como: ${this.usuario}`);
  }
  

  iniciarSesion(){
    console.log("estamos eentrando a consultar ");
    
    if(this.signUpFormGroup.invalid)return;
     const data={
      "email":this.signUpFormGroup.value.usuario,
      "password":this.signUpFormGroup.value.contrasena
    }
    console.log("tenemos ", data);
    
    this.http.inicioSesion(data).subscribe({
      next: (res: any) => {
        console.log("te mando al dashboar con esto respuesta (log-in): ", res);
        this._router.navigateByUrl('/dashboard');
      },
      error: (error) => {
        console.error('log In Ocurrió ****:', error);
      }
    })
  }
}
