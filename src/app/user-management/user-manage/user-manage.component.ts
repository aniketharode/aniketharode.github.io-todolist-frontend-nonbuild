import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ServiceAppService } from '../../service-app.service';
import { ToastrService } from 'ngx-toastr';
import { Router, NavigationEnd } from '@angular/router';
import { SocketIoappService } from '../../socket-ioapp.service';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss']
})
export class UserManageComponent implements OnInit {


  private allusers:any=[];
  private userList:any=[];
  private userId:any;
  private  details:any;
  private acceptRequest:any = []; //for sending friend request
  private acceptFriendRequest:any = []; //for accepting friend request
  private recieverId:any;
  private acceptSenderDetail:any=[];
  //private apiFriendRequest:any = [];

  constructor(private toastr: ToastrService,private service:ServiceAppService,private router:Router,private SocketService:SocketIoappService) { 
  //   this.router.routeReuseStrategy.shouldReuseRoute = function(){
  //     return false;
  //  }

  
  }

  ngOnInit() {
    

    let authToken = Cookie.get('authtoken');
     this.userId = Cookie.get('userId');
     let email =  Cookie.get('email');
     this.details =  Cookie.get('details');

  //  this.checkStatus();
    
  //document.getElementById("sendrequest3").style.display="none";
  console.log("inside the user-management---------");
  
    this.verifyUserConfirmation(authToken,this.userId);
    
    //this.getAllUsers();
    //this.socketService.onlineUserList();
this.getAllUsers();
this.getSingleUsers();   



  }


  public getAllUsers(){
    this.service.getAllUserManage().subscribe(

      (apiResponse) => {
        if(apiResponse.status==200){
           //this.toastr.success('successully get all users','Success');
          
        

           console.log("users are"+apiResponse.data[0].firstName);
           apiResponse.data.forEach(element => {
             this.allusers.push({"fullname":element.firstName+" "+element.lastName,
                                  "userId":element.userId,
                                  "email":element.email});
             console.log(element.firstName);
            // apiFriendRequest = element.friendRequest;
            
            
           });

           //console.log("friend request list "+ apiFriendRequest);
        }
           else{
            this.toastr.error('response status is not 200','Error');
            console.log('response status error deleted');
           }
      },
      
      (error) => {
           this.toastr.error("not able to get all users","Error");
           console.log(" error ");
      }
      
      
      )

    

  }




  public getSingleUsers(){
    this.service.getSingleUser(this.userId).subscribe(

      (apiResponse) => {
        if(apiResponse.status==200){
           //this.toastr.success('successully get all users','Success');
          
        console.log("get single users"+apiResponse.data.userId);
    
       if(apiResponse.data.friendRequest.length>0){
        apiResponse.data.friendRequest.forEach(element => {
            console.log("friend list is "+element.senderId);
            this.acceptRequest.push(element.senderId);
            this.acceptSenderDetail.push({"senderDetail":element.senderDetail,
                                    "senderId":element.senderId});
           document.getElementById(element.senderId).style.display="none";
            });
          }

          if(apiResponse.data.friendList.length>0){
            apiResponse.data.friendList.forEach(element => {
                console.log("friend list is "+element.friendId);
                this.acceptFriendRequest.push(element.friendId);
                // if(document.getElementById(element.friendId)!=null){
                 document.getElementById(element.friendId).style.display="none";
                // }
                });
              }
        
        }
           else{
            this.toastr.error('response status is not 200','Error');
            console.log('response status error deleted');
           }
      },
      
      (error) => {
           this.toastr.error("not able to get all users","Error");
           console.log(" error ");
      }
      
      
      )

    

  }







//ng if multiple for the online user

public multipleCond(online,user){
  if(online.userId==user.userId && user.userId != this.userId)
  return true;
  else{
    return false;
  }
}


public checkForSendRequest(user,accept){

  
  if(user.userId != this.userId &&  user.userId != accept)
  return true;
  else{
    return false;
  }

}

public acceptRequestandFriendRequest(user,acceptFriend){

  
  if(user != this.userId &&  user != acceptFriend){
  console.log("accept griend"+acceptFriend);
  return true;
  }
  else{
    return false;
  }

}




//end of ng if multiple


public acceptFriend(senderUserId){
console.log("sender userId "+senderUserId+"my details "+this.userId+"and "+this.details);
// let r = this.acceptSenderDetail.filter(element => {
//   return element.senderId;
// })
document.getElementById(senderUserId).style.display="none";

//document.getElementById("accept").style.display="none";

let r = this.acceptSenderDetail.map(element => {
  if(element.senderId==senderUserId)
  return element.senderDetail;
})


console.log("sender details "+r);
this.acceptRequestApi(senderUserId,r,this.userId,this.details);


}



public acceptRequestApi(senderUserId,senderDetail,recieverId,recieverDetail){
  let data = {
    senderUserId:senderUserId,
    senderDetail:senderDetail,
    recieverId:recieverId,
    recieverDetail:recieverDetail
    
  }
 this.service.acceptRequest(data).subscribe(

  (apiResponse) => {
    if(apiResponse.status==200){
      this.SocketService.sendAcceptRequest(senderUserId,senderDetail,recieverId,recieverDetail);
      this.toastr.success("accepted friend request","Success");
     
      setTimeout(" window.location.reload()",5000);
    }
    else{
      this.toastr.error("some problem while accepting request check status code "+apiResponse.status,"Error");
      this.router.navigate(['/404error']);
     
      console.log("error in apiresponse");
    }

  },

  (error) => {
    this.toastr.error("some problem while sendng the request","Error");
    this.router.navigate(['/404error']);
    console.log("error");

  }

 )
}



public verifyUserConfirmation: any = (authToken,userId) => {
  console.log("inside the verify user---------");
    this.SocketService.verifyUser()
      .subscribe((data) => {

        //this.disconnectedSocket = false;
        console.log("user is verified now setting users");
        this.checkStatus();
        this.SocketService.setUser(authToken);
       // this.SocketService.chatByUserId(userId);
       //this.authError();
       this.veryId(userId);
      
       this.getOnlineUserList();
       
       console.log("calling the getonline users");
       

      });
    }

