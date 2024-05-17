import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit, AfterViewInit } from '@angular/core';

import ocorrenciaBody from '../../interfaces/ocorrenciaBody';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { InputComponent } from '../input/input.component';
@Component({
  selector: 'app-table-area',
  standalone: true,
  imports: [NgFor, FontAwesomeModule, NgIf, InputComponent],
  templateUrl: './table-area.component.html',
  styleUrl: './table-area.component.scss'
})
export class TableAreaComponent implements AfterViewInit {
  @Input() unidadesList: {nome_unidade: string}[] = []
  @Input() ocorrenciaList: ocorrenciaBody[] = []
  faX = faX
  showForm: boolean = false

  onSubmit(event: SubmitEvent) {
    event.preventDefault()
    const target = event.target
    if(target instanceof HTMLFormElement) {
      const form: HTMLFormElement = target
      const formData: FormData = new FormData(form)
      formData.forEach((value, key) => {
         console.log(`${key}: ${value}`);
         
      })
    }
    console.log(event.target)
  }

  ngAfterViewInit(): void {
    console.log("teste")
  }

  closeForm() {
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
