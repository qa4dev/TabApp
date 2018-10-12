import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Commonservice } from '../../providers/commonservice';
import { Apiservice } from '../../providers/apiservice';


@IonicPage()
@Component({
    selector: 'page-howworks',
    templateUrl: 'howworks.html',
})
export class HowworksPage {
    data: any = [];
    items: any;
    result: any;
    heading: any;
    notes: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private commonservice: Commonservice,
        private apiservice: Apiservice,
    ) {
        this.howworks();
        console.log(this.data);
    }

    howworks() {
        this.commonservice.showLoader();
        this.apiservice.howWorks_data().then((res) => {
            this.commonservice.hideLoader();
            this.result = res;
            if (this.result.RespCode == "2003") {
                this.heading = this.result.heading;
                this.notes = this.result.notes;
                this.items = this.result.how_it_work;
                for (var i = 0; i < this.items.length; i = i + 2) {
                    var obj = {
                        key1: this.items[i],
                        key2: this.items[i + 1]
                    };
                    this.data.push(obj);
                }
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


    ionViewDidLoad() {
        console.log('ionViewDidLoad HowworksPage');
    }

}
