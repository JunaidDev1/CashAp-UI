import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import * as firebase from 'firebase';


/**
 * Generated class for the AboutUsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about-us',
  templateUrl: 'about-us.html',
})
export class AboutUsPage {

  public data: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public utils: UtilsProvider) {
    this.aboutUs();
  }

  aboutUs() {
    var self = this;
    self.utils.presentLoading();
    firebase.database().ref().child('/settings' + '/' + 'data')
      .once('value', (snapshot) => {
        self.data = snapshot.val();
        self.data.aboutUs = self.data.aboutUs;
        self.utils.stopLoading();
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutUsPage');
  }

}
