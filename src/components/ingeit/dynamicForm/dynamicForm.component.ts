import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ingeit-dynamic-form',
  templateUrl: './dynamicForm.component.html',
  styleUrls: ['./dynamicForm.component.css']
})
export class IngeitFormComponent implements OnInit {
  formBuilder: any;
  @Input() metaData: any;
  constructor() { }

  ngOnInit() {
    this.formBuilder = this.metaData;
  }
}
