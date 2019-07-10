import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { Customer } from './customer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Email_id:string;
  Password:string;

  constructor(private _send:Router,private _data:LoginService) { }

  ngOnInit() {
  }
  onLogin(){
    this._data.CustomerLogin(new Customer(this.Email_id,this.Password)).subscribe(
      (data:Customer[])=>{
          if(data.length>0){
            this._send.navigate(['/home']);
            localStorage.setItem('email',data[0].Email_id);
          }
          else{
            alert("Id and Password doesn't match");
          }
      }
    );
}
onClickup(){
  this._send.navigate(['/signup']);
}
onForget(){
  this._send.navigate(['/forgetpassword'])
}

}
