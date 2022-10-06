import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css']
})
export class ProductsFormComponent implements OnInit {
 categories$: any;
 productForm = new FormGroup({
  title: new FormControl('', [Validators.required ,Validators.minLength(4)]),
  price:new FormControl('',[Validators.required, Validators.min(0)]),
  category:new FormControl('',[Validators.required]),
  imageurl:new FormControl('',[Validators.required ]),
});
id:any
// product:any
  constructor(
    private categserv:CategoriesService,
    private productsev:ProductService ,
    public toast :HotToastService ,
    private router :Router,
    private activatedRoute:ActivatedRoute
    ) {
  categserv.getCategories().subscribe(res => this.categories$ = res);
  this.productsev.getproducts().subscribe(res =>{
    res.forEach(action=>{
      let emp:any = action.payload.toJSON()
      emp['$key']= action.key
    })
  })
  this.id=this.activatedRoute.snapshot.paramMap.get('id');
  this.productsev.getProduct(this.id).subscribe(produc => {
    if(produc != null){
      this.editProduct(produc)
    }
   })
    console.log(this.id);


  }
  editProduct(product:any){
   this.productForm.patchValue({
    title: product.title,
    price: product.price,
    category: product.category,
    imageurl: product.imageurl

   })
  }

  ngOnInit(): void {

  }
  get f(){
    return this.productForm.controls;
  }
  get title(){
    return this.productForm.get('title');
  }
  get price(){
    return this.productForm.get('price');
  }
  get category(){
    return this.productForm.get('category');
  }
  get imageurl(){
    return this.productForm.get('imageurl');
  }
  save(){
          if (!this.productForm.valid){
            this.toast.error('Please write correct info!' ,{
              style: {
                border: '1px solid #ff0000',
                padding: '16px',
                color: '#ff0000',
              },
              iconTheme: {
                primary: '#ff0000',
                secondary: '#FFFAEE',
              },

            })


          }else{

          if(this.id){
            console.log(this.id);
            this.productsev.updateProduct(this.id , this.productForm.value);
            this.toast.success(' Product Updated Successfuly  :)' ,{
              style: {
                border: '1px solid #21b11e',
                padding: '16px',
                color: ' #21b11e',
              },
              iconTheme: {
                primary: ' #21b11e',
                secondary: '#FFFAEE',

              },
            } );

          }else{
            const product = this.productForm.value;
            this.productsev.create(product);
              this.toast.success(' Product Added Successfuly  :)' ,{
                style: {
                  border: '1px solid #21b11e',
                  padding: '16px',
                  color: ' #21b11e',
                },
                iconTheme: {
                  primary: ' #21b11e',
                  secondary: '#FFFAEE',

                },
              } );
          }


           this.router.navigateByUrl('/admin/product')

          }


      }
      delete(){
        if(confirm('Are you sure you want to delete product !! '))
        {this.productsev.deleteProduct(this.id)
        console.log(this.id )
        this.toast.success(' Product deleted Successfuly  :)' ,{
          style: {
            border: '1px solid #21b11e',
            padding: '16px',
            color: ' #21b11e',
          },
          iconTheme: {
            primary: ' #21b11e',
            secondary: '#FFFAEE',

          },
        } );
        }
        this.router.navigateByUrl('/admin/product')
      }

}





