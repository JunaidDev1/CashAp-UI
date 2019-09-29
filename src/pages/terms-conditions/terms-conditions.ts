import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import * as firebase from 'firebase';


/**
 * Generated class for the TermsConditionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-terms-conditions',
  templateUrl: 'terms-conditions.html',
})
export class TermsConditionsPage {

  public data: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public utils: UtilsProvider) {
    this.getTermsService();
  }

  getTermsService() {
    var self = this;
    self.utils.presentLoading();
    firebase.database().ref().child('/settings' + '/' + 'data')
      .once('value', (snapshot) => {
        self.data = snapshot.val();
        self.data.termsService = self.data.termsService;
        self.utils.stopLoading();
      })
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TermsConditionsPage');
  }

}
