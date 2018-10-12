import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Commonservice } from '../../providers/commonservice';
import { Apiservice } from '../../providers/apiservice';

@IonicPage()
@Component({
    selector: 'page-customersupport',
    templateUrl: 'customersupport.html',
})
export class CustomersupportPage {
    result: any;
    address: String;
    email: String;
    phone: String;
    data = {
        user_id: 0,
        name: '',
        email: '',
        phone: '',
        p_contact: '',
        order_number: '',
        feedback: ''
    };

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private commonservice: Commonservice,
        private apiservice: Apiservice,
    ) {
        this.admindata();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CustomersupportPage');
    }


    admindata() {
        this.commonservice.showLoader();
        this.apiservice.getAdminInfo().then((res) => {
            this.commonservice.hideLoader();
            this.result = res;
            if (this.result.RespCode == "2003") {
                this.address = this.result.admin_detail.address;
                this.email = this.result.admin_detail.email;
                this.phone = this.result.admin_detail.phone;
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


    customerSupport() {
        if ((this.data.name == '') && (this.data.email == '') && (this.data.phone == '') && (this.data.p_contact == '') &&
            (this.data.order_number == '') && (this.data.feedback == '')) {
            var msg = 'Please fill all fields';
            this.commonservice.showAlert(msg);
        } else if (this.data.name.trim() == '') {
            var msg = 'Name is blank';
            this.commonservice.showAlert(msg);
        } else if (this.data.email.trim() == '') {
            var msg = 'Email Address is blank';
            this.commonservice.showAlert(msg);
        } else if (this.data.phone.trim() == '') {
            var msg = 'Contact Number is blank';
            this.commonservice.showAlert(msg);
        } else if (this.data.p_contact.trim() == '') {
            var msg = 'Purpose of Contact is blank';
            this.commonservice.showAlert(msg);
        } else if (this.data.order_number.trim() == '') {
            var msg = 'Order Number is blank';
            this.commonservice.showAlert(msg);
        } else if (this.data.feedback.trim() == '') {
            var msg = 'Feedback is blank';
            this.commonservice.showAlert(msg);
        } else {
            this.data.user_id = 10;
            this.commonservice.showLoader();
            debugger;
            this.apiservice.addCustomerSupport(this.data).then((res) => {
                this.commonservice.hideLoader();
                this.result = res;
                if (this.result.RespCode == "2033") {
                } else {
                    var msg = 'Please try agian';
                    this.commonservice.showAlert(msg);
                }
            }, (err) => {
                this.commonservice.hideLoader();
                var msg = 'Please check your internet connection or wait for server to respond';
                this.commonservice.showAlert(msg);
            });

        }
    }

}
