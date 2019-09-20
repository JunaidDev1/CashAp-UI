import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SendToManyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-send-to-many',
  templateUrl: 'send-to-many.html',
})
export class SendToManyPage {

  allUsers = [
    {
      userImg: "./assets/imgs/user-1.png",
      userName: "John Doe",
      amount: "",
      status: false,
    }
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendToManyPage');
  }

  addMore() {
    if (this.allUsers.length == 1) {
      var object = {
        userImg: "./assets/imgs/user-2.png",
        userName: "Sam Doe",
        amount: "",
        status: false,
      }
      this.allUsers.push(object);
    }
    else {
      var object = {
        userImg: "./assets/imgs/user-3.png",
        userName: "Danny Doe",
        amount: "",
        status: false,
      }
      this.allUsers.push(object);
    }
  }

}
