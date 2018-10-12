import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Commonservice } from '../../providers/commonservice';
import { Apiservice } from '../../providers/apiservice';


@IonicPage()
@Component({
    selector: 'page-faq',
    templateUrl: 'faq.html',
})
export class FaqPage {
    result: any;
    faqs: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private commonservice: Commonservice,
        private apiservice: Apiservice,
    ) {
        this.faqdata();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad FaqPage');
    }


    faqdata(){
        this.commonservice.showLoader();
        this.apiservice.faq_data().then((res) => {
            this.commonservice.hideLoader();
            this.result = res;
            
            if (this.result.RespCode == "2003") {
                this.faqs = this.result.FAQ;
                console.log(this.faqs)            
                for(let data of this.faqs) {             
                    data.show = false;
                }
            } else {
                var msg = 'Data not fetch successfully';            
                this.commonservice.showAlert(msg);
            }
            console.log(this.faqs)
            
        }, (err) => {
            this.commonservice.hideLoader();
            var msg = 'Please check your internet connection or wait for server to respond';
            this.commonservice.showAlert(msg);
        });
    }


    showAns(faqid){
        for(let data of this.faqs) {
            if(data.id == faqid){
                data.show = true;            
            }        
        }
    }
    

    hideAns(faqid){
        for(let data of this.faqs) {
            if(data.id == faqid){
                data.show = false;
            }
        }
    }

}
