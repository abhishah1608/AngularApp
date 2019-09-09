import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BookAddedInCart } from '../../model/book-added-in-cart';
import { GlobalService } from '../../services/global.service';


@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private global: GlobalService) { }

  bookCart: BookAddedInCart;

  currencysymbol: string;

  bindvalue: string = null;

  ngOnInit() {
    const bookcart = sessionStorage.getItem('Cart');
    this.bookCart = JSON.parse(bookcart);
    if (this.global.language === 'tr') {
       this.currencysymbol = '₺';
    } else if (this.global.language === 'fr') {
      this.currencysymbol = '$';
   } else {
    this.currencysymbol = '₹';
   }
  }

  // method redirect to payment details screen to get payment detail of customer.
  AddToCart() {
    const bRetval = false;
    const body: string = document.getElementById('cart').innerHTML;
    sessionStorage.setItem('body', body);
    this.router.navigate(['app/payment']);
    return bRetval;
  }

  getWidth(): any {
    if (document.body.offsetWidth < 850) {
      return '90%';
    }

    return 850;
  }



  // tslint:disable-next-line:max-line-length
  cellsrenderer = (row: number, columnfield: string, value: string | number, defaulthtml: string, columnproperties: any, rowdata: any): string => {

    if (value < 20) {
      return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #ff0000;">' + value + '</span>';
    } else {
      return '<span style="margin: 4px; float: ' + columnproperties.cellsalign + '; color: #008000;">' + value + '</span>';
    }
  }

  // on Destroy unsubsribe .
  ngOnDestroy(): void {

  }
}
