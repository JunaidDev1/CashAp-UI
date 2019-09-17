import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendMoneyPage } from './send-money';

@NgModule({
  declarations: [
    SendMoneyPage,
  ],
  imports: [
    IonicPageModule.forChild(SendMoneyPage),
  ],
})
export class SendMoneyPageModule {}
