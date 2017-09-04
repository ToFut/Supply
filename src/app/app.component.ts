import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  exportAs: 'mdMenu'
})
export class AppComponent {
  title = 'Supply';
  openNav() {
    document.getElementById('mySidenav').style.width = '250px';
  }

  closeNav() {
    document.getElementById('mySidenav').style.width = '0';
  }

  constructor(private http: HttpClient) {}
  GetPost(): any {
    this.http.get('http://localhost:8082/ping').subscribe();
  }

}
