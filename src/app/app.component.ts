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
  // type {email,password,input,date,rangedate,textarea,select,autocomplete},
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
        type: 'autocomplete',
        required: true,
        dataFromServer:{
          url: 'https://jsonplaceholder.typicode.com/users',
          key: 'id',
          value: 'name'
        }
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
        name: 'select',
        type: 'select',
        required: true,
        dataFromServer:{
          url: 'https://jsonplaceholder.typicode.com/users',
          key: 'id',
          value: 'name'
        }
      }],
    ];
  }
}
