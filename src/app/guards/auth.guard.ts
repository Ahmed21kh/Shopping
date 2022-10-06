import { Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService:AuthService , private router:Router,public afAuth:AngularFireAuth){}
  canActivate(router: any , state:RouterStateSnapshot){

    return this.authService.user$.pipe(map(
      user=>{
        if(user){return true;}
        else {
          this.router.navigate(['login'] , { queryParams:{returnUrl :state.url}});
          return false;
        }
      }
    ))
  }

}
