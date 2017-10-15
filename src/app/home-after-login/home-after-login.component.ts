import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-after-login',
  templateUrl: './home-after-login.component.html',
  styleUrls: ['./home-after-login.component.css']
})
export class HomeAfterLoginComponent implements OnInit {

  tiles: any[] = [
    {text: 'ספקים שלי', cols: 3, rows: 1, color: 'lightblue' , route: '/supplier'},
    {text: 'הזמנות', cols: 1, rows: 2, color: 'lightgreen' , route: '/order'},
    {text: 'המוצרים שלי', cols: 1, rows: 1, color: 'lightpink' , route: '/correctSupplierProducts'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' , route: '/supplier'},
  ];
  constructor() { }

  ngOnInit() {
  }

}
