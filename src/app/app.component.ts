import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StorageProvider } from '../providers/storage/storage';
import { ConnProvider } from '../providers/conn/conn';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, conn: ConnProvider, storage: StorageProvider, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      conn.company().then(res =>storage.setCompany(res.json())).catch(() => "Select company wasn't possible.");
      storage.getUser().then(user => this.rootPage = user && user.token ? TabsPage : LoginPage);
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
