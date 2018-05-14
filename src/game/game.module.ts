import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@shared/shared.module';

import { reducers, effects } from './store';

import * as fromAdminGuards from '@administration/guards';
// components
import * as fromComponents from './components';

// containers
import * as fromContainers from './containers';

// guards
// import * as fromGuards from "./guards";

// services
// import * as fromServices from "./services";

// routes
export const ROUTES: Routes = [
  {
    path: '',
    component: fromContainers.OverviewComponent,
    canActivate: [fromAdminGuards.PlayersGuard, fromAdminGuards.SessionsGuard]
  }
];

@NgModule({
  declarations: [...fromContainers.containers, ...fromComponents.components],
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature('game', reducers),
    EffectsModule.forFeature(effects)
  ],
  //   entryComponents: [...fromComponents.entryComponents],
  providers: [...fromAdminGuards.guards],
  exports: [...fromContainers.containers, ...fromComponents.components]
})
export class GameModule {}
