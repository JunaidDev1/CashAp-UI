import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from 'ionic-angular';

/*
  Generated class for the UtilsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilsProvider {

  public loader: any;
  constructor(public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {
    console.log('Hello UtilsProvider Provider');
  }

  //Helper Functions...
  presentLoading(message?) {
    if (this.loader)
      return;
    this.loader = this.loadingCtrl.create({
      content: message || "Please wait..."
    });
    this.loader.onDidDismiss(() => {
      this.loader = undefined;
    });

    this.loader.present();
  }

  stopLoading() {
    if (this.loader) {
      this.loader.dismiss();
      this.loader = undefined;
    }
  }

  createToast(mess) {
    let toast = this.toastCtrl.create({
      message: mess,
      cssClass: 'mytoast',
      duration: 3000
    });
    toast.present();
  }


}
