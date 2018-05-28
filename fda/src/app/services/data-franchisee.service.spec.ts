import { TestBed, inject } from '@angular/core/testing';

import { DataFranchiseeService } from './data-franchisee.service';

describe('DataFranchiseeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataFranchiseeService]
    });
  });

  it('should be created', inject([DataFranchiseeService], (service: DataFranchiseeService) => {
    expect(service).toBeTruthy();
  }));
});
