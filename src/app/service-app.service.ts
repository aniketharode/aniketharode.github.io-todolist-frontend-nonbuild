import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ServiceAppService {

  


  constructor(private http:HttpClient,private toastr: ToastrService) { }







  signupfunction(data):Observable<any>{
    const param = new HttpParams()
    .set("firstName",data.firstName)
    .set("lastName",data.lastName)
    .set("email",data.email)
    .set("mobileNumber",data.mobileNumber)
    .set("password",data.password)
    //.set("apiKey",data.apiKey);
    //console.log("values : "+param);
   // return this.http.post('http://localhost:3000/api/v1/users/signup',param);
   return this.http.post('http://localhost:3000/api/v1/users/signup',param);
   //return this.http.post('http://localhost:3000/api/v1/users/signup',param);
  }

  signinfunction(data):Observable<any>{
    const param = new HttpParams()
    .set("email",data.email)
    .set("password",data.password)
    //console.log("values : "+param);
    //return this.http.post('http://localhost:3000/api/v1/users/login',param);
   return this.http.post('http://localhost:3000/api/v1/users/login',param);
  }

  forgetPasswordfunction(data):Observable<any>{
    const param = new HttpParams()
    .set("email",data.email)
    //console.log("values : "+param);
   // return this.http.post('http://localhost:3000/api/v1/users/forget',param);
    return this.http.post('http://localhost:3000/api/v1/users/forget',param);
  }

  resetPasswordfunction(data,token):Observable<any>{
    const param = new HttpParams()
    .set("password",data.password)
    .set("confirm",data.confirm)
   // console.log("values : "+param);
  // return this.http.post('http://localhost:3000/api/v1/users/reset/'+token,param);
    return this.http.post('http://localhost:3000/api/v1/users/reset/'+token,param);
  }

  


  getToDoList(userId):Observable<any>{
    //console.log("userId from services : "+userId);
    console.log("from the servce(*************");
   // return this.http.get('http://localhost:3000/api/v1/todolist/view/'+userId);
    return this.http.get('http://localhost:3000/api/v1/todolist/view/'+userId);
  }


  createToDoList(data):Observable<any>{
    const param = new HttpParams()
    .set("email",data.email)
    .set("userId",data.userId)
    .set("todoList",data.todolist)
    .set("editedBy",data.editedBy)
    //.set("apiKey",data.apiKey);
    //console.log("values : "+param);
   //return this.http.post('http://localhost:3000/api/v1/todolist/createList',param);
    return this.http.post('http://localhost:3000/api/v1/todolist/createList',param);
   // return this.http.post('http://localhost:3000/api/v1/users/signup',param);
   //return this.http.post('http://localhost:3000/api/v1/users/signup',param);
  }


  deleteToDoList(data):Observable<any>{
    const param = new HttpParams()
    .set("userId",data.userId)
    .set("childId",data.childId)
    //.set("apiKey",data.apiKey);
    //console.log("values : "+param);
  //return this.http.post('http://localhost:3000/api/v1/todolist/deleteTodoList',param);
    return this.http.post('http://localhost:3000/api/v1/todolist/deleteTodoList',param);
   // return this.http.post('http://localhost:3000/api/v1/users/signup',param);
   //return this.http.post('http://localhost:3000/api/v1/users/signup',param);
  }

  deleteSubToDoList(data):Observable<any>{
    const param = new HttpParams()
    .set("userId",data.userId)
    .set("childId",data.childId)
    .set("todoList",data.todoList);
    //console.log("values : "+param);
  // return this.http.post('http://localhost:3000/api/v1/todolist/removechildList',param);
    return this.http.post('http://localhost:3000/api/v1/todolist/removechildList',param);
   // return this.http.post('http://localhost:3000/api/v1/users/signup',param);
   //return this.http.post('http://localhost:3000/api/v1/users/signup',param);
  }





  getAllUser():Observable<any>{
    //console.log("userId from services : "+userId);
    //return this.http.get('http://localhost:3000/api/v1/users/view/all/');
    return this.http.get('http://localhost:3000/api/v1/users/view/all/');
  }

  getSingleUser(userId):Observable<any>{
    //console.log("userId from services : "+userId);
    //return this.http.get('http://localhost:3000/api/v1/users/getUser/'+userId);
    return this.http.get('http://localhost:3000/api/v1/users/getUser/'+userId);
  }


  checkedToDoList(data):Observable<any>{
    const param = new HttpParams()
    .set("userId",data.userId)
    .set("childId",data.childId)
    .set("check",data.check)
    .set("editedBy",data.editedBy)
    //.set("apiKey",data.apiKey);
    //console.log("values : "+param);
   // return this.http.post('http://localhost:3000/api/v1/todolist/checkedTodoList',param);
  return this.http.post('http://localhost:3000/api/v1/todolist/checkedTodoList',param);
   //return this.http.post('http://localhost:3000/api/v1/users/signup',param);
  }


  subToDoList(data):Observable<any>{
    const param = new HttpParams()
    .set("userId",data.userId)
    .set("childId",data.childId)
    .set("todoList",data.todoList)
    .set("editedBy",data.editedBy)
    //.set("apiKey",data.apiKey);
    //console.log("values : "+param);
  //  return this.http.post('http://localhost:3000/api/v1/todolist/addchildList',param);
    return this.http.post('http://localhost:3000/api/v1/todolist/addchildList',param);
   //return this.http.post('http://localhost:3000/api/v1/users/signup',param);
  }


 
  logout(userId):Observable<any>{
    //console.log("userId from services : "+userId);
   console.log("logout:---"+userId);
    return this.http.get('http://localhost:3000/api/v1/users/logout/'+userId);
  }


/*for the user maange*/


getAllUserManage():Observable<any>{
  //console.log("userId from services : "+userId);
  return this.http.get('http://localhost:3000/api/v1/usermanage/view/all/');
}


friendRequest(data):Observable<any>{
  const param = new HttpParams()
  .set("userId",data.userId)
  .set("senderId",data.senderId)
  .set("detail",data.detail)
  //.set("apiKey",data.apiKey);
  //console.log("values : "+param);
  return this.http.post('http://localhost:3000/api/v1/usermanage/friendRequest',param);
 // return this.http.post('http://localhost:3000/api/v1/users/signup',param);
 //return this.http.post('http://localhost:3000/api/v1/users/signup',param);
}


acceptRequest(data):Observable<any>{
  const param = new HttpParams()
  .set("senderUserId",data.senderUserId)
  .set("senderDetail",data.senderDetail)
  .set("recieverId",data.recieverId)
  .set("recieverDetail",data.recieverDetail)
  //.set("apiKey",data.apiKey);
  //console.log("values : "+param);
  return this.http.post('http://localhost:3000/api/v1/usermanage/acceptRequest',param);
 // return this.http.post('http://localhost:3000/api/v1/users/signup',param);
 //return this.http.post('http://localhost:3000/api/v1/users/signup',param);
}



/*end for the user maange*/




  getUserInfoLocalStorage = () => {
    return JSON.parse(localStorage.getItem('userInfo'));
    }
    
    setUserInfoLocalStorage = (data) => {
      localStorage.setItem('userInfo',JSON.stringify(data));
      }

}
