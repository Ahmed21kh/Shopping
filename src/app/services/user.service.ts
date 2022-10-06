import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import firebase from 'firebase/compat/app';
import { AuthService } from './auth.service';
import 'rxjs-compat/add/observable/of';
import 'rxjs-compat/add/operator/switchMap'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserInfo } from '../models/user-info';


@Injectable({
  providedIn: 'root',
})
export class UserService {

  User:AngularFireObject<UserInfo>
  constructor(private db: AngularFireDatabase , private authserv: AuthService , private afAth:AngularFireAuth) {}
  save(user: firebase.User) {
    this.db
      .object('/users/' + user.uid)
      .update({ name: user.displayName, email: user.email });
  }

    getUser(uid: string) {
    this.User = this.db.object('/users/'+uid) as AngularFireObject<UserInfo>;
    return this.User.valueChanges()
  }

}
