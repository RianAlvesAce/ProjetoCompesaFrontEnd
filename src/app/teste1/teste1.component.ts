import { Component, OnInit } from '@angular/core';
import JWT from '../utils/JWT';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-teste1',
  standalone: true,
  imports: [NgFor],
  templateUrl: './teste1.component.html',
  styleUrl: './teste1.component.scss'
})
export class Teste1Component {

  userToken: string = '' 
  userName: string | unknown = ''
  userPermission: string[] = []

  constructor(private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem("userToken")
    console.log(token)
    if(token) {
      this.userToken = token
      if(!JWT.verifyValidToken(this.userToken)) {
        alert('Seu Token expirou, faça o login novamente')
        this.router.navigate(['/'])
      } else {
        const decode: any = JWT.decodeToken(this.userToken);
        const userData: any = JSON.parse(decode.body)
         this.userName = userData.Name
         this.userPermission = userData.PermissionList
         console.log(userData)
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

}
