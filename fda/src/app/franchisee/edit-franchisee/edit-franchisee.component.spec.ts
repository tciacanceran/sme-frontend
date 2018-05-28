import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFranchiseeComponent } from './edit-franchisee.component';

describe('EditFranchiseeComponent', () => {
  let component: EditFranchiseeComponent;
  let fixture: ComponentFixture<EditFranchiseeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFranchiseeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFranchiseeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
