import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFranchiseeComponent } from './delete-franchisee.component';

describe('DeleteFranchiseeComponent', () => {
  let component: DeleteFranchiseeComponent;
  let fixture: ComponentFixture<DeleteFranchiseeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteFranchiseeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteFranchiseeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
