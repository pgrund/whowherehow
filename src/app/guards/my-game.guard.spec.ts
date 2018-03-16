import { TestBed, async, inject } from '@angular/core/testing';

import { MyGameGuard } from './my-game.guard';

describe('MyGameGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyGameGuard]
    });
  });

  it('should ...', inject([MyGameGuard], (guard: MyGameGuard) => {
    expect(guard).toBeTruthy();
  }));
});
