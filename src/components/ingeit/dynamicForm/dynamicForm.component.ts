import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DynamicService } from './dynamic.service'
@Component({
  selector: 'app-ingeit-dynamic-form',
  templateUrl: './dynamicForm.component.html',
  styleUrls: ['./dynamicForm.component.css']
})
export class IngeitFormComponent implements OnInit {
  formViewBuilder: any;
  formGroup: any;
  formItems: any = {};
  dataForFields: any = {};

  @Input() metaData: any;
  constructor(public service: DynamicService) { }

  ngOnInit() {
    this.formViewBuilder = this.metaData;
    this.metaData
      .flatMap(row => row)
      .map(col => {
        this.formItems[col.name] = col.required ? new FormControl(col.value || '', Validators.required)
          : new FormControl(col.value || '');
        col.dataFromServer && this.getDataForField(col)
      })
      .map(() => this.formGroup = new FormGroup(this.formItems))
  }

  setWidth(col) {
    let className = 'col';
    if (col.width) className = className + '-' + col.width;
    return className;
  }

  isValid(colName) {
    return this.formGroup.get(colName).dirty && this.formGroup.get(colName).errors;
  }

  getDataForField(field) {
    this.service.getDataForField(field.dataFromServer.url).then( res => {
      let fieldNameSearch = field.name+'Search';
      this.dataForFields[field.name] = res;
      this.dataForFields[fieldNameSearch] = res;
    })
  }

  onInput(value: string,field): void {
    let fieldNameSearch = field.name+'Search';
    this.dataForFields[fieldNameSearch] = this.dataForFields[field.name]
      .filter(option => option[field.dataFromServer.value].toLowerCase().indexOf(value.toLowerCase()) === 0);
  }
}
