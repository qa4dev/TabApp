import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MytravelchecklistPage } from './mytravelchecklist';

@NgModule({
  declarations: [
    MytravelchecklistPage,
  ],
  imports: [
    IonicPageModule.forChild(MytravelchecklistPage),
  ],
})
export class MytravelchecklistPageModule {}
