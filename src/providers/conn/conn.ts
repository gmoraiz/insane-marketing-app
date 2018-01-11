import { Injectable } from '@angular/core';
import { Http, Response,Headers, RequestOptions } from '@angular/http';
import { StorageProvider } from '../storage/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ConnProvider {
  url:string = 'https://insane-marketing-web-gmoraiz.c9users.io/';
  headers: any;
  options: any;
  
  constructor(public http: Http, public storage : StorageProvider){
    this.storage.getUser().then(user => this.setHeader(user && user.token ? user.token : null));
  }

  setHeader(token): void{
    this.headers = new Headers({ Authorization: token });
    this.options = new RequestOptions({ headers: this.headers });
  }

  login(data: object): Promise<Response>{
    return this.http.post(this.url+'login-user', JSON.stringify(data)).toPromise();
  }

  company(): Promise<Response>{
    return this.http.get(this.url+'select-company/KL123UHhuhudpjy8qvekvqivmqebyhqeyveqbveqadusad21354').toPromise();
  }

}
