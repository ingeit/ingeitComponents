import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngeitFormComponent } from './ingeit-form.component';

describe('IngeitFormComponent', () => {
  let component: IngeitFormComponent;
  let fixture: ComponentFixture<IngeitFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngeitFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngeitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
