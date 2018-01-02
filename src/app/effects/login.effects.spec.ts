import { TestBed, inject } from '@angular/core/testing';

import { LoginEffects } from './login.effects';

describe('LoginEffects', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginEffects]
    });
  });

  it('should be created', inject([LoginEffects], (service: LoginEffects) => {
    expect(service).toBeTruthy();
  }));
});
