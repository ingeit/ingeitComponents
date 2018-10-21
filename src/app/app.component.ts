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
  // type,
  // width?,
  // required?,
  // value?
  // description?

  constructor() {
    this.forms = [
      [{
        name: 'email',
        type: 'email',
        required: true,
      }, {
        name: 'password',
        type: 'password',
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
        name: 'zip',
        type: 'input',
      }]
    ];
  }
}
