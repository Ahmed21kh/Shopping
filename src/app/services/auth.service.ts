import { Injectable } from '@angular/core';
import {
  signInWithEmailAndPassword,
  Auth,
  authState,
  createUserWithEmailAndPassword,
  updateProfile,
} from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { of } from 'rxjs';
import { from,  Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import { UserInfo } from '../models/user-info';
import { UserService } from './user.service';
import 'rxjs-compat/add/observable/of';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn: boolean = false;
  currentUser$ = authState(this.afAuth);
  user$!: Observable<firebase.User | any>;

  constructor(
    public afAuth: Auth,
    private ath: AngularFireAuth,
    private userserv: UserService,
    private db: AngularFireDatabase,
    private route: ActivatedRoute,
  ) {
    this.user$ = ath.authState;
  }
  login(email: any, password: any) {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    return from(signInWithEmailAndPassword(this.afAuth, email, password));
  }
  async AuthLogin(provider: firebase.auth.AuthProvider) {
    try {
      const result = await this.ath.signInWithRedirect(provider);
      console.log(result, 'You have been successfully logged in!');
    } catch (error) {
      console.log(error);
    }
  }

  logout() {
    return from(this.afAuth.signOut());
  }
  signup(name: any, email: any, password: any) {
    return from(
      createUserWithEmailAndPassword(this.afAuth , email , password)
    ).pipe(switchMap(({ user }) => updateProfile(user, { displayName: name })));
  }
  isAuthenticated() {
    return this.isLoggedIn;
  }
  getauth() {
    return this.ath.authState.pipe(map((auth) => auth));
  }
  loginwithgoogle() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    return from(
      this.ath.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    );
  }

  getUser(uid: string) : Observable<any>{
    return this.db.object('/users/'+ uid ).valueChanges();
  }


 get AppUser$(): Observable<UserInfo> {
    return this.user$.pipe(
      switchMap((user) => {
        if (user) {
          return this.getUser(user.uid);
        } else {
          return of(null);
        }
      })
    );
  }
}
