import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Commonservice } from '../../providers/commonservice';
import { Apiservice } from '../../providers/apiservice';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html',
})
export class SignupPage {
    result: any;
    data = {
        username: '',
        email: '',
        password: '',
        confirmpassword: '',
        mobile_number: ''
    };
    
    constructor(
        public navCtrl: NavController,
        private commonservice: Commonservice,
        private apiservice: Apiservice,
        private alertCtrl: AlertController,
        public storage: Storage
        
    ) {
    }

    Signup() {
        console.log(this.data);
        if ((this.data.username == '') && (this.data.email == '') && (this.data.password == '') && (this.data.mobile_number == '')) {
            var msg = 'Please fill all fields';
            this.commonservice.showAlert(msg);
        } else if (this.data.username.trim() == '') {
            var msg = 'Username is blank';
            this.commonservice.showAlert(msg);
        } else if (this.data.email.trim() == '') {
            var msg = 'Email is blank';
            this.commonservice.showAlert(msg);
        } else if (this.data.mobile_number.trim() == '') {
            var msg = 'Mobile Number is blank';
            this.commonservice.showAlert(msg);
        } else {
            if(this.commonservice.ValidateEmail(this.data.email.trim())){ 
                if (this.data.confirmpassword == this.data.password) {
                    this.commonservice.showLoader();
                    this.apiservice.usersignup(this.data).then((res) => {
                        this.commonservice.hideLoader();
                        this.result = res;
                        console.log(this.result);
                        if (this.result.RespCode == "1004") {
                            this.commonservice.showAlert(this.result.Message); 
                            this.storage.set('UserData', this.result.user_data).then((Userdata) => {
                                this.navCtrl.setRoot('HomePage');
                            });
                        } else {
                            var msg = 'Please try agian';                            
                            this.commonservice.showAlert(msg);
                        }
                    }, (err) => {
                        this.commonservice.hideLoader();
                        var msg = 'Please check your internet connection or wait for server to respond';
                        this.commonservice.showAlert(msg);
                    });
                } else {
                    var msg = 'Password and Confirm Password not match';
                    this.commonservice.showAlert(msg);
                }
            }else{
                var msg = 'You have entered an invalid email address';
                this.commonservice.showAlert(msg);
            }
        }
    }
    
    ValidateNumber(event: any) {
        if (!this.commonservice.ValidationNumber(event)) {
            this.data.mobile_number = this.data.mobile_number.slice(0, -1);
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SignupPage');
    }

}
