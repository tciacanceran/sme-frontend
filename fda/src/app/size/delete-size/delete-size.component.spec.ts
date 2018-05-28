import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSizeComponent } from './delete-size.component';

describe('DeleteSizeComponent', () => {
  let component: DeleteSizeComponent;
  let fixture: ComponentFixture<DeleteSizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteSizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
