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

  // name,
  // type {email,password,input,date,rangedate,textarea},
  // width?,
  // required?,
  // value?
  // tooltip?

  constructor() {
    this.forms = [
      [{
        name: 'email',
        type: 'email',
        required: true,
      }, {
        name: 'password',
        type: 'password',
        tooltip: 'Tiene que tener 8 digitos',
        required: true
      }],
      [{
        name: 'nombre',
        type: 'input',
        required: true,
      }],
      [{
        name: 'ciudad',
        type: 'input',
        width: 8,
      }, {
        name: 'date',
        type: 'date',
      }],
      [{
        name: 'range date',
        type: 'rangedate',
        required: true,
      },
      {
        name: 'text area',
        type: 'textarea',
        required: true,
      }],
    ];
  }
}
