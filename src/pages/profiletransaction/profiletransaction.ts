import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-profiletransaction',
    templateUrl: 'profiletransaction.html',
})
export class ProfiletransactionPage {
    tab1 = 'MyprofilePage';
    tab2 = 'MytransactionPage';
    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ProfiletransactionPage');
    }

}
