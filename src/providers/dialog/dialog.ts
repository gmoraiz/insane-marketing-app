import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class DialogProvider {
  loading: any;

  constructor(public toast : ToastController,public loadCtrl: LoadingController) {}

  msg(msg: string): void{
    let toast = this.toast.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  load(msg: string): void{
    let loading = this.loadCtrl.create({
      content: msg
    });
    loading.present();
    this.loading = loading;
  }

}
