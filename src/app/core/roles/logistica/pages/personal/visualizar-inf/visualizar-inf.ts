import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Personal } from '../personal';

@Component({
  selector: 'app-visualizar-inf',
  imports: [MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    JsonPipe],
  templateUrl: './visualizar-inf.html',
  styleUrl: './visualizar-inf.css',
})
export class VisualizarInf {
  readonly dialogRef = inject(MatDialogRef<Personal>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  //readonly animal = model(this.data.animal);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
