import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MytransactionPage } from './mytransaction';

@NgModule({
  declarations: [
    MytransactionPage,
  ],
  imports: [
    IonicPageModule.forChild(MytransactionPage),
  ],
})
export class MytransactionPageModule {}
