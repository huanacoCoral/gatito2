import { Component, inject, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { logisticaService } from '../../services/logistica.service';
import { MatDialog } from '@angular/material/dialog';
import { VisualizarInf } from './visualizar-inf/visualizar-inf';
import PersonalList from '../../../personal/pages/personal-list/personal-list';

@Component({
  selector: 'app-personal',
  imports: [PersonalList],
  templateUrl: './personal.html',
  styleUrl: './personal.css',
})
export class Personal {
 

}
