import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// @angular/flex-layout
import { FlexLayoutModule } from "@angular/flex-layout";

// @angular/material
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatMenuModule
} from "@angular/material";

import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  // {
  //   path: 'users',
  //   loadChildren: 'app/users/users.module#UsersModule'
  // },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [LoginComponent],
  exports: [RouterModule]
})
export class AppRoutingModule { }
