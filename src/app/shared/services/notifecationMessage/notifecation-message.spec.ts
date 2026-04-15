import { TestBed } from '@angular/core/testing';

import { NotifecationMessage } from './notifecation-message';

describe('NotifecationMessage', () => {
  let service: NotifecationMessage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotifecationMessage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
