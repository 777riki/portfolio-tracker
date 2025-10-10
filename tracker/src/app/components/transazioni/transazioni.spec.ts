import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Transazioni } from './transazioni';

describe('Transazioni', () => {
  let component: Transazioni;
  let fixture: ComponentFixture<Transazioni>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Transazioni]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Transazioni);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
