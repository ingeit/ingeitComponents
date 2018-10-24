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
  //
  // this object is required if the field is autocomplete or option
  // dataFromServer:{
  //   url: 'https://jsonplaceholder.typicode.com/users',
  //   key: 'id', // real value, that go to backend
  //   value: 'name' //value to show in the view
  // }
  // validations:{
  //    min
  //    max
  //    minLength
  //    maxLength
  //    pattern
  // }

  constructor() {
    this.forms = [
      [{
        name: 'email',
        type: 'email',
        required: true,
      }, {
        name: 'userId',
        type: 'password',
        tooltip: 'Tiene que tener 8 digitos',
        required: true
      }],
      [{
        name: 'title',
        type: 'autocomplete',
        required: true,
        dataFromServer:{
          url: 'https://jsonplaceholder.typicode.com/users',
          key: 'id',
          value: 'name'
        }
      }],
      [{
        name: 'body',
        type: 'input',
        width: 8,
      }, {
        name: 'date',
        type: 'date',
      }],
      [{
        name: 'range_date',
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

  formSuccess(res){
    console.log(res)
  }

  formError(err){
    console.log(err)
  }

}
