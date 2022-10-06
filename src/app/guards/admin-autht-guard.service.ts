import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {  Observable, of } from 'rxjs';
import { UserService } from '../services/user.service';
import 'rxjs-compat/add/operator/map'
import { AuthService } from '../services/auth.service';
import { map, switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AdminAuthtGuardService implements CanActivate {

  constructor(
    private userserv:UserService,
    private authserv:AuthService
    ) { }
  canActivate():Observable<boolean>{
      //get current user
      return this.authserv.user$.pipe(
      switchMap(user => {
        if(user){
        return  this.userserv.getUser(user.uid)
        }else{
          return of(null)
        }
      }),
      map (appUser => appUser!.isAdmin));
     }
  }

