import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ObservableLoading } from '@ngneat/hot-toast';
import { DataTableDirective } from 'angular-datatables';
import { Observable, Subject, Subscription } from 'rxjs';
import { ShoppingCart } from 'src/app/models/IShoppingCart';
import { IShoppingCartItems } from 'src/app/models/IShoppingCartItems';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit  , OnDestroy{
 cart$:Observable<any>
 cartses:any
 prodId:ShoppingCart
 prod:any
 title:any
 imdex:number
 Subscribe:Subscription;
 shoppingcartCounter=0

 dtOptions: DataTables.Settings = {};
 dtTrigger: Subject<any> = new Subject<void>();

 @ViewChild(DataTableDirective, {static: false})
 datatableElement: DataTableDirective;

 @Input('product') product:any
 @Input('shoppingCart') shoppingCart:any
  constructor(private cartserv:ShoppingCartService) {

  }

 async ngOnInit() {
  this.dtOptions = {
    lengthMenu:[5,10,15,50],
    pagingType: 'full_numbers',
    pageLength: 5,
    // processing:true,
    // lengthChange:true,
    searching:true,
    // dom: 'Bfrtip',

  };
    this.cart$ = await this.cartserv.getcarts()
    this.cartses = await this.cartserv.getcart()


  }

  ngOnDestroy(): void {
    // this.Subscribe.unsubscribe()

   }


}
