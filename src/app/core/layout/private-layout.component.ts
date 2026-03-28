import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Sidebar } from "./sidebar/sidebar";

@Component({
  selector: 'app-private-layout',
  standalone: true,
  imports: [RouterModule,
    Sidebar
  ],
  template: `
    <div class="layout">
    <details>
  <summary>ver</summary>

      <app-sidebar></app-sidebar> 
      </details>
      <main class="content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .layout {
      display: flex;       /* La magia: pone un componente al lado del otro */
      height: 100vh;      /* Ocupa toda el alto de la pantalla */
      width: 100vw;       /* Ocupa todo el ancho */
      overflow: hidden;   /* Evita scrolls raros en el contenedor padre */
      background-color: #f4f7f6; /* Un gris muy suave para que el contenido resalte */
    }

    app-sidebar {
      width: 260px;       /* Ancho fijo para tu menú azul */
      min-width: 260px;
      height: 100%;
      background-color: #1a237e; /* Azul profundo por defecto */
      box-shadow: 4px 0 10px rgba(0,0,0,0.1);
      z-index: 10;        /* Para que siempre esté "arriba" visualmente */
    }

    .content {
      flex: 1;            /* Toma todo el espacio naranja/blanco sobrante */
      padding: 2rem;      /* Espacio para que el texto no pegue a los bordes */
      overflow-y: auto;   /* Si el contenido es largo, solo esta parte hace scroll */
      background-image: linear-gradient(135deg, #ffffff 0%, #fff3e0 100%); /* Un toque sutil de naranja al fondo */
    }
  `]
})
export  class PrivateLayoutComponent {}