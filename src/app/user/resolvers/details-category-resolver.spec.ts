import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { detailsCategoryResolver } from './details-category-resolver';

describe('detailsCategoryResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => detailsCategoryResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
