import { Component,OnInit,Input,Output, EventEmitter } from '@angular/core';
import { IProduct } from '../../models/Iproduct';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product!:IProduct;
  @Output() selectedProd= new EventEmitter();
  addBtn:boolean=false;
  amount:number=0;
  constructor(){}
  
  ngOnInit(): void {
    
  }
  addProduct(){
    this.selectedProd.emit({item:this.product,quantity:this.amount});
  }
}
