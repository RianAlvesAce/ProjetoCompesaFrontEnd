import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-box',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input-box.component.html',
  styleUrl: './input-box.component.scss'
})
export class InputBoxComponent {
  value: string = ''
  @Input() title: string = ''
  @Input() placeholder: string = ''
  @Input() name: string = ''

  @Output() inputEvent: EventEmitter<string> = new EventEmitter<string>()

  eventEmitter() {
    this.inputEvent.emit(this.value)
  }
}
