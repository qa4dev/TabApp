import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecentlikesPage } from './recentlikes';

@NgModule({
  declarations: [
    RecentlikesPage,
  ],
  imports: [
    IonicPageModule.forChild(RecentlikesPage),
  ],
})
export class RecentlikesPageModule {}
