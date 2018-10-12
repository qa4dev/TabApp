import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Commonservice } from '../../providers/commonservice';
import { Apiservice } from '../../providers/apiservice';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    loginstatus: any;
    userfbData: any;
    result: any;
    data = {
        username: '',
        password: '',
        remember: false
    };

    constructor(
        public navCtrl: NavController,
        private fb: Facebook,
        private platform: Platform,
        private commonservice: Commonservice,
        private apiservice: Apiservice,
        private alertCtrl: AlertController,
        public storage: Storage
    ) {
        this.storage.get('rememberData').then((rememberdata) => {
            if (rememberdata.remember == true) {
                this.data.username = rememberdata.username;
                this.data.password = rememberdata.password;
            }
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }

  

    Login() {
        console.log(this.data);
        if (this.data.username == '' && this.data.password == '') {
            var msg = 'Username and Password are blank';
            this.commonservice.showAlert(msg);
        } else if (this.data.username.trim() == '') {
            var msg = 'Username is blank';
            this.commonservice.showAlert(msg);
        } else if (this.data.password == '') {
            var msg = 'Password is blank';
            this.commonservice.showAlert(msg);
        } else {
            console.log("data");
            console.log(this.data);            
            this.storage.set('rememberData',this.data);
            this.commonservice.showLoader();
            this.apiservice.userlogin(this.data).then((res) => {
                this.commonservice.hideLoader();
                this.result = res;
                if (this.result.RespCode == "1001") {
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
        }
    }

    fbLogin() {
        this.commonservice.showLoader();
        this.commonservice.hideLoader();
        this.storage.get('UserData').then((userdata) => {
            if (userdata == null) {
                let alert = this.alertCtrl.create({
                    title: 'You are already loggedin',
                    buttons: ['Ok']
                });
                alert.present();
                this.navCtrl.setRoot('HomePage');
            } else {
                var self = this;
                this.platform.ready().then(() => {
                    let permissions = new Array<string>();
                    permissions = ["public_profile", 'email'];
                    this.fb.getLoginStatus().then(res => {
                        self.loginstatus = res;
                        if (self.loginstatus.status === 'connected') {
                            let userId = res.authResponse.userID;
                            let params = new Array<string>();
                            this.fb.api("/me?fields=email,name", params).then(function (user) {
                                let userImage = "https://graph.facebook.com/" + userId + "/picture?type=large";
                                self.userfbData = { socialid: user['id'], email: user['email'], picture: userImage, username: user['name'] }
                                console.log("userfbData")
                                console.log(self.userfbData)
                                console.log("userfbData")
                                self.commonservice.showLoader();
                                self.apiservice.userSocialLogin(self.userfbData).then((res) => {
                                    self.commonservice.hideLoader();
                                    self.result = res;
                                    console.log("result");
                                    console.log(self.result);
                                    console.log("result");
                                    if (self.result.RespCode == "1001") {
                                        self.storage.set('UserData', self.result.user_data).then((Userdata) => {
                                            self.navCtrl.setRoot('HomePage');
                                        });
                                    } else {
                                        self.commonservice.showAlert(self.result.Message);
                                    }
                                }, (err) => {
                                    self.commonservice.hideLoader();
                                    var msg = 'Please check your internet connection or wait for server to respond';
                                    self.commonservice.showAlert(self.result.Message);
                                });
                            });
                        } else if (this.loginstatus.status === 'not_authorized') {
                            alert(self.loginstatus.status)
                            this.fb.login(permissions).then((response) => {
                                console.log(response);
                                let userId = response.authResponse.userID;
                                let params = new Array<string>();
                                this.fb.api("/me?fields=email,name", params).then(function (user) {
                                    let userImage = "https://graph.facebook.com/" + userId + "/picture?type=large";
                                    self.userfbData = { socialid: user['id'], email: user['email'], picture: userImage, username: user['name'] };
                                    console.log("userfbData")
                                    console.log(self.userfbData)
                                    console.log("userfbData")
                                    self.commonservice.showLoader();
                                    self.apiservice.userSocialLogin(self.userfbData).then((res) => {
                                        self.commonservice.hideLoader();
                                        self.result = res;
                                        console.log("result");
                                        console.log(self.result);
                                        console.log("result");
                                        if (self.result.RespCode == "1001") {
                                            self.storage.set('UserData', self.result.user_data).then((Userdata) => {
                                                self.navCtrl.setRoot('HomePage');
                                            });
                                        } else {
                                            self.commonservice.showAlert(self.result.Message);
                                        }
                                    }, (err) => {
                                        self.commonservice.hideLoader();
                                        var msg = 'Please check your internet connection or wait for server to respond';
                                        self.commonservice.showAlert(self.result.Message);
                                    });
                                });
                            }).catch((error) => {
                                console.log("facebook login error", error);
                            });
                        } else {
                            this.fb.login(permissions).then((response) => {
                                console.log(response);
                                let userId = response.authResponse.userID;
                                let params = new Array<string>();
                                this.fb.api("/me?fields=email,name", params).then(function (user) {
                                    let userImage = "https://graph.facebook.com/" + userId + "/picture?type=large";
                                    self.userfbData = { socialid: user['id'], email: user['email'], picture: userImage, username: user['name'] }
                                    console.log("userfbData")
                                    console.log(self.userfbData)
                                    console.log("userfbData")
                                    self.commonservice.showLoader();
                                    self.apiservice.userSocialLogin(self.userfbData).then((res) => {
                                        self.commonservice.hideLoader();
                                        self.result = res;
                                        console.log("result");
                                        console.log(self.result);
                                        console.log("result");
                                        if (self.result.RespCode == "1001") {
                                            self.storage.set('UserData', self.result.user_data).then((Userdata) => {
                                                self.navCtrl.setRoot('HomePage');
                                            });
                                        } else {
                                            self.commonservice.showAlert(self.result.Message);
                                        }
                                    }, (err) => {
                                        self.commonservice.hideLoader();
                                        var msg = 'Please check your internet connection or wait for server to respond';
                                        self.commonservice.showAlert(self.result.Message);
                                    });
                                });
                            }).catch((error) => {
                                console.log("facebook login error", error);
                            });
                        }
                    }).catch((error) => {
                        console.log("facebook failure: " + JSON.stringify(error));
                    })
                })
            }
        });

    }


    ForgotPassword() {
        const prompt = this.alertCtrl.create({
            title: 'Email',
            message: "Enter your email address",
            inputs: [
                {
                    name: 'email',
                    placeholder: 'Email Address'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Submit',
                    handler: data => {
                        var forgotemail = {
                            email: data.email
                        }
                        if (data.email.trim() != '') {
                            this.commonservice.showLoader();
                            this.apiservice.ForgotPassword(forgotemail).then((res) => {
                                this.commonservice.hideLoader();
                                this.result = res;
                                console.log(this.result);
                                if (this.result.RespCode == "1010") {
                                    var title = 'Success'
                                    this.commonservice.AlertWithTitle(title, this.result.Message);
                                    this.navCtrl.setRoot('LoginPage');
                                } else {
                                    this.commonservice.showAlert(this.result.Message);
                                }
                            }, (err) => {
                                this.commonservice.hideLoader();
                                var msg = 'Please check your internet connection or wait for server to respond';
                                this.commonservice.showAlert(msg);
                            });
                        } else {
                            var msg = 'Email is blank';
                            this.commonservice.showAlert(msg);
                        }
                    }
                }
            ]
        });
        prompt.present();
    }

    
    googleLogin(){
        alert("googleLogin")
    }


    SignUp() {
        this.navCtrl.push('SignupPage')
    }
}
