import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { Customer } from '../login/customer';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { CheckEmail } from '../utility/checkEmail';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupemp:FormGroup;
  invalidName:string[]=["deep","meet"];
  matchingpass:string;
  constructor(private _send:Router,private _data:LoginService) { }

  ngOnInit() {
    this.signupemp=new FormGroup({
      emp_email:new FormControl(null,[Validators.required,Validators.email],CheckEmail.emailcheck(this._data)),
      emp_name:new FormControl(null,[Validators.required,this.NameValid.bind(this)]),
      email_group:new FormGroup({
        emp_pass:new FormControl(null,Validators.required),
        emp_cnfmpass:new FormControl(null,[Validators.required])
      },[this.MatchPass.bind(this)]),
      emp_mobile:new FormControl(),
      emp_city:new FormControl('ahmedabad'),
      emp_gender:new FormControl('male'),
      emp_pincode:new FormControl(),
      emp_notification:new FormControl('email')
    });
    this.signupemp.get('emp_notification').valueChanges.subscribe(
      x=>this.setNotification(x)
    );
  }
  setNotification(value:string)
  {
    const phonecontrol=this.signupemp.get('emp_mobile');
    if(value=='phone')
    {
      phonecontrol.setValidators(Validators.required);
    }
    else
    {
      phonecontrol.clearValidators();
    }
    phonecontrol.updateValueAndValidity();
  }
  NameValid(x:AbstractControl):{[y:string]:boolean}
  {
    if(this.invalidName.indexOf(x.value)!=-1)
    {
      return {'invalidName':true};
    }
    return null;
  }
  MatchPass(x:AbstractControl):{[y:string]:boolean}
  {
    const pass=x.get('emp_pass');
    const cnfmpass=x.get('emp_cnfmpass');

    if(pass.value === cnfmpass.value)
    {
      return null;
    }
    return {'matchingpass':true};
  }


  onSubmitForm()
  {
    console.log(this.signupemp);
  }
  onBack(){
    this._send.navigate(['']);
  }
}
