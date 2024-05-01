import { Component, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import UserService from '../services/UserService';
import { Router } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from "@fortawesome/free-regular-svg-icons"
import { faUnlockKeyhole } from '@fortawesome/free-solid-svg-icons';
import { InputBoxComponent } from '../components/input-box/input-box.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, NgClass, NgIf, FontAwesomeModule, InputBoxComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  idValue: string = ''
  passValue: string = ''
  errorMsg: string = 'teste aqui'
  showAlertCard: boolean = false
  faUser = faUser
  faLock = faUnlockKeyhole

  constructor(private router: Router, private elementRef: ElementRef) {

  }

  verify(): boolean {
    if(!this.idValue || !this.passValue) {
      return false
    } 
    return true
  }

  getIdValue(event: string) {
    this.idValue = event
  }

  getPassValue(event: string) {
    this.passValue = event
  }

  async onSubmit(e: Event) {
    e.preventDefault();    

    if(this.idValue || this.passValue) {
      const result: any = await UserService.login(this.idValue, this.passValue)

      if(result.status === 200) {
        this.router.navigate(['/teste1'])
        localStorage.setItem('userToken', result.token)
      } else {
        this.errorMsg = result.msg
        this.showAlertCard = true
      }
    } else {
      this.errorMsg = "Todos os dados devem ser preenchidos!"
      this.showAlertCard = true
    }
    
  }
}
