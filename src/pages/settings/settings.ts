import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import * as firebase from 'firebase';


/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  selectedLanguage = "english";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public utils: UtilsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
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
        self.navCtrl.setRoot('LoginPage');
      })
        .catch((error) => {
          self.utils.stopLoading();
          alert(" Error Signing Out");
        })
    }
    else {
      self.utils.stopLoading();
      localStorage.clear();
      self.navCtrl.setRoot('LoginPage');
    }
  }

}
