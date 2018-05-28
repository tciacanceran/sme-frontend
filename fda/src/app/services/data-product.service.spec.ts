import { TestBed, inject } from '@angular/core/testing';

import { DataProductService } from './data-product.service';

describe('DataProductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataProductService]
    });
  });

  it('should be created', inject([DataProductService], (service: DataProductService) => {
    expect(service).toBeTruthy();
  }));
});
