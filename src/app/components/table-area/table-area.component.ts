import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit, AfterViewInit } from '@angular/core';

import ocorrenciaBody from '../../interfaces/ocorrenciaBody';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleInfo, faX } from '@fortawesome/free-solid-svg-icons';
import { InputComponent } from '../input/input.component';
import OcorrenciaService from '../../services/OcorrenciaService';
import { FormsModule } from '@angular/forms';
import OcorrenciaBodySubmit from '../../interfaces/OcorrenciaBodySubmit';
import JWT from '../../utils/JWT';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
@Component({
  selector: 'app-table-area',
  standalone: true,
  imports: [NgFor, FontAwesomeModule, NgIf, InputComponent, NgClass, FormsModule],
  templateUrl: './table-area.component.html',
  styleUrl: './table-area.component.scss'
})
export class TableAreaComponent implements AfterViewInit {
  @Input() ocorrenciaList: ocorrenciaBody[] = []
  
  infoIcon = faCircleInfo
  editIcon = faPenToSquare

  showInfo: boolean = false
  actualInfo!: ocorrenciaBody

  faX = faX
  showForm: boolean = false
  tipoList: {id: number, name: string}[] = []
  unidadeList: {iD_Unidade: number, nome_unidade: string, endereco: string, latitude: number, longitude: number}[] = []

  lat: string = ''
  lon: string = ''

  filterOcorrencia: string = ''
  filterId: string = ''

  endereco: string = ''

  openInfo(id: number) {

    this.actualInfo = this.ocorrenciaList.filter(ocorrencia => ocorrencia.id_Ocorrencia === id)[0]
    this.showInfo = true

  }

  async handleChangeUnidade(event: Event) {
    const select = (event.target as HTMLSelectElement).value

    const result: any = this.unidadeList.filter(unidade => unidade.iD_Unidade == Number(select))[0]

    this.lat = String(result.latitude)
    this.lon = String(result.longitude)
    this.endereco = String(result.endereco)
  }

  async handleEndereco(event: string): Promise<void> {
    const result: {lat: number, lon: number} = await OcorrenciaService.getLatLong(event)
    this.lat = String(result.lat)
    this.lon = String(result.lon)
  }

  handleCleanFilter(): void {
    this.filterOcorrencia = ''
    this.filterId = ''
  }

  async onSubmit(event: SubmitEvent) {
    event.preventDefault()
    const target = event.target

    const body: OcorrenciaBodySubmit = {} as OcorrenciaBodySubmit
    if(target instanceof HTMLFormElement) {
      const form: HTMLFormElement = target
      const formData: FormData = new FormData(form)
      formData.forEach((value, key) => {
        const teste: any = value;
         if(!isNaN(teste) && key != "Comunicado_Sic") {
           body[key] = Number(teste)
          } else {
           body[key] = teste
         }
      })
    }

    const userInfo = JSON.parse(JWT.decodeToken(localStorage.getItem('userToken') as string)['body'] as string)

    const {lat, lon} = await OcorrenciaService.getLatLong(body.Endereco as string)

    body.Aberta = true
    body.ID_Usuario = userInfo.User_Id
    body.Autor_Abertura = userInfo.name
    body.Autor_Ultima_Edicao = userInfo.name
    body.Data_Ultima_Edicao = this.dateFormat()
    body.Data_Criacao = this.dateFormat()
    body.Falta_Energia = true
    body.Has_Parada = false
    body.Latitude = lat
    body.Longitude = lon

    const ocorrencia = new OcorrenciaService(body)

    const response = await ocorrencia.postOcorrencia()
    
    window.location.reload()
  }

  dateFormat() {
    const data: Date = new Date()
    const dia = data.getDate()
    const mes = data.getMonth() + 1

    
    const dataCompleta: string = `${data.getFullYear()}-${dia < 10 ? `0${dia}` : dia}-${mes < 10 ? `0${mes}` : mes}`
    return dataCompleta
  }

  async ngAfterViewInit(): Promise<void> {
    this.dateFormat()
    this.unidadeList = await OcorrenciaService.getUnidades()
    this.tipoList = await OcorrenciaService.getTipos()
  }

  closeForm() {
    this.lat = ''
    this.lon = ''
    this.endereco = ''

    this.showForm = false
  }

  open(event: Event) {
    console.log(event.target)
  }

  openForm() {
    this.showForm = true
  }

  formatDate(data: string) {
    const date: Date = new Date(data);

    const formatedDate = []
    formatedDate.push(
      date.getDate()
        .toString()
        .length == 1 ? 
        `0${date.getDate()}` 
        : date.getDate()
    );

    formatedDate.push(
      (date.getMonth() + 1)
        .toString()
        .length == 1 ? 
        `0${date.getMonth() + 1}` 
        : date.getMonth() + 1
    );
    
    formatedDate.push(date.getFullYear())

    return formatedDate.join('/')
  }
}
