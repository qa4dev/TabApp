import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

// let apiUrl = 'http://vrundaily.com/vrun';
let apiUrl = 'http://223.196.72.250/takeacross';




@Injectable()

export class Apiservice {
    Promise: any;
    resolve: any;
    reject: any;
    constructor(public http: Http, private transfer: FileTransfer,
    ) {
        console.log('Hello Apiservice');       
    }

    userlogin(credential) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json; charset=UTF-8');
            this.http.post(apiUrl+'/api/login', credential, { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }


    userSocialLogin(credential) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json; charset=UTF-8');
            this.http.post(apiUrl + '/api/Social_login', credential, { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                    console.log(res);
                }, (err) => {
                    reject(err);
                    console.log(err);
                    
                });
        });
    }

    usersignup(credential) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json; charset=UTF-8');
            this.http.post(apiUrl + '/api/signup', credential, { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }
    
    ForgotPassword(credential) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type','application/json; charset=UTF-8');
            this.http.post(apiUrl+'/api/forgotpassword', credential, { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }


    homepage_data(credential) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type','application/json; charset=UTF-8');
            this.http.post(apiUrl+'/api/Get_homePAge_Data', credential, { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }


    getcountries() {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json; charset=UTF-8');
            this.http.get(apiUrl + '/api/Get_countryList')
                .subscribe(res => {
                    resolve(res.json());
                    console.log(res.json())
                }, (err) => {
                    reject(err);
                });
        });
    }

    addTravel(credential) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json; charset=UTF-8');
            this.http.post(apiUrl + '/api/AddTravel', credential, { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }


    ProductCategories() {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json; charset=UTF-8');
            this.http.get(apiUrl + '/api/Get_Product_category')
                .subscribe(res => {
                    resolve(res.json());
                    console.log(res.json())
                }, (err) => {
                    reject(err);
                });
        });
    }

    deliveryMethod() {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json; charset=UTF-8');
            this.http.get(apiUrl + '/api/Get_shipping_meth')
                .subscribe(res => {
                    resolve(res.json());
                    console.log(res.json())
                }, (err) => {
                    reject(err);
                });
        });
    }


    addUserRequest(credential) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json; charset=UTF-8');
            this.http.post(apiUrl + '/api/add_user_request', credential, { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }


    faq_data() {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json; charset=UTF-8');
            this.http.get('http://223.196.72.250/across_border/api/fetch_faq/')
                .subscribe(res => {
                    resolve(res.json());
                    console.log(res.json())
                }, (err) => {
                    reject(err);
                });
        });
    }


    getAdminInfo() {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json; charset=UTF-8');
            this.http.get('http://223.196.72.250/across_border/api/Get_Admin_Detail/')
                .subscribe(res => {
                    resolve(res.json());
                    console.log(res.json())
                }, (err) => {
                    reject(err);
                });
        });
    }


    addCustomerSupport(credential) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json; charset=UTF-8');
            this.http.post('http://223.196.72.250/across_border/api/add_customer_support', credential, { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }


    howWorks_data() {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json; charset=UTF-8');
            this.http.get('http://223.196.72.250/across_border/api/how_it_work/')
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }


    aboutTab_data() {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json; charset=UTF-8');
            this.http.get('http://223.196.72.250/across_border/api/about_tab/')
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }


    partnership_data() {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json; charset=UTF-8');
            this.http.get('http://223.196.72.250/across_border/api/partnership/')
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }


    moments_data() {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json; charset=UTF-8');
            this.http.get('http://223.196.72.250/takeacross/api/fetch_moments/')
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }


    saveMomentText(params) {
        return new Promise((resolve, reject) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json; charset=UTF-8');
            this.http.post('http://223.196.72.250/takeacross/api/add_moments_text/', params, { headers: headers })
                .subscribe(res => {
                    resolve(res.json());
                }, (err) => {
                    reject(err);
                });
        });
    }


}
