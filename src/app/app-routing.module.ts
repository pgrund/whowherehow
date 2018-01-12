import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// angular material
import { MatIconModule, MatChipsModule, MatInputModule, MatTableModule, MatButtonModule } from "@angular/material";

// guards
import * as fromGuards from '@app/guards';

import { LoginComponent } from '@app/login/login.component';

// import { PlayerModule } from '@app/player/player.module';
// import { HyperLinksComponent } from '@app/hyper-links/hyper-links.component';
import { PlayerListComponent } from '@app/player/player-list/player-list.component';
import { PlayerDetailComponent } from '@app/player/player-detail/player-detail.component';
import { SessionListComponent } from '@app/session/session-list/session-list.component';
import { SessionDetailComponent } from '@app/session/session-detail/session-detail.component';
import { SessionNewComponent } from './session/session-new/session-new.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'chat',
    component: ChatComponent
  },
  {
    path: 'players',
    // loadChildren: 'app/player/player.module#PlayerModule',
    // canLoad: [fromGuards.AuthGuard],
    canActivateChild: [ fromGuards.AuthGuard, fromGuards.PlayersGuard ],
    children: [
      {
        path: "",
        component: PlayerListComponent,
      },
      {
        path: ":uid",
        component: PlayerDetailComponent,
      },
    ]
  },
  {
    path: "sessions",
    canActivateChild: [ fromGuards.AuthGuard, fromGuards.SessionsGuard ],
    children: [
      {
        path:"",
        component: SessionListComponent,
      },
      {
        path: ":sid",
        component: SessionDetailComponent,
        canActivate: [ fromGuards.PlayersGuard ]
      }
    ]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatChipsModule,
    MatButtonModule
  ],
  providers: [ ...fromGuards.guards ],
  declarations: [
    PlayerListComponent,
    PlayerDetailComponent,
    SessionListComponent,
    SessionDetailComponent,
    SessionNewComponent,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
