import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ServiceAppService } from '../../service-app.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { SocketIoappService } from '../../socket-ioapp.service';


@Component({
  selector: 'app-users-todo-list',
  templateUrl: './users-todo-list.component.html',
  styleUrls: ['./users-todo-list.component.scss']
})
export class UsersTodoListComponent implements OnInit {

  private ToDoList:any = [];
  private childToDoList = [];
  private email:any;
  private userId:any;
  private todolist:any;
  private chilId:any=[];
  private checked:any;
  private details:any;
  private checkList:any = [];
  private checkedChildId:any;
  private messageText:any;
  private Subtext:any;
  private linethrough:Boolean=true;
  static count:any=0;
  private getUserId:any;
  private getEmailId:any;


  constructor(private toastr: ToastrService,private service:ServiceAppService,private router:Router,private activaterouter:ActivatedRoute,private SocketService:SocketIoappService) { 
    this.getUserId = this.activaterouter.snapshot.paramMap.get('userId');
    // this.getEmailId =  this.activaterouter.snapshot.paramMap.get('email'); 
  }
 
 

  ngOnInit() {

    console.log(Cookie.get("userId"));
    this.userId = Cookie.get("userId");
    this.email = Cookie.get("email");
    this.details=Cookie.get("details");


  // window.location.reload();
this.SocketService.exitSocket();
   //console.log("url is "+req.)
console.log("calling the getTodo list-----------")

    this.service.getToDoList(this.getUserId).subscribe(
      (apiResponse)=>{
        if(apiResponse.status == 200){

          // apiResponse.data.todoList.forEach(element => {
          //   console.log(element);
          // });

          console.log("inside the get users");
          apiResponse.data.forEach((element,index) => {
          // console.log("do list child"+element.todoList);
          //console.log("element of child "+element.todoList[1]);
          this.getEmailId = element.email;
          console.log("email is "+this.getEmailId);
         if(element.todoList.length>1){
         for(let i=1;i<element.todoList.length;i++){
          
          //console.log("element of child "+element.todoList.list);

          
          this.childToDoList.push({"list":element.todoList[i].list,
          "childId":element.childId,
          "editedBy":element.todoList[i].editedBy});
         }
        
        }
           

            this.ToDoList.push({"list":element.todoList[0].list,
                                   "check":element.isChecked,
                                   "childId":element.childId,
                                   "editedBy":element.editedBy
                                  });
            this.chilId.push(element.childId);
           this.checkList.push(element.isChecked);
          // console.log(element.isChecked);
          });
       //  console.log("sucess"+apiResponse.data[0].);
         //this.meetingPlanner(apiResponse.data.authToken);
        }
        
        else if(apiResponse.status == 304){
          console.log("no user found");
        }
      },
    
    (error)=>{
      console.log("error from the init eror");
      //console.log(error.errorMessage);
      if(error.status == 400){
        this.toastr.error('Some error occured please check your password \n error status'+error.status, 'Oops!');
      }
      else if(error.status == 404){
        this.toastr.error('Some error occured please check your email id \n error status'+error.status, 'Oops!');
      }
      else{
      this.toastr.error('Some error occured'+error.status, 'Oops!');
     // this.router.navigate(['/'+error.status]);
      }
    })
  }


 newElement(name){
      this.ToDoList.push({"list":name,
                          "check":false,
                          "editedBy":this.details
                          });
      this.todolist = name;
      this.messageText="";
  
      console.log(name);
      let data = {
        email : this.getEmailId,
        userId : this.getUserId,
        todolist: this.todolist,
        editedBy:this.details
      }
      console.log(data);
      this.service.createToDoList(data).subscribe(

        (apiResponse) => {
          if(apiResponse.status==200){
            console.log("success"+apiResponse.data.childId);
          }
          else{
            this.router.navigate(['/404error']);
            console.log("error in apiresponse");
          }

        },

        (error) => {
          this.router.navigate(['/404error']);
          console.log("error");

        }



      )

  }

  
  newSubElement(index,list){
    this.childToDoList.push({"list":"",
                     "childId":list.childId,
                     "editedBy":this.details});
    console.log(list.childId);


}

saveSubNode(name,childId,subindex){
console.log(name+" "+childId);

let data = {
  childId : childId,
  userId : this.getUserId,
  todoList: name,
  editedBy:this.details
}
console.log(data);
this.service.subToDoList(data).subscribe(

  (apiResponse) => {
    if(apiResponse.status==200){
      console.log("success"+apiResponse.data.childId);
    }
    else{
      console.log("error in apiresponse");
    }

  },

  (error) => {
    console.log("error");

  }



)

}




deleteSubEvent(subindex,list,name){
console.log("subindex is"+subindex+" and list"+list.childId+"name is"+list.list);
this.childToDoList.splice(subindex, 1);
//list.todoList.for

let data = {
  "userId":this.getUserId,
  "childId":list.childId,
  "todoList":list.list
}
this.service.deleteSubToDoList(data).subscribe(

(apiResponse) => {
  if(apiResponse.status==200){
     this.toastr.success('successully deleted','Success');
     console.log('successfull deleted');
  }
     else{
      this.toastr.error('response status is not 200','Error');
      console.log('response status error deleted');
     }
},

(error) => {
     this.toastr.error("not able to delete","Error");
     console.log(" error ");
}


)




}






  deleteEvent(index,list) {
    //this.ToDoList.splice(index, 1);
   // this.chilId.splice(index,1);
    // this.chilId.forEach(element => {
    //   console.log("chile id is:-"+element);
    // });
   // this.chilId[index] = this.ToDoList[index];



    console.log("from delete: "+"and "+this.ToDoList.splice(index, 1));
    //console.log("chile "+this.chilId.splice(index,1));

  let data = {
      "userId":this.getUserId,
      "childId":this.chilId.splice(index,1)
    }
    this.service.deleteToDoList(data).subscribe(

    (apiResponse) => {
      if(apiResponse.status==200){
         this.toastr.success('successully deleted','Success');
         console.log('successfull deleted');
      }
         else{
          this.toastr.error('response status is not 200','Error');
          console.log('response status error deleted');
         }
    },

    (error) => {
         this.toastr.error("not able to delete","Error");
         console.log(" error ");
    }


    )

  }


  


  checkValue(event,list,index){
    console.log(event.currentTarget.checked);
    
    this.linethrough=event.currentTarget.checked;

    let data = {
      "userId":this.getUserId,
      "childId":list.childId,
      "check":event.currentTarget.checked,
      "editedBy":this.details
    }

    //console.log(childId)
    this.service.checkedToDoList(data).subscribe(

      (apiResponse) => {
        if(apiResponse.status==200){
           //this.toastr.success('successully checked','Success');
           console.log('successfull checked');
          window.location.reload();
          
        }
           else{
           // this.toastr.error('response status is not 200','Error');
            console.log('response status error deleted');
           }
      },
  
      (error) => {
           this.toastr.error("not able to delete","Error");
           console.log(" error ");
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
  
          //Cookie.delete('receiverName');
  
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
