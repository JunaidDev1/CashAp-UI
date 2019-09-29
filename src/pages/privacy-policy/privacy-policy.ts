import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import * as firebase from 'firebase';

/**
 * Generated class for the PrivacyPolicyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-privacy-policy',
  templateUrl: 'privacy-policy.html',
})
export class PrivacyPolicyPage {

  public data: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public utils: UtilsProvider) {
    this.getPrivacyPolicy();
  }

  getPrivacyPolicy() {
    var self = this;
    self.utils.presentLoading();
    firebase.database().ref().child('/settings' + '/' + 'data')
      .once('value', (snapshot) => {
        self.data = snapshot.val();
        self.data.privacyPolicy = self.data.privacyPolicy;
        self.utils.stopLoading();
      })
  }

}
