import { Component } from '@angular/core';
import { IngeitFormComponent } from './ingeit-form/ingeit-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  forms: any;

  constructor() {
    this.forms = [
      [{
        name: 'Email',
        type: 'email'
      }, {
        name: 'Password',
        type: 'password'
      }],
      [{
        name: 'Nombre',
        type: 'input'
      }]
    ];
  }
}
