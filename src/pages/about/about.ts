import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Commonservice } from '../../providers/commonservice';
import { Apiservice } from '../../providers/apiservice';


@IonicPage()
@Component({
    selector: 'page-about',
    templateUrl: 'about.html',
})
export class AboutPage {
    data: any = [];
    items: any;
    result: any;
    about_paragraphs : any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private commonservice: Commonservice,
        private apiservice: Apiservice,
    ) {
        this.about();
        console.log("data");
        console.log(this.data);
        console.log("data");
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AboutPage');
    }


    about() {
        this.commonservice.showLoader();
        this.apiservice.aboutTab_data().then((res) => {
            this.commonservice.hideLoader();
            this.result = res;
            if (this.result.RespCode == "2003") {
                this.about_paragraphs = this.result.about_paragraph;
                this.items = this.result.about_tab;
                for (var i = 0; i < this.items.length; i = i + 2) {
                    var obj = {
                        key1: this.items[i],
                        key2: this.items[i + 1]
                    };
                    this.data.push(obj);
                    console.log(this.data);
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

}
