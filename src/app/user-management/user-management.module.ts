import { NgModule ,NO_ERRORS_SCHEMA } from '@angular/core';

import {MDBBootstrapModule} from 'angular-bootstrap-md';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import {RouterModule} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UserManageComponent } from './user-manage/user-manage.component';
import { UsersTodoListComponent } from '../crud-to-dolist/users-todo-list/users-todo-list.component';
import { CrudListComponent } from '../crud-to-dolist/crud-list/crud-list.component';

@NgModule({
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    ToastrModule,
    RouterModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forChild([
      {path:'getUserManage',component:UserManageComponent},
      {path:'GetToDoList/:userId',component:UsersTodoListComponent},
      {path:'crudToDoList',component:CrudListComponent},
      
 
      ])
  ],
  declarations: [UserManageComponent]
})
export class UserManagementModule { }
