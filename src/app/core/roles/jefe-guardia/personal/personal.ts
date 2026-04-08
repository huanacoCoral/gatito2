import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Personal as personalComponente } from '../../logistica/pages/personal/personal';

@Component({
  selector: 'app-personal-jefeGuardia',
  imports: [MatCardModule, MatButtonModule,
    personalComponente
  ],
  templateUrl: './personal.html',
  styleUrl: './personal.css',
})
export class Personal{

}
