import { IShoppingCartItems } from "./IShoppingCartItems";


export class ShoppingCart
{
constructor(public items:IShoppingCartItems[]){}
 get getTotalCount(){
  let counter = 0;
  let productID :any
  for(productID in this.items){
    counter += this.items[productID].quantity;
  }
  return counter;
 }

 get productids(){
  // if(this.items === null || undefined){
  //    return;
  // }else
  
  return Object.keys(this.items)
 }
}
