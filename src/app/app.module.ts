import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UtilsProvider } from '../providers/utils/utils';
import * as firebase from 'firebase';


var firebaseConfig = {
  apiKey: "AIzaSyAICNaTIUFC_f4sMgZjB-XE28z252E6tLA",
  authDomain: "whatspay-cb555.firebaseapp.com",
  databaseURL: "https://whatspay-cb555.firebaseio.com",
  projectId: "whatspay-cb555",
  storageBucket: "whatspay-cb555.appspot.com",
  messagingSenderId: "782233150545",
  appId: "1:782233150545:web:cfa40aac8ed825401f8470",
  measurementId: "G-GR3M7N7J3E"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UtilsProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
