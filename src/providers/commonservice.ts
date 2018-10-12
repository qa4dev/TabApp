import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from 'ionic-angular';


@Injectable()
export class Commonservice {
    loading: any;
    alert: any;

    constructor(
        private loadingCtrl: LoadingController,
        private alertCtrl: AlertController,
    ) {
        console.log('Hello Commonservice');
    }

    showLoader() {
        this.loading = this.loadingCtrl.create({
            spinner: 'ios',
        });
        this.loading.present();
    }

    hideLoader() {
        this.loading.dismiss();
    }

    showAlert(msg) {
        this.alert = this.alertCtrl.create({
            title: msg,
            buttons: [
                {
                    text: 'Ok',
                }
            ]
        });
        this.alert.present();
    }

    ValidateEmail(email) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.trim())) {
            return true;
        } else {
            return false;
        }
    }

    ValidationNumber(number) {
        let num = number.target.value;
        if (isNaN(num) || num.indexOf(" ") != -1) {
            var msg = 'Enter numeric value';
            this.showAlert(msg);
            return false;
        } else if (num.length > 10) {
            var msg = 'Enter minimum 10 characters';
            this.showAlert(msg);
            return false;
        } else {
            return true;
        }
      
    }

    AlertWithTitle(title, msg) {
        this.alert = this.alertCtrl.create({
            title: title,
            subTitle: msg,
            buttons: [
                {
                    text: 'Ok',
                }
            ]
        });
        this.alert.present();
    }


    PromptAlert(title) {
        return new Promise((resolve, reject) => {
            const prompt = this.alertCtrl.create({
                title: title,
                inputs: [
                    {
                        name: 'mediatitle',
                        placeholder: title
                    },
                ],
                buttons: [
                    {
                        text: 'Cancel',
                        handler: data => {
                            resolve(data);
                        }
                    },
                    {
                        text: 'Save',
                        handler: data => {
                            reject(data);
                        }
                    }
                ]
            });
            prompt.present();
        });
    }


}
