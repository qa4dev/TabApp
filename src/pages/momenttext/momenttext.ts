import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Commonservice } from '../../providers/commonservice';


@IonicPage()
@Component({
    selector: 'page-momenttext',
    templateUrl: 'momenttext.html',
})
export class MomenttextPage {
    data = {
        text: ''
    };
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        private commonservice: Commonservice,        
    ) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MomenttextPage');
    }


    dismisspopup() {
        this.viewCtrl.dismiss();
    }

    save(){
        if(this.data.text.trim() == ''){
            var msg = 'Please enter text';
            this.commonservice.showAlert(msg);
        }else{
            this.viewCtrl.dismiss(this.data);        
        }
    }
}
