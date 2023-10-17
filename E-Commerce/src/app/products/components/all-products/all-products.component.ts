import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../models/Iproduct';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {
  allProducts: IProduct[] = [];
  allCategories: string[] = [];
  isLoading: boolean = false;
  cartOfProducts: any[] = [];
  constructor(private _ProductsService: ProductsService) { }
  ngOnInit(): void {
    this.getCategories();
    this.getProducts();
  }
  getProducts() {
    this.isLoading = true;
    this._ProductsService.getAllProducts().subscribe((data: any) => {
      this.allProducts = data;
      this.isLoading = false;
      //console.log(this.allProducts);
    })
  }

  getCategories() {
    this.isLoading = true
    this._ProductsService.getAllCategory().subscribe((data: any) => {
      this.allCategories = data;
      this.isLoading = false;
      // console.log(this.allCategories);
    })
  }

  filterCategory(event: any) {
    let value = event.target.value;
    if (value == "all") {
      this.getProducts();
    } else {
      this.getProdByCateName(value);
    }
    // console.log(value);

  }
  addToCart(ev: any) {
    //JSON.stringify();// send Data to API
    // JSON.parse(); //    recive Data from API

    if ('cart' in localStorage) {
      this.cartOfProducts = JSON.parse(localStorage.getItem('cart')!);
      let existProd = this.cartOfProducts.find(item => item.item.id == ev.item.id);
      if (existProd) {
        alert('Product Already Added!');
      } else {
        this.cartOfProducts.push(ev);
        localStorage.setItem('cart', JSON.stringify(this.cartOfProducts));
      }
    } else {
      this.cartOfProducts.push(ev);
      localStorage.setItem('cart', JSON.stringify(this.cartOfProducts));
    }

  }

  getProdByCateName(cateName: any) {
    this.isLoading = true;
    this._ProductsService.getProdByCategory(cateName).subscribe(data => {
      console.log(data);
      this.allProducts = data;
      this.isLoading = false;
    })
  }
}
