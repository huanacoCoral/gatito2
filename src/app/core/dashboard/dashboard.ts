import { Component, inject, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import ApexCharts from 'apexcharts';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { adminService } from '../roles/admin/adminService';
@Component({
  selector: 'app-dashboard',
  imports: [ 
    FormsModule,

    // Material
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    CommonModule,
      
    // Layout
    ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export default class Dashboard implements OnInit{
   private http=inject(adminService)
    anioEmergencia = 2026;
  ngOnInit(): void {
    this.inicializarGrafico();
    this.inicializarPieTiposEmergencia();
    this.inicializarVehiculosMasUsados();
  }


  inicializarGrafico(): void {

  this.http.emergenciasPorMes(
    this.anioEmergencia
  ).subscribe({

    next:(resp:any)=> {

      console.log(resp);

      // =========================
      // EXTRAER DATOS
      // =========================

      const categorias = resp.map(
        (item:any) => item.mes
      );

      const valores = resp.map(
        (item:any) => item.total
      );

      // =========================
      // LIMPIAR GRAFICO
      // =========================

      const contenedor = document.querySelector(
        '#emergenciasMes'
      ) as HTMLElement;

      if(contenedor){
        contenedor.innerHTML = '';
      }

      // =========================
      // OPCIONES GRAFICO
      // =========================

      const options:any = {

        chart:{
          type:'bar',
          height:250,
        },

        series:[
          {
            name:'Emergencias',
            data: valores,
          }
        ],

        xaxis:{
          categories: categorias,
        },
      };

      // =========================
      // CREAR GRAFICO
      // =========================

      if(contenedor){

        const chart = new ApexCharts(
          contenedor,
          options
        );

        chart.render();
      }
    },

    error:(err)=> {
      console.log(err);
    }
  });
}
inicializarPieTiposEmergencia(): void {

  this.http.tiposEmergencia()
  .subscribe({

    next:(resp:any)=> {

      console.log(resp);

      // =========================
      // EXTRAER DATOS
      // =========================

      const nombres = resp.map(
        (item:any) => item.nombre
      );

      const valores = resp.map(
        (item:any) => item.total
      );

      // =========================
      // LIMPIAR CONTENEDOR
      // =========================

      const contenedor = document.querySelector(
        '#tiposEmergencia'
      ) as HTMLElement;

      if(contenedor){
        contenedor.innerHTML = '';
      }

      // =========================
      // CONFIG GRAFICO
      // =========================

      const options:any = {

        chart:{
          type:'pie',
          height:320,
        },

        series: valores,

        labels: nombres,
      };

      // =========================
      // CREAR GRAFICO
      // =========================

      if(contenedor){

        const chart = new ApexCharts(
          contenedor,
          options
        );

        chart.render();
      }
    },

    error:(err)=> {
      console.log(err);
    }
  });
}
inicializarVehiculosMasUsados(): void {

  this.http.vehiculosMasUsados()
  .subscribe({

    next:(resp:any)=> {

      console.log(resp);

      // =========================
      // EXTRAER DATOS
      // =========================

      const nombres = resp.map(
        (item:any) => item.nombre
      );

      const valores = resp.map(
        (item:any) => item.total
      );

      // =========================
      // LIMPIAR
      // =========================

      const contenedor = document.querySelector(
        '#vehiculosUsados'
      ) as HTMLElement;

      if(contenedor){
        contenedor.innerHTML = '';
      }

      // =========================
      // CONFIG GRAFICO
      // =========================

      const options:any = {

        chart:{
          type:'bar',
          height:320,
        },

        series:[
          {
            name:'Participaciones',
            data: valores,
          }
        ],

        xaxis:{
          categories: nombres,
        },

        plotOptions:{
          bar:{
            horizontal:true,
          }
        }
      };

      // =========================
      // RENDER
      // =========================

      if(contenedor){

        const chart = new ApexCharts(
          contenedor,
          options
        );

        chart.render();
      }
    },

    error:(err)=> {
      console.log(err);
    }
  });
}

}
