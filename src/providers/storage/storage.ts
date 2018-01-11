import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class StorageProvider {

  constructor(public storage: Storage){}

  setCompany(company: object): void{
    this.storage.set('company', JSON.stringify(company));
  }

  getCompany(): Promise<any>{
    return this.storage.get('company').then(company => JSON.parse(company)).catch(err => err);
  }

  setFcm(fcm: string): void{
    this.storage.set('fcm', fcm);
  }

  getFcm(): Promise<string>{
    return this.storage.get('fcm').then(fcm => fcm).catch(err => err);
  }

  setUser(user: object): void{
    this.storage.set('user', JSON.stringify(user));
  }

  getUser(): Promise<any>{
    return this.storage.get('user').then(user => JSON.parse(user)).catch(err => err);
  }

}
