import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [NgIf],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {

  @Input() name: string = ''
  @Input() type: string = ''
  @Input() nameField: string = ''
  @Input() disabled: boolean = false
  @Input() value: string = ''
  @Input() search: boolean = false
  @Input() placeholder: string = ''

  @Output() event: EventEmitter<string> = new EventEmitter<string>()
  
  eventEmitter(event: Event) {
    const result: string = (event.target as HTMLInputElement).value
    this.event.emit(result)
  }

}
