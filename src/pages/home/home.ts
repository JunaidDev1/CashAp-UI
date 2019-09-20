import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  openConfirm = false;
  
  constructor(public navCtrl: NavController) {

  }

  ionViewWillEnter() {
    this.openConfirm = false;
  }

}
