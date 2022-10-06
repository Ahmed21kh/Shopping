import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  constructor(  private cartserv:ShoppingCartService) { }
  @Input('product') product:any
  @Input('shoppingCart') shoppingCart:any
  ngOnInit(): void {
    this.cartserv.getcart()
  }
  addToCart(){
    this.cartserv.addToCard(this.product)
  }

  getQuantity(){
    if(!this.shoppingCart){return 0;}
    let item =this.shoppingCart.items[this.product.key]
    return item ? item.quantity : 0;
  }
  removefromCart(){
    this.cartserv.removefromCart(this.product)
  }

}
