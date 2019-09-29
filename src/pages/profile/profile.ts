import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { UtilsProvider } from '../../providers/utils/utils';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as firebase from 'firebase';
import * as moment from 'moment';



/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public newFile = false;
  public user: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public camera: Camera,
    public events: Events,
    public utils: UtilsProvider) {
    this.getUserData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  getUserData() {
    var self = this;
    let uid = localStorage.getItem("uid");
    self.utils.presentLoading("Fetching Data!");
    firebase.database().ref().child('users/' + uid)
      .once('value', (snapshot) => {
        self.user = snapshot.val();
        self.user.imagePath = self.user.profileUrl;
        self.user.profileUrl = self.user.profileUrl;
        self.user.memberSince = moment(self.user.timestamp).fromNow();
        self.utils.stopLoading();
      })
  }


  updateProfile() {
    if (this.newFile) {
      this.utils.presentLoading("Updating profile!");
      this.uploadFile();
    }
    else {
      this.updateData();
    }
  }

  uploadFile() {
    var self = this;
    let storageRef = firebase.storage().ref();
    const filename = Math.floor(Date.now() / 1000);
    const imageRef = storageRef.child(`profileImages/${filename}.jpg`);
    imageRef.putString(self.user.imagePath, firebase.storage.StringFormat.DATA_URL).then((snapshot) => {
      firebase.storage().ref('profileImages/' + snapshot.metadata.name).getDownloadURL().then(function (url) {
        self.user.profileUrl = url;
        self.updateData();
      });
    });
  }

  updateData() {
    if (this.user.phone == "") {
      this.utils.createToast("Phone Number is mandatory!");
      return;
    }
    else {
      var self = this;
      let uid = localStorage.getItem('uid');
      var updates = {};
      updates['/users/' + uid + "/" + "firstName"] = self.user.firstName ? self.user.firstName : "";
      updates['/users/' + uid + "/" + "lastName"] = self.user.lastName ? self.user.lastName : "";
      updates['/users/' + uid + "/" + "phone"] = self.user.phone ? self.user.phone : "";
      updates['/users/' + uid + "/" + "profileUrl"] = self.user.profileUrl ? self.user.profileUrl : "";
      updates['/users/' + uid + "/" + "country"] = self.user.country ? self.user.country : "";
      updates['/users/' + uid + "/" + "city"] = self.user.city ? self.user.city : "";

      firebase.database().ref().update(updates).then(() => {
        localStorage.setItem('profileImage', self.user.profileUrl);
        localStorage.setItem('firstName', self.user.firstName);
        localStorage.setItem('lastName', self.user.lastName);
        self.events.publish('dataUpdated', "true");
        this.utils.stopLoading();
        self.utils.createToast("Profile Updated");
      });
    }
  }


  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Update Picture',
      buttons: [{
        text: 'Camera',
        handler: () => {
          this.openCamera();
        }
      },
      {
        text: 'Gallery',
        handler: () => {
          this.openGallery();
        }
      }]
    });
    confirm.present();
  }

  openCamera() {
    var self = this;
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      allowEdit: true,
      sourceType: 1,
    }
    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      self.user.imagePath = base64Image;
      self.newFile = true;
    }, (err) => {
      // Handle error
    });
  }

  openGallery() {
    var self = this;
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      allowEdit: true,
      sourceType: 2,
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      self.user.imagePath = base64Image;
      self.newFile = true;
    }, (err) => {
      // Handle error
    });
  }

}
