import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ModalController } from 'ionic-angular';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
    rootPage: any = 'ProfiletransactionPage';
    aboutus: boolean = false;
    pages: Array<{ title: string, component: any }>;
    aboutPages: Array<{ title: string, component: any }>;
    

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,public modalCtrl: ModalController) {
        
        this.initializeApp();
        this.pages = [
            // { title: 'Home', component: 'HomePage' },
            // { title: 'Video Capture', component: 'VideoPage' },
            { title: 'Notifications', component: 'NotificationPage' },
            { title: 'Inbox', component: 'InboxPage' },            
            { title: 'My upcoming trips', component: 'MyupcomingtripPage' },
            { title: 'My Travel checklist', component: 'MytravelchecklistPage' },
            { title: 'Recent likes', component: 'RecentlikesPage' },
            { title: 'Rate and review us', component: 'RateandreviewusPage' },
            { title: 'Settings', component: 'SettingPage' },
            { title: 'Follow and like us', component: 'FollowandlikeusPage' }, 
        ];

    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    openPage(page) {
        this.aboutus = false;
        this.nav.setRoot(page.component);
    }

    openAboutUs() {
        this.aboutus = true;
        this.aboutPages = [
            { title: 'About TAB', component: 'AboutPage' },
            { title: 'Partnership', component: 'PartnershipPage' },
            { title: 'How it works', component: 'HowworksPage' },
            { title: 'Customer support', component: 'CustomersupportPage' },
            { title: 'FAQs', component: 'FaqPage' },
        ]
    }

    addrequest(){
        // this.nav.push('AddrequestPage')
        const modal = this.modalCtrl.create('AddrequestPage');
        modal.present();
    }


    addtravel() {
        const modal = this.modalCtrl.create('AddTravelPage');
        modal.present();
    }


    mycart(){ 
        this.nav.push('MycartPage');
    }
    
}
