import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ConnProvider } from '../../providers/conn/conn';
import { DialogProvider } from '../../providers/dialog/dialog';
import { StorageProvider } from '../../providers/storage/storage';
import { TabsPage } from '../../pages/tabs/tabs';
import { RegisterPage } from '../../pages/register/register';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user: FormGroup;

  constructor(public nav: NavController, public navParams: NavParams,form : FormBuilder,
  public storage : StorageProvider, public conn: ConnProvider, public dialog: DialogProvider){
    this.user = form.group({
      email: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]],
      password: ['', [Validators.required, Validators.maxLength(30)]]
    });
  }

  login():void{
    this.dialog.load("Entering...");
    this.storage.getFcm().then(fcm => {
      this.user.value.fcm = fcm;
      this.conn.login(this.user.value).then(res => {
        this.dialog.loading.dismiss();
        this.dialog.msg(res.json().msg);
        if(res.status == 200){
          this.storage.setUser(res.json());
          this.conn.setHeader(res.json().token);
          this.nav.push(TabsPage).then(() => {
            const index = this.nav.getActive().index;
            this.nav.remove(0, index);
          });
        }
      }).catch(err =>{
        this.dialog.loading.dismiss();
        this.dialog.msg("Wasn't possible connect.");
      });
    });
  }

  goRegister():void{
     this.nav.push(RegisterPage);
  }

}
