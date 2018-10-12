import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ModalController } from 'ionic-angular';
import { Nativeservice } from '../../providers/nativeservice';
import { Commonservice } from '../../providers/commonservice';
import { Apiservice } from '../../providers/apiservice';
import {ViewChild,  ElementRef } from '@angular/core';
import * as $ from "jquery";


const MEDIA_FILES_KEY = 'mediaFiles';
@IonicPage()
@Component({
    selector: 'page-moments',
    templateUrl: 'moments.html',
})
export class MomentsPage {
    data: any = [];
    items: any;
    result: any;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public actionSheetCtrl: ActionSheetController,
        public nativeservice: Nativeservice,
        private commonservice: Commonservice,
        private apiservice: Apiservice,
        public modalCtrl: ModalController,
        private elementRef:ElementRef

    ) {
        this.moments();
    }


    moments() {
        this.commonservice.showLoader();
        this.apiservice.moments_data().then((res) => {
            this.commonservice.hideLoader();
            this.result = res;
            console.log(this.result)
            if (this.result.RespCode == "2003") {
                this.data = this.result.Data;
                // for (var i = 0; i < this.items.length; i = i + 2) {
                //     var obj = {
                //         key1: this.items[i],
                //         key2: this.items[i + 1]
                //     };
                //     this.data.push(obj);
                //     console.log(this.data);
                // }
            } else {
                var msg = 'Data not available';
                this.commonservice.showAlert(msg);
            }
        }, (err) => {
            this.commonservice.hideLoader();
            var msg = 'Please check your internet connection or wait for server to respond';
            this.commonservice.showAlert(msg);
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad MomentsPage');
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = "/assets/js/custom.js";
        this.elementRef.nativeElement.appendChild(s);

        console.log('ionViewDidLoad HomePage');
    }


    travelmoments() {
        var self = this;
        const actionSheet = this.actionSheetCtrl.create({
            title: 'Please select one option',
            buttons: [
                {
                    text: 'Video',
                    handler: () => {
                        this.nativeservice.captureVideo().then(onsuccess, onerror);
                        function onsuccess(res) {
                            var videoUrl = res[0].fullPath;
                            console.log("Video");
                            console.log(videoUrl);
                            console.log("Video");
                            self.commonservice.showLoader();
                            let filetype = 'video';
                            self.nativeservice.uploadFile(videoUrl, filetype).then(onsuccess, onerror);
                            function onsuccess(res) {
                                self.commonservice.hideLoader();
                                self.result = JSON.parse(res.response);
                                console.log(self.result);
                                if (self.result.RespCode == "8881") {
                                    self.data = [];
                                    var msg = 'Video Upload successfully';
                                    self.commonservice.showAlert(msg);
                                    self.items = self.result.Data;
                                    for (var i = 0; i < self.items.length; i = i + 2) {
                                        var obj = {
                                            key1: self.items[i],
                                            key2: self.items[i + 1]
                                        };
                                        self.data.push(obj);
                                        console.log("Nizam data");
                                        console.log(self.data);
                                        console.log("Nizam data");
                                    }
                                } else {
                                    var msg = 'Data not available';
                                    self.commonservice.showAlert(msg);
                                }


                            }
                            function onerror(err) {
                                self.commonservice.hideLoader();
                                self.commonservice.showAlert(err);
                            }
                        }

                        function onerror(err) {
                            self.commonservice.showAlert(err);
                        }
                    }
                }, {
                    text: 'Camera',
                    handler: () => {
                        this.nativeservice.getpicture(1).then(onsuccess, onerror);
                        function onsuccess(res) {
                            var cameraPicture = res;
                            console.log("cameraPicture")
                            console.log(cameraPicture)
                            console.log("cameraPicture")
                            self.commonservice.showLoader();
                            let filetype = 'image';
                            self.nativeservice.uploadFile(cameraPicture, filetype).then(onsuccess, onerror);
                            function onsuccess(res) {
                                self.commonservice.hideLoader();
                                self.result = JSON.parse(res.response);
                                console.log(self.result);
                                if (self.result.RespCode == "8881") {
                                    self.data = [];
                                    var msg = 'File Upload successfully';
                                    self.commonservice.showAlert(msg);
                                    self.items = self.result.Data;
                                    for (var i = 0; i < self.items.length; i = i + 2) {
                                        var obj = {
                                            key1: self.items[i],
                                            key2: self.items[i + 1]
                                        };
                                        self.data.push(obj);
                                        console.log("Nizam data");
                                        console.log(self.data);
                                        console.log("Nizam data");
                                    }
                                } else {
                                    var msg = 'Data not available';
                                    self.commonservice.showAlert(msg);
                                }
                            }
                            function onerror(err) {
                                self.commonservice.hideLoader();
                                self.commonservice.showAlert(err);
                            }
                        }

                        function onerror(err) {
                            self.commonservice.showAlert(err);
                        }
                    }
                }, {
                    text: 'Text',
                    handler: () => {
                        let title = "Write something here";
                        this.MomentTextModal().then(onsuccess, onerror);
                        function onsuccess(res) {
                            var modalData = res;
                            console.log("Nizam data");
                            console.log(modalData.text);
                            console.log("Nizam data");
                            self.commonservice.showLoader();
                            let filetype = 'text';                            
                            self.nativeservice.uploadFile(modalData.text, filetype).then(onsuccess, onerror);
                            function onsuccess(res) {
                                self.commonservice.hideLoader();
                                self.result = res;
                                console.log(self.result);
                                if (self.result.RespCode == "2003") {
                                    self.data = [];
                                    var msg = 'File Upload successfully';
                                    self.commonservice.showAlert(msg);
                                    self.items = self.result.Data;
                                    for (var i = 0; i < self.items.length; i = i + 2) {
                                        var obj = {
                                            key1: self.items[i],
                                            key2: self.items[i + 1]
                                        };
                                        self.data.push(obj);
                                        console.log("Nizam data");
                                        console.log(self.data);
                                        console.log("Nizam data");
                                    }
                                } else {
                                    var msg = 'Data not available';
                                    self.commonservice.showAlert(msg);
                                }
                            }
                            function onerror(err) {
                                self.commonservice.hideLoader();
                                self.commonservice.showAlert(err);
                            }
                        }

                        function onerror(err) {
                            self.commonservice.showAlert(err);
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


    MomentTextModal() {
        return new Promise((resolve, reject) => {
            let profileModal = this.modalCtrl.create('MomenttextPage');
            profileModal.onDidDismiss(data => {
                resolve(data);
            });
            profileModal.present();
        });
    }

}
