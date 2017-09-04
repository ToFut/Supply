import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-server-connection',
  templateUrl: './server-connection.component.html',
  styleUrls: ['./server-connection.component.css']
})
export class ServerConnectionComponent implements OnInit {
  results: any;
  body = { 'type' : '' , 'name' : ''};

  ngOnInit(): void {
  }

  // Inject HttpClient into your component or service.

  constructor(private http: HttpClient) {}
  // get all JSON from server (mongo)


  GetAllMemberFromTheServer(): any {
    // Make the HTTP request:
    this.http.get('http://localhost:8082/GetAllMembers')
      .map((res: Response) => {
        return res.json();
      })
      .subscribe(data => this.results = JSON.stringify(data));
  }
  // post the body{type,name} to server in JSon.stringify
  PostServer() {
    this.http
      .post('http://localhost:8082/pip', JSON.stringify(this.body)).subscribe();
    // See below - subscribe() is still necessary when using post().
  }
  updateType(value: string) { this.body.type = value; }
  updateName(value: string) { this.body.name = value; }
}
