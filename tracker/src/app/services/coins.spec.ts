import { TestBed } from '@angular/core/testing';

import { Coins } from './coins';

describe('Coins', () => {
  let service: Coins;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Coins);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
