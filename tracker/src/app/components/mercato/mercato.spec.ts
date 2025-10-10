import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mercato } from './mercato';

describe('Mercato', () => {
  let component: Mercato;
  let fixture: ComponentFixture<Mercato>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mercato]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mercato);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
