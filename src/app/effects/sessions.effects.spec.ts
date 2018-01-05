import "rxjs/add/observable/of";
import "rxjs/add/observable/throw";
import { EffectsRunner, EffectsTestingModule } from "@ngrx/effects/testing";
import { fakeAsync, TestBed, tick } from "@angular/core/testing";
import { SessionsEffects } from "../effects/sessions.effects";
import { SessionsService } from "../services/sessions.service";
import { Observable } from "rxjs/Observable";

describe('SessionsEffects', () => {
  let runner, sessionsEffects, sessionsService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      SessionsEffects,
      {
        provide: SessionsService,
        useValue: jasmine.createSpyObj('sessionsService', ['get'])
      }
    ]
  }));

  beforeEach(() => {
    runner = TestBed.get(EffectsRunner);
    sessionsEffects = TestBed.get(SessionsEffects);
    sessionsService = TestBed.get(SessionsService);
  });

  describe('sessions$', () => {

    it('should return a LOAD_SUCCESS action, on success', function () {

    });

    it('should return a LOAD_FAIL action, on error', function () {

    });

  });

});