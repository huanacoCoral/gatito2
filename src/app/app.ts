import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card'; // <-- Importado


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatCardModule, 
    RouterOutlet,
    
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('front-app');
}
