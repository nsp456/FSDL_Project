import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {map} from "rxjs/operators";
import {CartService} from "../../services/cart.service";
import { ProductModel } from 'src/app/models/product.model';

declare let $: any;

@Component({
  selector: 'mg-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  id;
  product;

  @ViewChild('quantity') quantityInput;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private cartService: CartService) 
              {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((param: ParamMap) => {
        // @ts-ignore
        return param.params.id;
      })
    ).subscribe(prodId => {
      this.id = prodId;
      this.productService.getSingleProduct(this.id).subscribe((prod) => {
        this.product = prod;
      });
    });
  }

  addToCart(id) {
    this.cartService.addProductToCart(id, this.quantityInput.nativeElement.value);
  }

  Increase() {
    let value = parseInt(this.quantityInput.nativeElement.value);
    if (this.product.quantity >= 1){
      value++;

      if (value > this.product.quantity) {
        // @ts-ignore
        value = this.product.quantity;
      }
    } else {
      return;
    }

    this.quantityInput.nativeElement.value = value.toString();
  }

  Decrease() {
    let value = parseInt(this.quantityInput.nativeElement.value);
    if (this.product.quantity > 0){
      value--;

      if (value <= 0) {
        // @ts-ignore
        value = 0;
      }
    } else {
      return;
    }
    this.quantityInput.nativeElement.value = value.toString();
  }
}
