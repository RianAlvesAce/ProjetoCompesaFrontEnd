import { Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import JWT from '../utils/JWT';
import { Router, RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';

import * as L from "leaflet";
import "leaflet/dist/leaflet.css"
import { CardComponent } from '../components/card/card.component';
import { TableAreaComponent } from '../components/table-area/table-area.component';
import OcorrenciaService from '../services/OcorrenciaService';
// import OcorrenciaService from '../services/OcorrenciaService';
import ocorrenciaBody from '../interfaces/ocorrenciaBody';
import { faBars, faBullhorn, faCircleArrowRight, faCircleInfo, faLocationDot, faScroll } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import UnidadeQuant from '../interfaces/UnidadeQuant';

@Component({
  selector: 'app-teste1',
  standalone: true,
  imports: [NgFor, CardComponent, TableAreaComponent, FontAwesomeModule, RouterModule],
  templateUrl: './teste1.component.html',
  styleUrl: './teste1.component.scss'
})
export class Teste1Component implements OnInit {

  userToken: string = '' 
  userName: string | unknown = 'teste'  
  userPermission: string[] = []
  ocorrencias: ocorrenciaBody[] = []
  unidades: { iD_Unidade: number, nome_unidade: string, endereco: string, latitude: number,longitude: number }[] = []
  unidParada: number = 0
  redVazao: number = 0
  pend: number = 0
  faBarsIcon = faBars
  bullHornIcon = faBullhorn
  arrowRightIcon = faCircleArrowRight

  relatorioIcon = faScroll
  infoIcon = faCircleInfo
 
  @ViewChild('menu') menuBar!: ElementRef

  map!: L.Map 
  layer: any

  constructor(private router: Router) {
  }

  async openMenu(): Promise<void> {
    if(this.menuBar.nativeElement.classList.contains('w-0')) {
      this.menuBar.nativeElement.classList.replace('w-0', 'w-8por')
      this.menuBar.nativeElement.classList.add('border')
    } else {
      this.menuBar.nativeElement.classList.replace('w-8por', 'w-0')
      this.menuBar.nativeElement.classList.remove('border')
    }
  }

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
         this.ocorrencias = await OcorrenciaService.getOcorrencias()

         this.ocorrencias.forEach((ocorrencia) => {
          if(ocorrencia.estadoParado) this.unidParada++
          if(ocorrencia.has_Reducao_Vazao) this.redVazao++
          if(ocorrencia.estado) this.pend++
         })

         this.configMap()
         this.layer = L.layerGroup().addTo(this.map)
         this.teste()
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

  async showParadas() {
    this.layer.clearLayers()

    const unidadesOco: UnidadeQuant[] = await OcorrenciaService.getUnidadesQuant()
    unidadesOco.forEach(unidade => {
      this.createOthers(Number(unidade.total_Parada), "red", unidade.longitude, unidade.latitude)
    })
  }

  async showVazao() {
    this.layer.clearLayers()

    const unidadesOco: UnidadeQuant[] = await OcorrenciaService.getUnidadesQuant()
    unidadesOco.forEach(unidade => {
      this.createOthers(Number(unidade.total_Reducao_Vazao), "orange", unidade.longitude, unidade.latitude)
    })
  }

  async showAll() {
    this.layer.clearLayers()

    const unidadesOco: UnidadeQuant[] = await OcorrenciaService.getUnidadesQuant()
    unidadesOco.forEach(unidade => {
      this.createCircle(unidade)
    })
  }

  async createOthers(total: number, color: string, long: number, lat: number) {
      if(Number(total) > 0) {
        for(let i = 0; i < Number(total); i++) {
          const circulo = L.divIcon({
            className: "circulo", 
            html: `<div class="circulo bg-${color}-500 flex justify-center items-center w-7 h-7 rounded-full bg-opacity-50"><span>${total}</span></div>`,
            iconSize: [30,30]
          })
  
          const marcador = L.marker([lat, long], {
            icon: circulo
          })

          this.layer.addLayer(marcador)
        }
      }
  }

  createCircle(unidade: UnidadeQuant) {
    
    let circulo = L.divIcon({
      className: "circulo", 
      html: `<div class="circulo bg-yellow-500 flex justify-center items-center w-7 h-7 rounded-full bg-opacity-50"><span>${unidade.total}</span></div>`,
      iconSize: [30,30]
    })

    let marcador = L.marker([unidade.latitude, unidade.longitude], {
      icon: circulo
    })

    marcador.on("click", (e) => {
      this.map.setView([e.latlng.lat, e.latlng.lng], 15)
    })

    this.layer.addLayer(marcador)

  }

  async teste(): Promise<void> {

    const unidadesOco: UnidadeQuant[] = await OcorrenciaService.getUnidadesQuant()
    console.log(unidadesOco)


    this.map.on("zoomend", () => {
      const atualZoom = this.map.getZoom()

      if(atualZoom >= 15) {
        this.layer.clearLayers()
        this.ocorrencias.forEach(ocorrencia => {
          this.addPins(ocorrencia)
        })
      } else {
        this.layer.clearLayers()
        unidadesOco.forEach(unidade => {
          this.createCircle(unidade)
        })
      }
    })

  }

  addPins(ocorrencia: ocorrenciaBody) {

    const pin = L.icon({
      iconUrl: "../../assets/pin1.svg",
      iconSize: [30,30]
    })

    const marcador = L.marker([ocorrencia.latitude, ocorrencia.longitude], {
      icon: pin
    })

    this.layer.addLayer(marcador)

  }

  configMap(): void {
    this.map = L.map('map', {
      center: [-8.0584933, -34.8848193],
      zoom: 13
    })

    let teste = L.divIcon({
      className: 'numero',
      html: '<div class="circulo bg-red-500 flex justify-center items-center w-7 h-7 rounded-full bg-opacity-50 border-2 border-red-900"><span>1</span></div>',
      iconSize: [30,30]
    })

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map)
  }

}
