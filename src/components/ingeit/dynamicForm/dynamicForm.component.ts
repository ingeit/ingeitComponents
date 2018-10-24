import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
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
        this.formItems[col.name] = new FormControl(col.value || '', this.addValidation(col));
        col.dataFromServer && this.getDataForField(col);
      })
      .map(() => this.formGroup = new FormGroup(this.formItems))
  }

  addValidation(col): any[] {
    let arrayValidators = [];
    col.required && arrayValidators.push(Validators.required);
    col.type === 'email' && arrayValidators.push(Validators.email);
    col.type === 'autocomplete' && arrayValidators.push(this.autoCompleteValidation(col));
    col.validations && col.validations.max && arrayValidators.push(Validators.max(col.validations.max));
    col.validations && col.validations.min && arrayValidators.push(Validators.min(col.validations.min));
    col.validations && col.validations.minLength && arrayValidators.push(Validators.minLength(col.validations.minLength));
    col.validations && col.validations.maxLength && arrayValidators.push(Validators.maxLength(col.validations.maxLength));
    col.validations && col.validations.pattern && arrayValidators.push(Validators.pattern(col.validations.pattern));
    return arrayValidators;
  }

  autoCompleteValidation(field): ValidatorFn {
    return (control: FormControl): { [key: string]: boolean } | null => {
      if (control.value !== undefined && (isNaN(control.value))) {
        let arrayToCheck = this.dataForFields[field.name].map( c => c[field.dataFromServer.value]);
        if((arrayToCheck.indexOf(control.value) === -1)){
          return { 'autocompleteError': true };
        }
      }
      return null;
    }
  }

  submitForm(): void {
    for (const i in this.formGroup.controls) {
      this.formGroup.controls[i].markAsDirty();
      this.formGroup.controls[i].updateValueAndValidity();
    }
    if (this.formGroup.valid) {
      this.service.postSubmit(this.url, this.formGroup.value).then(res => {
        this.formSuccess.emit(res);
      }).catch(e => this.formError.emit(e));
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
