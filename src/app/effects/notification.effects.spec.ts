import "rxjs/add/observable/of";
import "rxjs/add/observable/throw";
import { EffectsRunner, EffectsTestingModule } from "@ngrx/effects/testing";
import { fakeAsync, TestBed, tick } from "@angular/core/testing";
import { NotificationEffects } from "../effects/notification.effects";
import { Observable } from "rxjs/Observable";

describe('NotificationEffects', () => {
  let runner, errorEffects, errorService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      EffectsTestingModule
    ],
    providers: [
      NotificationEffects,
    ]
  }));

  beforeEach(() => {
    runner = TestBed.get(EffectsRunner);
    errorEffects = TestBed.get(NotificationEffects);
  });

  describe('error$', () => {

    it('should return a LOAD_SUCCESS action, on success', function () {

    });

    it('should return a LOAD_FAIL action, on error', function () {

    });

  });

});
