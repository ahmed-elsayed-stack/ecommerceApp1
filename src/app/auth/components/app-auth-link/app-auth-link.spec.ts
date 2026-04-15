import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAuthLink } from './app-auth-link';

describe('AppAuthLink', () => {
  let component: AppAuthLink;
  let fixture: ComponentFixture<AppAuthLink>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppAuthLink]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppAuthLink);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
