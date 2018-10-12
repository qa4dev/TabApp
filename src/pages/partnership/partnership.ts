import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Commonservice } from '../../providers/commonservice';
import { Apiservice } from '../../providers/apiservice';

@IonicPage()
@Component({
    selector: 'page-partnership',
    templateUrl: 'partnership.html',
})
export class PartnershipPage {
    data: any = [];
    result: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private commonservice: Commonservice,
        private apiservice: Apiservice,
    ) {
        this.partner();
        console.log(this.data)
    }

    ionViewDidLoad() {
    }

    partner(){
        this.commonservice.showLoader();
        this.apiservice.partnership_data().then((res) => {
            this.commonservice.hideLoader();
            this.result = res;
            if (this.result.RespCode == "2003") {
                this.data = this.result.paragraph;
        console.log(this.data)
        
            } else {
                var msg = 'Data not fetch successfully';            
                this.commonservice.showAlert(msg);
            }
        }, (err) => {
            this.commonservice.hideLoader();
            var msg = 'Please check your internet connection or wait for server to respond';
            this.commonservice.showAlert(msg);
        });
    }


}
