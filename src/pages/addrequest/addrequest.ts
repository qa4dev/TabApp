import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ViewController } from 'ionic-angular';
import { Nativeservice } from '../../providers/nativeservice';
import { Commonservice } from '../../providers/commonservice';
import { Apiservice } from '../../providers/apiservice';
import {DomSanitizer} from '@angular/platform-browser';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
    selector: 'page-addrequest',
    templateUrl: 'addrequest.html',
})
export class AddrequestPage {
    result: any;
    countries: any = [];
    productcategories: any = [];
    shippingmethods: any = [];
    data = {
        author_id: '',
        product_name: '',
        product_desc: '',
        receipt: '',
        authenticitycard: '',
        category: '',
        size: '',
        referencewebsite: '',
        accept_to_recive_on: '',
        country_code: '',
        shipping_method: '',
        prishable: '',
        fragile: '',
        pay_per_unit: '',
        qty: '',
        payable_amount: '',
        picture:''
    };
    mindate: any;
    maxdate: any;    
    
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public nativeservice: Nativeservice,
        public actionSheetCtrl: ActionSheetController,
        private commonservice: Commonservice,
        private apiservice: Apiservice,
        public viewCtrl: ViewController,
        domSanitizer: DomSanitizer,
        public storage: Storage
        
    ) {
        this.storage.get('UserData').then((Userdata) => {
            this.data.author_id = Userdata.id;
        });
        this.mindate = new Date().toJSON().split('T')[0];
        this.maxdate = new Date();        
        this.maxdate.setFullYear(this.maxdate.getFullYear() + 50);
        this.maxdate = this.maxdate.toJSON().split('T')[0];
        this.getCountries();
    }

    getCountries() {
        this.commonservice.showLoader();
        this.apiservice.getcountries().then((res) => {
            this.result = res;
            if (this.result.RespCode == "7012") {
                this.countries = this.result.Country_list;
                this.apiservice.ProductCategories().then((res) => {
                    this.result = res;
                    if (this.result.RespCode == "2003") {
                        this.productcategories = this.result.category_data;
                        this.apiservice.deliveryMethod().then((res) => {
                            this.commonservice.hideLoader();                    
                            this.result = res;
                            if (this.result.RespCode == "2003") {
                                this.shippingmethods = this.result.Shipping_method;
                            } else {
                                var msg = 'Shipping Methods not avialable';
                                this.commonservice.showAlert(msg);
                            }
                        }, (err) => {
                            this.commonservice.hideLoader();
                            var msg = 'Please check your internet connection or wait for server to respond';
                            this.commonservice.showAlert(msg);
                        });
                    } else {
                        this.commonservice.hideLoader();            
                        var msg = 'Product Categories not avialable';
                        this.commonservice.showAlert(msg);
                    }
                }, (err) => {
                    this.commonservice.hideLoader();
                    var msg = 'Please check your internet connection or wait for server to respond';
                    this.commonservice.showAlert(msg);
                });
            
            } else {
                this.commonservice.hideLoader();            
                var msg = 'Countries not avialable';
                this.commonservice.showAlert(msg);
            }
        }, (err) => {
            this.commonservice.hideLoader();
            var msg = 'Please check your internet connection or wait for server to respond';
            this.commonservice.showAlert(msg);
        });
    }


    uploadPhoto() {
        const actionSheet = this.actionSheetCtrl.create({
            title: 'Upload Or Capture Photo',
            buttons: [
                {
                    text: 'Camera',
                    handler: () => {
                        var self = this;
                        this.nativeservice.getpicture(1).then(onsuccess, onerror);
                        function onsuccess(res){
                            self.data.picture = res;                                               
                        }
                
                        function onerror(err){
                            var msg = 'Please try again';                            
                            self.commonservice.showAlert(msg);
                        }
                    }
                }, {
                    text: 'Gallery',
                    handler: () => {
                        var self = this;
                        this.nativeservice.getpicture(0).then(onsuccess, onerror);
                        function onsuccess(res){
                            self.data.picture = res;                                               
                        }
                
                        function onerror(err){
                            var msg = 'Please try again';                            
                            self.commonservice.showAlert(msg);
                        }                        
                    }
                }, {
                    text: 'Cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
        
    }


    ionViewDidLoad() {
        console.log('ionViewDidLoad AddrequestPage');
    }


    saveRequest(){
        debugger;
        this.apiservice.addUserRequest(this.data).then((res) => {
            this.commonservice.hideLoader();
            this.result = res;
            console.log(this.result);
            if (this.result.RespCode == "7016") {
                this.viewCtrl.dismiss();
            } else {
                var msg = 'Request not added successfully';
                this.commonservice.showAlert(msg);
            }
        }, (err) => {
            this.commonservice.hideLoader();
            var msg = 'Please check your internet connection or wait for server to respond';
            this.commonservice.showAlert(msg);
        });
    }


    dismiss() {
        this.viewCtrl.dismiss();
    }


}
