import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequestMoneyPage } from './request-money';

@NgModule({
  declarations: [
    RequestMoneyPage,
  ],
  imports: [
    IonicPageModule.forChild(RequestMoneyPage),
  ],
})
export class RequestMoneyPageModule {}
