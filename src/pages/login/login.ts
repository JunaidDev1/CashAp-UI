import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilsProvider } from '../../providers/utils/utils';
import * as firebase from 'firebase';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public accountTabs: any = "login";
  public onRegisterForm: FormGroup;
  public onLoginForm: FormGroup;
  public firstName: any;
  public lastName: any;
  public emailAddress: any;
  public phoneNumber: any;
  public password: any;
  public confirmPassword: any;
  public userCode: any;
  public uid: any;
  public showSuccess = false;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public utils: UtilsProvider,
    public _fb: FormBuilder) {
    if (localStorage.getItem('userLoggedIn') == 'true') {
      navCtrl.setRoot(HomePage);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ngOnInit() {
    this.onLoginForm = this._fb.group({
      emailAddress: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])],
    });

    this.onRegisterForm = this._fb.group({
      firstName: ['', Validators.compose([
        Validators.required
      ])],
      lastName: ['', Validators.compose([
        Validators.required
      ])],
      emailAddress: ['', Validators.compose([
        Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),
        Validators.required
      ])],
      phoneNumber: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])],
      confirmPassword: ['', Validators.compose([
        Validators.required
      ])],
    })
  }

  registerUser() {
    var self = this;
    if (self.password != self.confirmPassword) {
      this.utils.createToast("Password Mismatch");
      return;
    }
    self.utils.presentLoading();
    firebase.auth().createUserWithEmailAndPassword(self.emailAddress, self.password).then((user) => {
      if (firebase.auth().currentUser) {
        self.uid = firebase.auth().currentUser.uid;
        localStorage.setItem("uid", self.uid);
      }
      firebase.auth().currentUser.sendEmailVerification();
      self.saveDatatoUserTableAfterRegister(self.emailAddress, self.firstName, self.lastName, self.phoneNumber, self.uid);

    })
      .catch((error) => {
        var errorMessage = error.message;
        self.utils.stopLoading();
        self.utils.createToast(errorMessage);
      });
  }

  saveDatatoUserTableAfterRegister(contactEmail, firstName, lastName, phone, uid) {
    var self = this;
    var val = Math.floor(100 + Math.random() * 900);
    self.userCode = "$" + val + self.lastName;
    var postData: any = {
      contactEmail: contactEmail,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      userCode: self.userCode,
      uid: uid,
      timestamp: Number(new Date()),
    };
    var updates = {};
    updates['/users/' + uid] = postData;
    firebase.database().ref().update(updates).then(() => {
      self.utils.stopLoading();
      this.showSuccess = true;
      localStorage.setItem('emailAddress', self.emailAddress);
      localStorage.setItem('userCode', self.userCode);
      localStorage.setItem('firstName', self.firstName);
      localStorage.setItem('lastName', self.lastName);
      localStorage.setItem('userLoggedIn', 'true');
      localStorage.setItem('uid', self.uid);
    });
  }


  onLogin() {
    var self = this;
    self.utils.presentLoading();
    firebase.auth().signInWithEmailAndPassword(self.emailAddress, self.password).then((user) => {
      if (user) {
        self.getUserData();
      }
    })
      .catch((error) => {
        var errorMessage = error.message;
        self.utils.stopLoading();
        self.utils.createToast(errorMessage);
      });
  }

  getUserData() {
    var self = this;
    firebase.database().ref().child('users').once('value', (snapshot) => {
      var users = snapshot.val();
      for (var key in users) {
        var user = users[key];
        if (user.uid == firebase.auth().currentUser.uid) {
          localStorage.setItem('firstName', user.firstName);
          localStorage.setItem('lastName', user.lastName);
          localStorage.setItem('emailAddress', self.emailAddress);
          localStorage.setItem('userCode', user.userCode);
          localStorage.setItem('userLoggedIn', 'true');
          localStorage.setItem('uid', user.uid);
          self.utils.stopLoading();
          self.utils.createToast("Logged in!")
          self.navCtrl.setRoot(HomePage)
        }
      }
    });
  }


}
