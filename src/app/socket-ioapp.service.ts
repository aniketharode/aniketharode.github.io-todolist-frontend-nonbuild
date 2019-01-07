import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { ToastrService } from 'ngx-toastr';
import { ServiceAppService } from './service-app.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SocketIoappService {

  //baseurl='http://localhost:3000';
 baseurl='http://api.webcloud360.com';

 // private socket = io('http://api.webcloud360.com');
 //private socket = io('http://localhost:3000');

 private socket;

 constructor(public http: HttpClient) { 
   // connection is being created.
   // that handshake
   this.socket = io(this.baseurl);
 }

 //event to be listened

 public verifyUser = () => {

   return Observable.create((observer) => {

     this.socket.on('verifyUser', (data) => {

       observer.next(data);

     }); // end Socket

   }); // end Observable

 } // end verifyUser


 public authError = () => {

  return Observable.create((observer) => {

    this.socket.on('auth-error', (data) => {

      observer.next(data);

    }); // end Socket

  }); // end Observable

} // end verifyUser


public recieveRequest = (userId) => {

  return Observable.create((observer) => {
    
    this.socket.on(userId, (data) => {

      console.log("recived friend request now in observable"+data);
      observer.next(data);
      

    }); // end Socket

  }); // end Observable

} // end chatByUserId





 //send request

 public sendRequest = (userId,details,senderId) => {

  this.socket.emit("send-request", {"recieverId":userId,
                                     "senderDetails":details,
                                      "senderId":senderId});
  //this.onlineUserList();

} // end setUser


public sendAcceptRequest = (senderId,senderdetails,recieverId,recieverDetail) => {

  this.socket.emit("send-accept-request", {"recieverId":recieverId,
                                     "senderDetail":senderdetails,
                                      "senderId":senderId,
                                       "recieverDetail":recieverDetail});
  //this.onlineUserList();

} // end setUser






 public onlineUserList = () => {

   return Observable.create((observer) => {

    console.log("inside the online user list");
     this.socket.on("online-user-list", (userList) => {

       observer.next(userList);

     }); // end Socket

   }); // end Observable

 } // end onlineUserList






 public disconnectedSocket = () => {

   return Observable.create((observer) => {

     this.socket.on("disconnect", () => {

       observer.next();

     }); // end Socket

   }); // end Observable



 } // end disconnectSocket

 // end events to be listened

 // events to be emitted

 public setUser = (authToken) => {

   this.socket.emit("set-user", authToken);
   //this.onlineUserList();

 } // end setUser





 public exitSocket = () =>{


  this.socket.disconnect();


}// end exit socket


}