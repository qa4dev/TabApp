import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CountrylistPage } from './countrylist';

@NgModule({
  declarations: [
    CountrylistPage,
  ],
  imports: [
    IonicPageModule.forChild(CountrylistPage),
  ],
})
export class CountrylistPageModule {}
