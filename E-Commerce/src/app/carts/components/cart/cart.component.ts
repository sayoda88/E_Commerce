import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  totalPrice: any;
  cartOfProducts: any[] = [];
  isDone:boolean=false;
  constructor(private _CartsService:CartsService) { }


  ngOnInit(): void {
    this.getAllCartProds();
  }
  getAllCartProds() {
    if ('cart' in localStorage) {
      this.cartOfProducts = JSON.parse(localStorage.getItem('cart')!);
    }
    //console.log(this.cartOfProducts);
    this.getTotalPrice();
  }
  plusAmount(index: number) {
    this.cartOfProducts[index].quantity += 1;
    this.getTotalPrice();
    localStorage.setItem('cart', JSON.stringify(this.cartOfProducts));
  }
  minsAmount(index: number) {
    this.cartOfProducts[index].quantity -= 1;
    this.getTotalPrice();
    localStorage.setItem('cart', JSON.stringify(this.cartOfProducts));
  }
  detectChanges(){
    localStorage.setItem('cart', JSON.stringify(this.cartOfProducts));
  }
  deleteProd(index:number){
    this.cartOfProducts.splice(index,1);
    localStorage.setItem('cart', JSON.stringify(this.cartOfProducts));
  }
  clearCart(){
    this.cartOfProducts=[];
    this.getTotalPrice();
    localStorage.setItem('cart', JSON.stringify(this.cartOfProducts));
  }
  getTotalPrice() {
    this.totalPrice = 0;
    for (let i in this.cartOfProducts) {
      this.totalPrice += this.cartOfProducts[i].item.price * this.cartOfProducts[i].quantity;
    }
    //return this.totalPrice;
  }
  sendCartReq(){
    let finalProds=this.cartOfProducts.map(item=>{
      return {productId:item.item.id,quantity:item.quantity}
    })
    let model={
      userId:2,//static ID 
      date: new Date(),
      products:finalProds
    }
    console.log(model);
    this._CartsService.sendNewCart(model).subscribe(res=>{
      console.log(res);
      this.isDone=true;
      this.clearCart();
    });
  }
}
