import { Component } from '@angular/core';
import { Material as componeteMAterial} from '../../logistica/pages/material/material';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-material-jefeOperacion',
  imports: [componeteMAterial,
    MatCardModule, MatButtonModule
  ],
  templateUrl: './material.html',
  styleUrl: './material.css',
})
export class Material {

}
