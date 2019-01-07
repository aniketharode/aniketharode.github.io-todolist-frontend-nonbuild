import { BrowserModule } from '@angular/platform-browser';
import { NgModule ,NO_ERRORS_SCHEMA } from '@angular/core';

import {MDBBootstrapModule} from 'angular-bootstrap-md';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import {RouterModule} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

import { UsersModule } from './users/users.module';
import { LoginComponent } from './users/login/login.component';

import { AppComponent } from './app.component';
import { ServiceAppService } from './service-app.service';
import { SocketIoappService } from './socket-ioapp.service';
import { Error404Component } from './error/error404/error404.component';
import { ErrorModule } from './error/error.module';
import { CrudToDolistModule } from './crud-to-dolist/crud-to-dolist.module';
import { CrudListComponent } from './crud-to-dolist/crud-list/crud-list.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';
import { UserManageComponent } from './user-management/user-manage/user-manage.component';
import { UserManagementModule } from './user-management/user-management.module';
import { LogoutComponent } from './users/logout/logout.component';
import { UsersTodoListComponent } from './crud-to-dolist/users-todo-list/users-todo-list.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    UsersModule,
    UserManagementModule,
    CrudToDolistModule,
    ErrorModule,
    HttpClientModule,
    ToastrModule,
    RouterModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      {path:'login',component:LoginComponent},
      {path:'',redirectTo:'login',pathMatch:'full'},
      {path:'*',component:LoginComponent},
      {path:'**',component:Error404Component},
      {path:'crudToDoList',component:CrudListComponent},
      {path:'getUserManage',component:UserManageComponent},
      {path:'logout/:userId',component:LogoutComponent},
      {path:'GetToDoList/:userId',component:UsersTodoListComponent},
 
    ])
  ],
  schemas : [NO_ERRORS_SCHEMA],
  providers: [HttpClientModule,HttpClient,ServiceAppService,SocketIoappService],
  bootstrap: [AppComponent],
})
export class AppModule { }
