import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { Commonservice } from '../../providers/commonservice';
import { Apiservice } from '../../providers/apiservice';

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    tab1 = 'TakeacrossborderPage';
    tab2 = 'MomentsPage';
    
    constructor(public navCtrl: NavController) {
    }
  
    ionViewDidLoad() {
      console.log('ionViewDidLoad MomentsPage');
    }
}
