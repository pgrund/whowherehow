import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducer, effects } from './store';
import { SharedModule } from '@shared/shared.module';

// components
import * as fromComponents from './components';

// containers
import * as fromContainers from './containers';

// guards
import * as fromGuards from './guards';

// services
// import * as fromServices from "./services";

export const ROUTES = [
  {
    path: '',
    component: fromContainers.LoginComponent
  }
];

@NgModule({
  declarations: [...fromContainers.containers, ...fromComponents.components],
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature('auth', reducer),
    EffectsModule.forFeature(effects)
  ],
  providers: [...fromGuards.guards],
  exports: [...fromContainers.containers, ...fromComponents.components]
})
export class AuthModule {}
