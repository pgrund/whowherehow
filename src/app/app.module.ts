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

// @angular/flex-layout
import { FlexLayoutModule } from "@angular/flex-layout";

// @angular/material
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatTableModule
} from "@angular/material";


import { AppRoutingModule } from './app-routing.module';
// import { UsersModule } from './users/users.module';
import { ServiceWorkerModule } from '@angular/service-worker';

// effects
import { RouterEffects } from "@app/effects/router.effects";
import { LoginEffects } from "@app/effects/login.effects";
import { PlayerEffects } from "@app/effects/player.effects";
import { SessionsEffects } from "@app/effects/sessions.effects";

// reducers
import {reducers} from "@app/reducers";

// services
// import { UserService } from './services/user.service';
import { ChatService } from './services/chat.service';
import { WebSocketService } from './services/web-socket.service';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';

import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LoginComponent,
    NavComponent
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
      LoginEffects,
      PlayerEffects,
      SessionsEffects,
    ]),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatTableModule,
    ReactiveFormsModule,
  ],
  providers: [
    WebSocketService,
    ChatService,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
