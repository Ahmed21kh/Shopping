import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import 'rxjs-compat/add/operator/map'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shopping-project';

  constructor(
    private userserv:UserService,
    private authserv:AuthService,
    private route:ActivatedRoute,
    private router:Router
  ){
    this.authserv.user$.subscribe(user=>{
      if(user){
        this.userserv.save(user);
        let returnUrl:any = this.route.snapshot.queryParamMap.get('returnUrl');

         router.navigateByUrl(returnUrl);
      }
    })
  }
  onActivate(event:any) {
    window.scroll(0,0);

}
}
