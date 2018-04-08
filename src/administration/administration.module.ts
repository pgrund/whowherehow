import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from './store';

// components
import * as fromComponents from './components';

// containers
import * as fromContainers from './containers';

// guards
import * as fromGuards from './guards';
import { SharedModule } from '@shared/shared.module';

// services
// import * as fromServices from "./services";

// routes
export const ROUTES: Routes = [
  {
    path: 'players',
    canActivate: [fromGuards.PlayersGuard],
    canActivateChild: [fromGuards.PlayersGuard],
    children: [
      {
        path: '',
        component: fromContainers.PlayersComponent
      },
      {
        path: ':playerId',
        component: fromContainers.PlayerItemComponent
      }
    ]
  },
  {
    path: 'sessions',
    canActivate: [fromGuards.SessionsGuard],
    canActivateChild: [fromGuards.SessionsGuard],
    children: [
      {
        path: '',
        component: fromContainers.SessionsComponent
      },
      {
        path: ':sessionId',
        component: fromContainers.SessionItemComponent,
        canActivate: [fromGuards.PlayersGuard],
        children: [
          {
            path: 'turn',
            redirectTo: '/turn',
            pathMatch: 'full'
          }
        ]
      }
    ]
  }
];

@NgModule({
  declarations: [...fromContainers.containers, ...fromComponents.components],
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature('admin', reducers),
    EffectsModule.forFeature(effects)
  ],
  entryComponents: [...fromComponents.entryComponents],
  providers: [...fromGuards.guards],
  exports: [...fromContainers.containers, ...fromComponents.components]
})
export class AdministrationModule {}
