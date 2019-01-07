import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudListComponent } from './crud-list/crud-list.component';



import {MDBBootstrapModule} from 'angular-bootstrap-md';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import {RouterModule} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { LogoutComponent } from '../users/logout/logout.component';
import { UserManageComponent } from '../user-management/user-manage/user-manage.component';
import { UsersModule } from '../users/users.module';
import { Error404Component } from '../error/error404/error404.component';
import { UsersTodoListComponent } from './users-todo-list/users-todo-list.component';


@NgModule({
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    UsersModule,
    ToastrModule,
    RouterModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forChild([
      {path:'crudToDoList',component:CrudListComponent},
      {path:'logout',component:LogoutComponent},
      {path:'404error',component:Error404Component},
      {path:'GetToDoList/:userId',component:UsersTodoListComponent},
      {path:'getUserManage',component:UserManageComponent},
      ])
  ],
  declarations: [CrudListComponent, UsersTodoListComponent],
  providers: [HttpClientModule,HttpClient],
})
export class CrudToDolistModule { }