    public checkStatus: any = () => {

      if (Cookie.get('authtoken') === undefined || Cookie.get('authtoken') === '' || Cookie.get('authtoken') === null) {
  
        this.router.navigate(['/']);
        console.log("authToken is un defined");
  
        return false;
  
      } else {
        console.log("authToken is present");
        return true;
  
      }
  
    } // end checkStatus


    public getOnlineUserList :any =()=>{

      console.log("called the online users list");
      this.SocketService.onlineUserList()
        .subscribe((userList) => {
  
          console.log("user list listen");
          this.userList = [];
  
          for (let x in userList) {
    
           // console.log("full name "+x);
            let temp = { 'userId': x, 'fullName': userList[x]};
  
            this.userList.push(temp);          
  
          }
          
          console.log(this.userList);
  
        }); // end online-user-list
  

}



sendrequest(userId){
  this.recieverId=userId;
  document.getElementById(userId).style.display="none";
  console.log("sending the request"+userId+"from "+this.userId);



this.sendRequestApi(userId,this.details,this.userId);


//this.service.friendRequest

}


sendRequestApi = (userId,detail,senderId)=>{
  let data = {
    userId:userId,
    detail:detail,
    senderId:senderId
    
  }
 this.service.friendRequest(data).subscribe(

  (apiResponse) => {
    if(apiResponse.status==200){
      this.SocketService.sendRequest(userId,detail,senderId);
      this.toastr.success("send the friend request","Success");
    }
    else{
      this.toastr.error("some problem while sendng the request check status code "+apiResponse.status,"Error");
      this.router.navigate(['/404error']);
     
      console.log("error in apiresponse");
    }

  },

  (error) => {
    this.toastr.error("some problem while sendng the request","Error");
    this.router.navigate(['/404error']);
    console.log("error");

  }

 )
}




public authError :any =()=>{

  this.SocketService.authError()
    .subscribe((data) => {

      console.log("authError"+data.error);
      },
      (error)=>{

      }
    )
    

}


//listen of the id event
public veryId :any =(userId)=>{

  this.SocketService.recieveRequest(userId)
    .subscribe((data) => {

      //logic of sending the friend request

      if(data.recieverId==null){//logic for accept or send as the friend request have reciever id null

      console.log("successfull recieved the request"+data.senderDetail);
      //this.acceptRequest = [];
      console.log("index of "+this.acceptRequest.indexOf(data.senderId));
      if(this.acceptRequest.indexOf(data.senderId)=== -1){
        
      this.acceptRequest.push(data.senderId);
      this.acceptSenderDetail.push({"senderDetail":data.senderDetail,
                                    "senderId":data.senderId});
        document.getElementById(data.senderId).style.display="none";
      }
      this.toastr.success(`${data.senderDetail}`,"Success");
      console.log("accept request is "+this.acceptRequest);
    }

    //logic of accepting the request
    else{
      console.log("accepted request is listened");
      if(this.acceptFriendRequest.indexOf(data.recieverId)=== -1){
        
        this.acceptFriendRequest.push(data.recieverId);
        document.getElementById(data.recieverId).style.display="none";
        }
      this.toastr.success(`your friend requested is accepted by ${data.recieverDetail}`,"Success");
     
    }
      },
      (error)=>{
        console.log("error while recieving the request ");
      }
    )
    

}



public logout: any = () => {


  this.service.logout(Cookie.get("userId"))
    .subscribe((apiResponse) => {

      if (apiResponse.status === 200) {
        console.log("logout called")
        Cookie.delete('authtoken');
  
          Cookie.delete('userId');

          Cookie.delete('email');

          Cookie.delete('details');

        this.SocketService.exitSocket()

        this.router.navigate(['/']);

      } else {
        this.toastr.error(apiResponse.message)

      } // end condition

    }, (err) => {
      this.toastr.error('some error occured')


    });

} // end logout




   


}
