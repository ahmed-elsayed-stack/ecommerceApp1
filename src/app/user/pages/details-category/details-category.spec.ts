import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCategory } from './details-category';

describe('DetailsCategory', () => {
  let component: DetailsCategory;
  let fixture: ComponentFixture<DetailsCategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsCategory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsCategory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
