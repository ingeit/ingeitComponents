import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ingeit-dynamic-form',
  templateUrl: './dynamicForm.component.html',
  styleUrls: ['./dynamicForm.component.css']
})
export class IngeitFormComponent implements OnInit {
  formViewBuilder: any;
  formGroup: any;
  formItems: any = {};

  @Input() metaData: any;
  constructor() { }

  ngOnInit() {
    this.formViewBuilder = this.metaData;
    this.metaData
      .flatMap(row => row)
      .map(col => {
        this.formItems[col.nombre] = col.required ? new FormControl(col.value || '', Validators.required)
        : new FormControl(col.value || '');
      })
      .map( () => this.formGroup = new FormGroup(this.formItems));
  }
}
