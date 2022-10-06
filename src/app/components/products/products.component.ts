import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Unsubscribe } from 'firebase/app-check';
import { Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductService } from 'src/app/services/product.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit , OnDestroy {
product$:any[]=[];
Filterproduct$:any[]=[];
category:any='';
carte:any
subscription:Subscription
  constructor(
    private productserv:ProductService,
    private categorserv:CategoriesService,
    private route:ActivatedRoute,
    private cartserv:ShoppingCartService
    ) {

      this.subscription= this.productserv.getproducts()
    .subscribe(products=>{
      this.product$=products
      //read to value of query string
     this.route.queryParamMap.subscribe(parms=>{
      this.category = parms.get('category')
      this.Filterproduct$ = (this.category) ?
      this.product$.filter(p => p.payload.val().category === this.category ) :
      this.product$;
     })
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  async ngOnInit(): Promise<void> {
   (await (this.cartserv.getcart())).valueChanges().subscribe(cart=>{
       this.carte=cart
      

   })
  }

}
