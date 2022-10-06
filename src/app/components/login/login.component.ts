import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HotToastService } from '@ngneat/hot-toast';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import firebase from 'firebase/compat/app';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide:boolean=true
  signout:boolean=true

loginForm = new FormGroup({
  email: new FormControl('', [Validators.required ,Validators.email]),
  password:new FormControl('',[Validators.required]),
});
  constructor(  public router:Router, public authService:AuthService , private toast:HotToastService , private afAuth:AngularFireAuth) { }

  ngOnInit(): void {
  }
  get email(){
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.get('password');
  }
  mySubmit(){
    if (!this.loginForm.valid){

      return;
    }

    const {email , password} = this.loginForm.value;
    this.authService.login( email ,password).pipe(
      this.toast.observe({
        success:'Logged in successfully',
        loading:'Logging in...',
        error:'email or password is wrong'
      })
    ).subscribe(()=>{


        this.router.navigate([''])

    })



  }

  onClick(){
   ( this.authService.loginwithgoogle()).pipe(
    this.toast.observe({
      success:'Logged in successfully',
      loading:'Logging in...',
      error:({message})=>`${message}`
    })
   ).subscribe(()=>{
    this.router.navigate([''])
   }

   )

  }
}
