import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// angular material
import { MatIconModule, MatChipsModule, MatInputModule, MatTableModule } from "@angular/material";

// guards
import * as fromGuards from '@app/guards';

import { LoginComponent } from '@app/login/login.component';

import { InfoModule } from '@app/info/info.module';
import { PlayerListComponent } from '@app/info/player-list/player-list.component';
import { PlayerDetailComponent } from '@app/info/player-detail/player-detail.component';
import { SessionListComponent } from '@app/info/session-list/session-list.component';
import { SessionDetailComponent } from '@app/info/session-detail/session-detail.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'info',
    children: [
      {
        path: "players",
        component: PlayerListComponent,
        canActivate: [ fromGuards.PlayersGuard ]
      },
      {
        path: "players/:uid",
        component: PlayerDetailComponent,
        canActivate: [ fromGuards.PlayersGuard ]
      },
      {
        path: "sessions",
        component: SessionListComponent,
        canActivate: [ fromGuards.SessionsGuard ]
      },
      {
        path: "sessions/:sid",
        component: SessionDetailComponent,
        canActivate: [ fromGuards.SessionsGuard ]
      }
    ],
    canActivateChild: [ fromGuards.AuthGuard ],
    canActivate: [ fromGuards.AuthGuard ]
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
    RouterModule.forRoot(routes),
    InfoModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatChipsModule,
  ],
  providers: [...fromGuards.guards],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
