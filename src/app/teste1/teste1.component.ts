import { Component, OnInit } from '@angular/core';
import JWT from '../utils/JWT';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';



import * as L from "leaflet";
import "leaflet/dist/leaflet.css"
import { CardComponent } from '../components/card/card.component';
import { TableAreaComponent } from '../components/table-area/table-area.component';
import OcorrenciaService from '../services/OcorrenciaService';
// import OcorrenciaService from '../services/OcorrenciaService';
import ocorrenciaBody from '../interfaces/ocorrenciaBody';

@Component({
  selector: 'app-teste1',
  standalone: true,
  imports: [NgFor, CardComponent, TableAreaComponent],
  templateUrl: './teste1.component.html',
  styleUrl: './teste1.component.scss'
})
export class Teste1Component implements OnInit {

  userToken: string = '' 
  userName: string | unknown = 'teste'  
  userPermission: string[] = []
  ocorrencias: ocorrenciaBody[] = []
  unidades: { nome_unidade: string }[] = []

  map: any

  constructor(private router: Router) {}

  async ngOnInit() {
    const token = localStorage.getItem("userToken")
    console.log('this.ocorrencias')
    console.log(token)
    if(token) {
      this.userToken = token
      if(!JWT.verifyValidToken(this.userToken)) {
        alert('Seu Token expirou, faça o login novamente')
        this.router.navigate(['/'])
      } else {
        const decode: any = JWT.decodeToken(this.userToken);
        const userData: any = JSON.parse(decode.body)
         this.userName = userData.name
         this.userPermission = userData.Permissions
         console.log(userData, "teste")

         this.configMap()
        //  this.ocorrencias = await this.ocorrenciaService.getOcorrencias()
        this.ocorrencias = await OcorrenciaService.getOcorrencias()
        this.unidades = await OcorrenciaService.getUnidades()
      }
    } else {
      alert('Seu Token expirou, faça o login novamente')
      this.router.navigate(['/'])
    }
  }

  getOut() {
    localStorage.removeItem("userToken")
    this.router.navigate(['/'])
    console.log("teste")
  }

  configMap(): void {
    this.map = L.map('map', {
      center: [-8.0584933, -34.8848193],
      zoom: 13
    })

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map)

    L.marker([-8.0584933, -34.8848193]).addTo(this.map)
      .bindPopup('cidade do recife')
      .openPopup()
  }

}
