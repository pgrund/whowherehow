import "rxjs/add/observable/of";
import "rxjs/add/observable/throw";
import { EffectsRunner, EffectsTestingModule } from "@ngrx/effects/testing";
import { fakeAsync, TestBed, tick } from "@angular/core/testing";
import { ErrorEffects } from "../effects/error.effects";
import { ErrorService } from "../services/error.service";
import { Observable } from "rxjs/Observable";

describe('ErrorEffects', () => {
  let runner, errorEffects, errorService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      ErrorEffects,
      {
        provide: ErrorService,
        useValue: jasmine.createSpyObj('errorService', ['get'])
      }
    ]
  }));

  beforeEach(() => {
    runner = TestBed.get(EffectsRunner);
    errorEffects = TestBed.get(ErrorEffects);
    errorService = TestBed.get(ErrorService);
  });

  describe('error$', () => {

    it('should return a LOAD_SUCCESS action, on success', function () {

    });

    it('should return a LOAD_FAIL action, on error', function () {

    });

  });

});