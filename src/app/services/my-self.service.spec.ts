import { TestBed, inject } from '@angular/core/testing';

import { MySelfService } from './my-self.service';

describe('MySelfService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MySelfService]
    });
  });

  it('should be created', inject([MySelfService], (service: MySelfService) => {
    expect(service).toBeTruthy();
  }));
});
