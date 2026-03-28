import { Component } from '@angular/core';
import { MenuService } from '../../menu/menu.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule,MatIconModule,MatButtonModule,MatCardModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

  menu: any[] = [];

  constructor(
    //private auth: AuthService,
    private menuService: MenuService
  ) {
    //const rol = this.auth.getRol();
    const rolRaw = localStorage.getItem('rol') ?? '""'; 
    const rol = JSON.parse(rolRaw); 
      console.log("tenemos sidebAR",rol);
    
    this.menu = this.menuService.getMenuPorRol(rol);
    console.log("1122222",this.menu);
    
    
  }
}