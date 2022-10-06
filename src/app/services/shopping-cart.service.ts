import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { ObservableLoading } from '@ngneat/hot-toast';
import { map, Observable } from 'rxjs';
import 'rxjs-compat/add/operator/take';
import { take } from 'rxjs/internal/operators/take';
import { ShoppingCart } from '../models/IShoppingCart';
@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  private create() {
    this.db.list('/shopping-carts/').push({
      dateCreated: new Date().getTime(),
    });
  }

private  async getOrCreateCardId() {

    let cardID = localStorage.getItem('cardID')
    console.log(cardID!);
    if (cardID ) return cardID!;


    let result: any = await this.create();



    localStorage.setItem('cardID', result!.key!);

    console.log(result!.key);

    return result!.key;
  }

  getItem(cardid: string, productid: string) {
    return this.db.object('/shopping-carts/' + cardid! + '/items/' + productid!);
  }

  async addToCard(product: any){
    this.UbdateToCard(product,1)
  }

  async removefromCart(product: any){
    this.UbdateToCard(product,-1)
  }


  async UbdateToCard(product: any , quantityState:any) {


    console.log(product!.key!);

    let cardid$ = await this.getOrCreateCardId();


    console.log(cardid$!);

    let items$ = this.getItem(cardid$! , product!.key!);


    items$.snapshotChanges()
      .pipe(take(1))
      .subscribe((item: any) => {
        if (item!.payload.exists()) {
          items$!.update({ quantity: item.payload.val().quantity + quantityState });
        } else {

          items$.update({
            product: {
              title: product.payload.val().title,
              price: product.payload.val().price,
              category: product.payload.val().category,
              imageurl: product.payload.val().imageurl,

            },
            quantity: 1,
          });
          console.log('sucsses!');
        }
      });
  }


public async getcart(): Promise<AngularFireObject<ShoppingCart>>{
  let cardID = await this.getOrCreateCardId();
  return this.db.object('/shopping-carts/' + cardID);
}
public async getcarts(): Promise<Observable<ShoppingCart>>{
  let cardID = await this.getOrCreateCardId();
  return this.db.object('/shopping-carts/' + cardID!)
  .valueChanges().pipe(map(cart => new ShoppingCart((cart as any).items)));
}
}
