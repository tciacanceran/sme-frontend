import { TestBed, inject } from '@angular/core/testing';

import { DataCategoryService } from './data-category.service';

describe('DataCategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataCategoryService]
    });
  });

  it('should be created', inject([DataCategoryService], (service: DataCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
