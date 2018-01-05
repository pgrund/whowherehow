import "rxjs/add/observable/of";
import "rxjs/add/observable/throw";
import { EffectsRunner, EffectsTestingModule } from "@ngrx/effects/testing";
import { fakeAsync, TestBed, tick } from "@angular/core/testing";
import { PlayerEffects } from "../effects/player.effects";
import { PlayerService } from "../services/player.service";
import { Observable } from "rxjs/Observable";

describe('PlayerEffects', () => {
  let runner, playerEffects, playerService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      PlayerEffects,
      {
        provide: PlayerService,
        useValue: jasmine.createSpyObj('playerService', ['get'])
      }
    ]
  }));

  beforeEach(() => {
    runner = TestBed.get(EffectsRunner);
    playerEffects = TestBed.get(PlayerEffects);
    playerService = TestBed.get(PlayerService);
  });

  describe('player$', () => {

    it('should return a LOAD_SUCCESS action, on success', function () {

    });

    it('should return a LOAD_FAIL action, on error', function () {

    });

  });

});