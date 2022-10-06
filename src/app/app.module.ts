import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule , Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsComponent } from './components/products/products.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireDatabaseModule} from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {HotToastModule} from '@ngneat/hot-toast';
import { FormsModule } from '@angular/forms';
import { AngularFireAuth,AngularFireAuthModule } from '@angular/fire/compat/auth';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService } from './services/auth.service';
import { AuthGuard  } from './guards/auth.guard';
import {canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { HomeComponent } from './components/home/home.component';
import { UserService } from './services/user.service';
import { AdminAuthService } from './services/admin-auth.service';
import { AdminAuthtGuardService } from './guards/admin-autht-guard.service';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { ProductsFormComponent } from './components/admin/products-form/products-form.component';
import { CategoriesService } from './services/categories.service';
import { CustomFormsModule } from 'ng2-validation';
import { ProductService } from './services/product.service';
import { DataTablesModule } from "angular-datatables";
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';
import { NgbDropdownToggle } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { ObjectToArrayPipe } from './models/object-array.pipe';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToHome = () => redirectLoggedInTo(['']);
const routes: Routes = [
  {path:'home', component:HomeComponent , canActivate:[AuthGuard]},
  {path:'', component:ProductsComponent , canActivate:[AuthGuard]},
  {path:'*', component:PageNotFoundComponent , canActivate:[AuthGuard]},
  {path:'products', component:ProductsComponent , canActivate:[AuthGuard]},
  {path:'orders', component:MyOrdersComponent , canActivate:[AuthGuard]},
  {path:'check-out', component:CheckOutComponent , canActivate:[AuthGuard]},
  {path:'order-success', component:OrderSuccessComponent , canActivate:[AuthGuard]},
  {path:'admin/orders', component:AdminOrdersComponent ,canActivate:[AuthGuard,AdminAuthtGuardService]},
  {path:'admin/product', component:AdminProductsComponent , canActivate:[AuthGuard,AdminAuthtGuardService]},
  {path:'admin/product/:id', component:AdminProductsComponent , canActivate:[AuthGuard,AdminAuthtGuardService]},
  {path:'admin/products/:id', component:ProductsFormComponent , canActivate:[AuthGuard,AdminAuthtGuardService]},

  {path:'admin/newproduct', component:ProductsFormComponent , canActivate:[AuthGuard,AdminAuthtGuardService]},
  {path:'admin/users', component:AdminUsersComponent , canActivate:[AuthGuard,AdminAuthtGuardService]},
  {path:'shopping-cart', component:ShoppingCartComponent , canActivate:[AuthGuard]},
  {path:'login', component:LoginComponent , ...canActivate(redirectToHome)},
  {path:'signup', component:SignupComponent , ...canActivate(redirectToHome)},
];


export const firebaseconfig =
{
  apiKey: "AIzaSyC0Ei9p7hfCzdP9y2DK1FuOlswKkZmcJOw",
  authDomain: "shopping-cart-8a5ec.firebaseapp.com",
  projectId: "shopping-cart-8a5ec",
  storageBucket: "shopping-cart-8a5ec.appspot.com",
  messagingSenderId: "15620724084",
  appId: "1:15620724084:web:a5f19cef49d97aabe60821",
  measurementId: "G-7D5FLG3ZGK"
}

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    NavbarComponent,
    ShoppingCartComponent,
    LoginComponent,
    SignupComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    HomeComponent,
    AdminUsersComponent,
    ProductsFormComponent,
    ProductCardComponent,
    ProductFilterComponent,
    ObjectToArrayPipe,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    AngularFireModule.initializeApp(firebaseconfig),
    provideFirebaseApp(() => initializeApp(firebaseconfig)),
    provideAuth(() => getAuth()),
    RouterModule.forRoot(routes),
    AngularFireDatabaseModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    HotToastModule.forRoot(),
    MatMenuModule,
    FormsModule,
    AngularFireAuthModule,
    FontAwesomeModule,
    CustomFormsModule,
    DataTablesModule,
    NgbAlertModule,
    NgbPaginationModule,


  ],
  providers: [
    AngularFireAuth,
    AuthService,
    AuthGuard,
    UserService,
    AdminAuthService,
    AdminAuthtGuardService,
    CategoriesService,
    ProductService ,
    NgbDropdownToggle,
    NgbDropdown,
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'USD'},

    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
