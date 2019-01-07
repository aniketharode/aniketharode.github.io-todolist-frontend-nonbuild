import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { ServiceAppService } from '../../service-app.service';
import { ActivatedRoute,Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private toastr: ToastrService,private service:ServiceAppService,private router:Router) { }

  ngOnInit() {
    let userId = Cookie.get("userId");
    
    
    this.service.logout(userId).subscribe(
      (apiResponse) => {
        if(apiResponse.status==200){

          Cookie.delete('authtoken');
          Cookie.delete('userId');
              Cookie.delete('email');
              Cookie.delete('details');
         // window.location.reload();
          this.router.navigate(['/login']);
        }
        else{
          console.log("error in logout as status is not 200");
        }
        
    },

    (error) => {
      console.log("error in logout ");
    }
  
  
  )
  }

}
