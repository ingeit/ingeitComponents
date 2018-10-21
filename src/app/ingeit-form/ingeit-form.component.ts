import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ingeit-form',
  templateUrl: './ingeit-form.component.html',
  styleUrls: ['./ingeit-form.component.css']
})
export class IngeitFormComponent implements OnInit {
  formBuilder: any;
  @Input() metaData: any;
  constructor() { }

  ngOnInit() {
    this.formBuilder = this.metaData;
  }
}
