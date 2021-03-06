import { Component, OnInit } from '@angular/core';
import {CarPart} from './carpart';
import {CarpartsDataService} from './carparts-data.service';

@Component({
  selector: 'app-carparts',
  templateUrl: './carparts.component.html',
  styleUrls: ['./carparts.component.css']
})
export class CarpartsComponent implements OnInit {
  carParts: CarPart[];

  constructor(private carpartsDataService: CarpartsDataService) {
    console.log('CarpartsComponent Constructor is called');
  }

  ngOnInit() {
    console.log('CarpartsComponent ngOnInit');
    // this.carParts = this.carpartsDataService.getCarParts();
    this.carpartsDataService.getCarParts().subscribe(resData => this.carParts = resData['data']);
  }

  totalCarParts() {
    if (Array.isArray(this.carParts)) {
      return this.carParts.reduce((prev, curr) => prev + curr.inStock, 0);
    }
  }

  upQuantity(carPart) {
    if ( carPart.quantity < carPart.inStock) {
      carPart.quantity++;
    }
  }
  downQuantity(carPart) {
    if ( carPart.quantity !== 0) {
      carPart.quantity--;
    }
  }

  keyupQuantity(carPart, event) {
    /* console.log('value:' + event.target.value); */
    if ( event.target.value <= carPart.inStock) {
      carPart.quantity = event.target.value;
    }
  }
}
