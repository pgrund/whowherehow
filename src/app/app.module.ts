import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Routes, RouterModule, Params, RouterStateSnapshot } from '@angular/router';
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { StoreRouterConnectingModule, routerReducer, RouterReducerState,
  RouterStateSerializer} from "@ngrx/router-store";
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


import { AppRoutingModule } from './app-routing.module';
// import { UsersModule } from './users/users.module';
import { ServiceWorkerModule } from '@angular/service-worker';

// effects
import { LoginEffects } from "./effects/login.effects";
import { RouterEffects } from "./shared/router.effects";

// guards
import { AuthenticationGuard} from "./shared/authentication.guard";

// reducers
import {reducers} from "./app.reducers";

// services
// import { UserService } from './services/user.service';
import { ChatService } from './services/chat.service';
import { WebSocketService } from './services/web-socket.service';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    // UsersModule,
    StoreRouterConnectingModule,
    StoreModule.forRoot(reducers),
    // StoreModule.forRoot({
    //   config: loginReducer
    // }),
    StoreDevtoolsModule.instrument({
      maxAge: 10 //number of states to retain
    }),
    EffectsModule.forRoot([
      RouterEffects,
      LoginEffects
    ]),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    WebSocketService,
    ChatService,
    AuthenticationGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
