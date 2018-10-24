import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() clearForm: boolean = false;
  @Input() submitText: string = 'Enviar';
  @Input() url: string;
  @Output() formSuccess = new EventEmitter();
  @Output() formError = new EventEmitter();

  constructor(public service: DynamicService) { }

  ngOnInit() {
    if (!this.hasOwnProperty('metaData')) throw new Error("Attribute 'metaData' is required");
    if (!this.hasOwnProperty('url')) throw new Error("Attribute 'url' is required");

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

  submitForm(): void {
    for (const i in this.formGroup.controls) {
      this.formGroup.controls[i].markAsDirty();
      this.formGroup.controls[i].updateValueAndValidity();
    }
    if (this.formGroup.valid) {
      this.service.postSubmit(this.url,this.formGroup.value).then( res => {
        this.formSuccess.emit(res);
      }).catch( e => this.formError.emit(e));
    }
  }

  resetForm(): void {
    this.formGroup.reset();
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
    this.service.getDataForField(field.dataFromServer.url).then(res => {
      let fieldNameSearch = field.name + 'Search';
      this.dataForFields[field.name] = res;
      this.dataForFields[fieldNameSearch] = res;
    })
  }

  onInput(value: string, field): void {
    let fieldNameSearch = field.name + 'Search';
    this.dataForFields[fieldNameSearch] = this.dataForFields[field.name]
      .filter(option => option[field.dataFromServer.value].toLowerCase().indexOf(value.toLowerCase()) === 0);
  }
}
