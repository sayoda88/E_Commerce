import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  prodID!: any;
  prodDetails:any;
  isLoading:boolean=false
  constructor(private _ActivatedRoute: ActivatedRoute,
    private _ProductsService: ProductsService) {
    this.prodID = this._ActivatedRoute.snapshot.paramMap.get('pid');
    console.log(this.prodID);
  }
  ngOnInit(): void {
    this.getPorductById()
  }

  getPorductById() {
    this.isLoading=true
    this._ProductsService.getProdByID(this.prodID).subscribe(data => {
      this.prodDetails=data;
      this.isLoading=false;
    })
  }
}
