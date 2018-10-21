import { Component } from '@angular/core';
import { IngeitFormComponent } from '../components/ingeit/dynamicForm/dynamicForm.component';

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
        name: 'email',
        type: 'email',
        value: null,
        required: true,
      }, {
        name: 'password',
        type: 'password',
        value: null,
        required: true,
      }],
      [{
        name: 'nombre',
        type: 'input',
        value: null,
        required: false,
      }]
    ];
  }
}
