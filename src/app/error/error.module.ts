import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error400Component } from './error400/error400.component';
import { Error403Component } from './error403/error403.component';
import { Error404Component } from './error404/error404.component';
import { Error500Component } from './error500/error500.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [Error400Component, Error403Component, Error404Component, Error500Component]
})
export class ErrorModule { }
