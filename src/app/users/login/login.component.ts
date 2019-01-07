import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { ServiceAppService } from '../../service-app.service';
import { ActivatedRoute,Router } from '@angular/router';

import { Cookie } from 'ng2-cookies/ng2-cookies'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private toastr: ToastrService,private service:ServiceAppService,private router:Router) { }

   email:String;
  private password:any;

  ngOnInit() {
    //this.toastr.warning(`enter the email`);
  }


  signinFunction(){
    console.log("insde the sign in");
    

    if(!this.email){
      this.toastr.warning(`enter the email`);
      console.log("email is empty"+this.email);
    }
    else if(!this.password){
      this.toastr.warning(`enter the password`);
      console.log("passwrd is empty"+this.password);
    }
   

    else{
      let data = {
        email : this.email,
        password : this.password
      }
        this.service.signinfunction(data).subscribe(
          (apiResponse) => {
            if(apiResponse.status == 200){

              Cookie.set('authtoken',apiResponse.data.authToken);
              Cookie.set('userId',apiResponse.data.userDetails.userId);
              Cookie.set('email',apiResponse.data.userDetails.email);
              Cookie.set('details',apiResponse.data.userDetails.firstName+''+apiResponse.data.userDetails.lastName);
               this.service.setUserInfoLocalStorage(apiResponse.data.userDetails);
    
               console.log("ap response"+apiResponse.data.userDetails.firstName);
                this.router.navigate(['/crudToDoList']);
               
              
             //this.meetingPlanner(apiResponse.data.authToken);
            }
            
            else{
              this.toastr.error('Some error occured check wether the server is up or not'+apiResponse.status, 'sorry');
            }
          },

          (error) => {
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
            }

        )
      

    }


  }

  


  goToSignUp(){
    this.router.navigate(['/sign-up']);
  }


}
