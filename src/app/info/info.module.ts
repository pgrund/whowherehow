import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';

import { PlayerListComponent } from './player-list/player-list.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { SessionDetailComponent } from './session-detail/session-detail.component';
import { SessionListComponent } from './session-list/session-list.component';

import { MatIconModule, MatChipsModule, MatInputModule, MatTableModule } from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatChipsModule,
  ],
  declarations: [
    PlayerListComponent,
    PlayerDetailComponent,
    SessionDetailComponent,
    SessionListComponent,
  ],
  exports: [
    PlayerListComponent,
    PlayerDetailComponent,
    SessionDetailComponent,
    SessionListComponent,
  ]
})
export class InfoModule { }
