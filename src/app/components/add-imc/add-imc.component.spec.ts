import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImcComponent } from './add-imc.component';

describe('AddImcComponent', () => {
  let component: AddImcComponent;
  let fixture: ComponentFixture<AddImcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddImcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddImcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
