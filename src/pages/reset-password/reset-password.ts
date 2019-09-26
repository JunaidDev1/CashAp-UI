import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import * as firebase from 'firebase';

/**
 * Generated class for the ResetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {

  public showSuccess = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public utils: UtilsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }

  resetPassword(emailAddress) {
    var self = this;
    self.utils.presentLoading();
    var auth = firebase.auth();
    auth.sendPasswordResetEmail(emailAddress)
      .then(() => {
        self.utils.stopLoading();
        this.showSuccess = true;
      }).catch((error) => {
        self.utils.stopLoading();
        alert("Please confirm your email address!");
      });
  }

}
