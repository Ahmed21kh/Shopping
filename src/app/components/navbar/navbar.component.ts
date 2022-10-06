import { Component, OnInit } from '@angular/core';
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AuthService } from '../../services/auth.service';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { UserInfo } from '../../models/user-info';
import { UserService } from 'src/app/services/user.service';
import { map } from 'rxjs';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isCollapsed:boolean=true
 isLogin!:boolean
 isUserlogin:any
 enableRegister!:boolean
 shoppingcartCounter=0
 appUser : UserInfo
isAdmin: boolean

 constructor(
  public authService:AuthService ,
  public router:Router ,
  public ath:Auth ,
  public toast:HotToastService,
  private cartService:ShoppingCartService
    ) {
      authService.AppUser$.subscribe((newappuser:any) => this.appUser = newappuser);
      if(this.isAdmin){
        console.log("Admin");

      }else{
        console.log("user");

      }

     }


   fayoutube =faYoutube
  async ngOnInit() {

    let Cart$ = await this.cartService.getcart();
    Cart$.valueChanges().subscribe((cart:any)=>
      {
        this.shoppingcartCounter=0
        let item:any
        for (item in cart!.items) {
           console.log(cart!.items);

           this.shoppingcartCounter += cart!.items[item].quantity

        }
      })
     // this.authService.getauth().subscribe(auth =>{
    //   if(auth){
    //     this.isLogin=true
    //     this.isUserlogin = auth.email
    //   }else
    //   {
    //     this.isLogin=false
    //   }
    // })

  }
  logout(){
    this.authService.logout().subscribe(()=>{
      this.toast.success('You are logout successfuly',{
        style: {
          border: '1px solid #21b11e',
          padding: '16px',
          color: ' #21b11e',
        },
        iconTheme: {
          primary: ' #21b11e',
          secondary: '#FFFAEE',

        },
      })
      this.router.navigate(['login'])

    })

   }
   collapse(){
     this.isCollapsed = ! this.isCollapsed

}

}
