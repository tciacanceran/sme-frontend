import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFranchiseeComponent } from './add-franchisee.component';

describe('AddFranchiseeComponent', () => {
  let component: AddFranchiseeComponent;
  let fixture: ComponentFixture<AddFranchiseeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFranchiseeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFranchiseeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
