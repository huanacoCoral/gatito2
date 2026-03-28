import { Component, inject, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export default class Dashboard implements OnInit{
   readonly _http=inject(DashboardService)
  ngOnInit(){
    console.log("estamos en el inicio del dash");
    this._http.mostrarInformacion().subscribe({
      next: (res:any)=>console.log("ewqwwqw",res),
      error:(error)=>console.log("teneos un error en ",error)
      
      
    })

    
  }
}
