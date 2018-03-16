import { TestBed, async, inject } from '@angular/core/testing';

import { HasGameGuard } from './has-game.guard';

describe('HasGameGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HasGameGuard]
    });
  });

  it('should ...', inject([HasGameGuard], (guard: HasGameGuard) => {
    expect(guard).toBeTruthy();
  }));
});
