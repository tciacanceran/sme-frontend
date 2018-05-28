import { TestBed, inject } from '@angular/core/testing';

import { DataSizeService } from './data-size.service';

describe('DataSizeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataSizeService]
    });
  });

  it('should be created', inject([DataSizeService], (service: DataSizeService) => {
    expect(service).toBeTruthy();
  }));
});
