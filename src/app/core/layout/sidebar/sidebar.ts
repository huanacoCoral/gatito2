import { Component, inject } from '@angular/core';
import { MenuService } from '../../menu/menu.service';
import { RouterLink, RouterModule,Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule,MatIconModule,MatButtonModule,MatCardModule,RouterLink,],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

  menu: any[] = [];
  private _router= inject(Router);
  constructor(
    //private auth: AuthService,
    private menuService: MenuService
  ) {
    //const rol = this.auth.getRol();
    const rolRaw = localStorage.getItem('rol') ?? '""'; 
    const rol = JSON.parse(rolRaw); 
      //console.log("tenemos sidebAR",rol);
    
    this.menu = this.menuService.getMenuPorRol(rol);
    //console.log("1122222",this.menu);
    
    
  }
  salir(){
    localStorage.removeItem('session');
    localStorage.removeItem('usuario');
    localStorage.removeItem('rol');
    this._router.navigateByUrl('/auth/log-in');
  }
}