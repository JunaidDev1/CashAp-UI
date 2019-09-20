import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendToManyPage } from './send-to-many';

@NgModule({
  declarations: [
    SendToManyPage,
  ],
  imports: [
    IonicPageModule.forChild(SendToManyPage),
  ],
})
export class SendToManyPageModule {}
