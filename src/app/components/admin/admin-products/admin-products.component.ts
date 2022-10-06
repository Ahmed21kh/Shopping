import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { DataTableDirective } from 'angular-datatables';
import { Subject, Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements AfterViewInit ,OnDestroy , OnInit{
  products$: any[]=[]
  filteredproducts$: any[]=[]
  id:any
  prpdId$:any
  Subscribe:Subscription;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<void>();

  @ViewChild(DataTableDirective, {static: false})
  datatableElement: DataTableDirective;


  constructor(
    private productserv:ProductService ,
    public toast :HotToastService ,
    private activatedRoute:ActivatedRoute,
    private router :Router,
    private db:AngularFireDatabase
    ) {
      this.id=this.activatedRoute.snapshot.paramMap.get('id');
      this.Subscribe =this.productserv.getproducts().subscribe(res =>{


        this.filteredproducts$=this.products$=res


         this.dtTrigger.next(this.filteredproducts$)
        })

  }
  ngOnInit(): void {

    // this.Subscribe= this.productserv.getproducts().subscribe(res => {
    //   res.forEach(action => {
    //     let emp:any = action.payload.toJSON()
    //     emp["key"]=action.key;
    //     this.products$.push(emp);
    //     this.filteredproducts$=this.products$;
    //     this.dtTrigger.next(emp);


    //   })
    // })

    this.dtOptions = {
      lengthMenu:[5,10,15,50],
      pagingType: 'full_numbers',
      pageLength: 5,
      // processing:true,
      // lengthChange:true,
      searching:true,
      // dom: 'Bfrtip',

    };
  }
  ngOnDestroy(): void {
   this.Subscribe.unsubscribe()

  }
  ngAfterViewInit(): void {

  }

  filter(queryString:string){
    if(queryString){
      this.filteredproducts$ =
      this.products$.filter(p=>p.payload.val().title.toLowerCase().includes(queryString.toLocaleLowerCase()))
    }else{
      this.filteredproducts$ = this.products$;
    }
  }



}
