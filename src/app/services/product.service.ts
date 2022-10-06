import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 product:AngularFireObject<any>
  constructor(private db:AngularFireDatabase) { }
  create(product: any){
    this.db.list('/products/').push(product);
  }
  getproducts(){
    return this.db.list('/products/').snapshotChanges()
  }
  getProduct(id:string){
    this.product=  this.db.object('/products/' + id ) as AngularFireObject<any>
    return this.product.valueChanges()
  }
  updateProduct(id:string, product:any){
    this.db.object('/products/' + id ).update(product)
  }
  deleteProduct(id:string){
    this.db.object('/products/' + id ).remove()
  }
}
