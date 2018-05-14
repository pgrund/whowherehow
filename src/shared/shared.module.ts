// app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import {
  Routes,
  RouterModule,
  Params,
  RouterStateSnapshot
} from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { TruncateModule } from 'ng2-truncate';

// @angular/flex-layout
import { FlexLayoutModule } from '@angular/flex-layout';

// @angular/material
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatTableModule,
  MatExpansionModule,
  MatListModule,
  MatSelectModule,
  MatSnackBarModule,
  MatCheckboxModule,
  MatStepperModule,
  MatChipsModule,
  MatTabsModule,
  MatGridListModule,
  MatToolbarModule
} from '@angular/material';

import * as fromComponents from './components';
import * as fromContainers from './containers';

export const modules = [];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatTableModule,
    MatToolbarModule,
    MatExpansionModule,
    MatListModule,
    MatSnackBarModule,
    MatSelectModule,
    MatStepperModule,
    MatChipsModule,
    MatTabsModule,
    MatGridListModule,
    ReactiveFormsModule,
    TruncateModule,
    TranslateModule,
    HttpClientModule,
    RouterModule
  ],
  declarations: [...fromContainers.containers, ...fromComponents.components],
  entryComponents: [...fromComponents.entryComponents],
  exports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatTableModule,
    MatToolbarModule,
    MatExpansionModule,
    MatListModule,
    MatSnackBarModule,
    MatSelectModule,
    MatStepperModule,
    MatChipsModule,
    MatTabsModule,
    MatGridListModule,
    ReactiveFormsModule,
    TruncateModule,
    TranslateModule,
    HttpClientModule,
    RouterModule,
    ...fromComponents.components,
    ...fromContainers.containers
  ]
})
export class SharedModule {}
