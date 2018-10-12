import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { Commonservice } from '../../providers/commonservice';
import { Apiservice } from '../../providers/apiservice';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
    selector: 'page-add-travel',
    templateUrl: 'add-travel.html',
})
export class AddTravelPage {
    character;
    result: any;
    countries: any = [];
    data = {
        user_id: '',
        country_code: '',
        departureDate: '',
        arrivalDate: '',
    };
    name: any;
    mindate: any;
    maxdate: any;

    constructor(
        public navCtrl: NavController,
        public viewCtrl: ViewController,
        private commonservice: Commonservice,
        private apiservice: Apiservice,
        public storage: Storage
        
    ) {  
        this.storage.get('UserData').then((Userdata) => {
            this.name = Userdata.username;
            this.data.user_id = Userdata.id;
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
            this.commonservice.hideLoader();
            this.result = res;
            console.log(this.result);
            if (this.result.RespCode == "7012") {
                this.countries = this.result.Country_list;
            } else {
                var msg = 'Countries not avialable';
                this.commonservice.showAlert(msg);
            }
        }, (err) => {
            this.commonservice.hideLoader();
            var msg = 'Please check your internet connection or wait for server to respond';
            this.commonservice.showAlert(msg);
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AddTravelPage');
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }


    saveTravel() {
        console.log(this.data);
        debugger;
        if ((this.data.country_code == '') && (this.data.departureDate == '') && (this.data.arrivalDate == '')) {
            var msg = 'Please fill all fields';
            this.commonservice.showAlert(msg);
        } else if (this.data.country_code == '') {
            var msg = 'Country is blank';
            this.commonservice.showAlert(msg);
        } else if (this.data.departureDate == '') {
            var msg = 'Departure Date is blank';
            this.commonservice.showAlert(msg);
        } else if (this.data.arrivalDate == '') {
            var msg = 'Arrival Date is blank';
            this.commonservice.showAlert(msg);
        } else {
            if(this.data.arrivalDate >= this.data.departureDate){
                this.commonservice.showLoader();
                console.log("data");
                console.log(this.data);
                console.log("data");
                debugger;
                this.apiservice.addTravel(this.data).then((res) => {
                    this.commonservice.hideLoader();
                    this.result = res;
                    console.log(this.result);
                    if (this.result.RespCode == "7014") {
                        var msg = 'Travel add successfully';
                        this.commonservice.showAlert(msg);
                    } else {
                        var msg = 'Please try agian';
                        this.commonservice.showAlert(msg);
                    }
                }, (err) => {
                    this.commonservice.hideLoader();
                    var msg = 'Please check your internet connection or wait for server to respond';
                    this.commonservice.showAlert(msg);
                });
            }else{
                var msg = 'Arrival Date should be greater than Departure Date';
                this.commonservice.showAlert(msg);
            }
           
        }
    }
}
