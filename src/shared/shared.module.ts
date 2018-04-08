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

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { TruncateModule } from 'ng2-truncate';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
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
