import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentGatewaysPage } from './payment-gateways';

@NgModule({
  declarations: [
    PaymentGatewaysPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentGatewaysPage),
  ],
})
export class PaymentGatewaysPageModule {}
