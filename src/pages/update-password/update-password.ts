import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import * as firebase from 'firebase';

/**
 * Generated class for the UpdatePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update-password',
  templateUrl: 'update-password.html',
})
export class UpdatePasswordPage {

  public currentPassword: any;
  public newPassword: any;
  public cNewPassword: any;
  public contactEmail: any;
  public showSuccess = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public utils: UtilsProvider) {
    this.contactEmail = localStorage.getItem('emailAddress');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdatePasswordPage');
  }

  updatePassword() {
    var self = this;
    if (self.currentPassword == "") {
      self.utils.createToast("Please enter current password!");
      return;
    }
    if (!self.newPassword || self.newPassword == "" || self.newPassword.length < 6) {
      self.utils.createToast("New password length is invalid!");
      return;
    }
    if (self.newPassword != self.cNewPassword) {
      self.utils.createToast("New passwords mismatch!");
      return;
    }
    else {
      self.updateFirebasePassword();
    }
  }

  updateFirebasePassword() {
    var self = this;
    self.utils.presentLoading();
    firebase.auth().signInWithEmailAndPassword(self.contactEmail, self.currentPassword).then((user) => {
      if (user) {
        firebase.auth().currentUser.updatePassword(self.newPassword).then(function () {
          self.utils.stopLoading();
          self.showSuccess = true;
        })
      }
    })
      .catch((error) => {
        var errorMessage = error.message;
        self.utils.stopLoading();
        self.utils.createToast(errorMessage);
      });
  }

  logout() {
    var self = this;
    self.utils.presentLoading();
    var user = firebase.auth().currentUser;
    if (user != null) {
      firebase.auth().signOut().then(() => {
        localStorage.setItem('userLoggedIn', 'false');
        self.utils.stopLoading();
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
