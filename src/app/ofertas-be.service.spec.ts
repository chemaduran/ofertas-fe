import { TestBed } from '@angular/core/testing';

import { OfertasBeService } from './ofertas-be.service';

describe('OfertasBeService', () => {
  let service: OfertasBeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfertasBeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
