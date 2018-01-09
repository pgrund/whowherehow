import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from '@angular/router';

import { PlayerListComponent } from './player-list/player-list.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';

import { MatIconModule, MatChipsModule, MatInputModule, MatTableModule } from "@angular/material";

// guards
import * as fromGuards from '@app/guards';

const routes: Routes = [
  {
    path: '',
      redirectTo: 'overview',
      pathMatch: 'prefix'
  },
  {
    path: 'overview',
      component: PlayerListComponent,
  },
  {
    path: ':uid',
    component: PlayerDetailComponent,
  }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatChipsModule,
  ],
  declarations: [
    PlayerListComponent,
    PlayerDetailComponent,
  ],
  providers: [...fromGuards.guards],
  exports: []
})
export class PlayerModule { }
