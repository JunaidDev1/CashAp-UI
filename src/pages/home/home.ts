import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as firebase from 'firebase';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  openConfirm = false;

  constructor(public navCtrl: NavController) {
    this.checkStatus();
  }

  checkStatus() {
    if (localStorage.getItem('userLoggedIn') == 'true') {
      var uid = localStorage.getItem('uid');
      firebase.database().ref().child('/users' + '/' + uid)
        .once('value', (snapshot) => {
          var user = snapshot.val();
          if (user.status) {
            if (user.status == "blocked") {
              alert("You are restricted to use WhatsPay!");
              localStorage.setItem('userLoggedIn', 'false');
              localStorage.clear();
              this.navCtrl.setRoot('LoginPage');
            }
          }
        });
    }
  }


  ionViewWillEnter() {
    this.openConfirm = false;
  }


}
