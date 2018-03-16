import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import {
  Routes,
  RouterModule,
  Params,
  RouterStateSnapshot
} from "@angular/router";
import { StoreModule, ActionReducerMap, MetaReducer } from "@ngrx/store";
import { storeFreeze } from "ngrx-store-freeze";
import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from "@ngrx/router-store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { environment } from "@env/environment";

//import { ServiceWorkerModule } from '@angular/service-worker';
import { reducers, effects, CustomSerializer } from "./store";

import * as fromAdmin from "@administration/guards";
import * as fromContainers from "./containers";
import * as fromComponents from "./components";
import * as fromServices from "./services";
import * as fromGuards from "./guards";
import { SharedModule } from "@shared/shared.module";

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : [];

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export const ROUTES = [
  {
    path: "login",
    component: fromContainers.LoginComponent
  },
  {
    path: "home",
    component: fromComponents.HomeComponent
  },
  {
    path: "",
    loadChildren: "@administration/administration.module#AdministrationModule",
    canActivate: [fromGuards.AuthGuard],
    data: {
      breadcrumb: "Administration"
    }
  },
  {
    path: "chat",
    component: fromContainers.ChatComponent,
    canActivate: [fromAdmin.PlayersGuard]
  },
  {
    path: "turn",
    loadChildren: "@game/game.module#GameModule",
    canLoadChildren: [fromGuards.AuthGuard]
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "**",
    redirectTo: "home",
    pathMatch: "full"
  }
];

@NgModule({
  declarations: [...fromContainers.containers, ...fromComponents.components],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule,
    environment.production ? [] : StoreDevtoolsModule.instrument(),
    //ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    SharedModule
  ],
  providers: [
    ...fromServices.services,
    ...fromGuards.guards,
    fromAdmin.PlayersGuard,
    { provide: RouterStateSerializer, useClass: CustomSerializer }
  ],
  bootstrap: [fromContainers.AppComponent],
  exports: [...fromContainers.containers, ...fromComponents.components]
})
export class AppModule {}
