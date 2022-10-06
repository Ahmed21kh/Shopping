import { Component, Input, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  categories$:any
  @Input('category') category: any;
  constructor(private categoryserv:CategoriesService) {
    this.categories$ = this.categoryserv.getCategories()
  }

  ngOnInit(): void {
  }

}
