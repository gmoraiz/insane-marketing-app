import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ConnProvider } from '../../providers/conn/conn';
import { DialogProvider } from '../../providers/dialog/dialog';
import { StorageProvider } from '../../providers/storage/storage';
import { TabsPage } from '../../pages/tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user: FormGroup;

  constructor(public nav: NavController, public navParams: NavParams,form : FormBuilder,
  public storage : StorageProvider, public conn: ConnProvider, public dialog: DialogProvider){
    this.user = form.group({
      name:['', [Validators.required, Validators.maxLength(60)]],
      phone:['', [Validators.required, Validators.maxLength(13), Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.maxLength(50), Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]],
      password: ['', [Validators.required, Validators.maxLength(30)]],
      birth:['', Validators.maxLength(255)],
      address:['', Validators.maxLength(255)],
    });
  }

  register():void{
    this.dialog.load("Registering...");
    this.conn.register(this.user.value).then(res => {
      this.dialog.loading.dismiss();
      this.dialog.msg(res.json().msg);
      if(res.status == 200)
        this.nav.pop();
    }).catch(err =>{
      this.dialog.loading.dismiss();
      this.dialog.msg("Wasn't possible connect.");
    });
  }

}
