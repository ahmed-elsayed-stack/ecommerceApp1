import { TestBed } from '@angular/core/testing';

import { AuthserviceLib } from './authservice-lib';

describe('AuthserviceLib', () => {
  let service: AuthserviceLib;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthserviceLib);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
