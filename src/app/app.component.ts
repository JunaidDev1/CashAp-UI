import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { UtilsProvider } from '../providers/utils/utils';
import * as firebase from 'firebase';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'LoginPage';
  public appPages: any;

  pages: Array<{ title: string, component: any }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public utils: UtilsProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];

    this.appPages = {
      homePage: HomePage,
      profilePage: 'ProfilePage',
      settingsPage: 'SettingsPage',
      loginPage: 'LoginPage',
      aboutUs: 'AboutUsPage',
      privacyPolicy: 'PrivacyPolicyPage',
      termsConditions: 'TermsConditionsPage',
    }

    this.statusBar.backgroundColorByHexString('#f1f1f1');

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }


  logout() {
    var self = this;
    self.utils.presentLoading();
    var user = firebase.auth().currentUser;
    if (user != null) {
      firebase.auth().signOut().then(() => {
        localStorage.setItem('userLoggedIn', 'false');
        self.utils.stopLoading();
        self.utils.createToast("User Logged Out");
        localStorage.clear();
        self.nav.setRoot('LoginPage');
      })
        .catch((error) => {
          self.utils.stopLoading();
          alert(" Error Signing Out");
        })
    }
    else {
      self.utils.stopLoading();
      localStorage.clear();
      self.nav.setRoot('LoginPage');
    }
  }

}
