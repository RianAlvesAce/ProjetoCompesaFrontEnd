import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { faEye, faEyeSlash, faUser } from "@fortawesome/free-regular-svg-icons"
import { faUnlockKeyhole } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-input-box',
  standalone: true,
  imports: [FormsModule, NgIf, FontAwesomeModule],
  templateUrl: './input-box.component.html',
  styleUrl: './input-box.component.scss'
})
export class InputBoxComponent {
  value: string = ''
  @Input() title: string = ''
  @Input() placeholder: string = ''
  @Input() name: string = ''
  @Input() type: string = ''

  faUserIcon = faUser
  faLock = faUnlockKeyhole
  faEyeIcon = faEye
  faEyeSlashIcon = faEyeSlash

  showPass: boolean = true


  @ViewChild('PassInput') tagInput!: ElementRef<HTMLInputElement>;

  @Output() inputEvent: EventEmitter<string> = new EventEmitter<string>()

  eventEmitter() {
    this.inputEvent.emit(this.value)
  }

  toggleShowPass() {
    if(this.tagInput) {
      this.showPass = !this.showPass
      this.tagInput.nativeElement.type = this.showPass ? "password" : "text"
    }
  }
}
