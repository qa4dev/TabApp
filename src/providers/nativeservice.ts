import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { IOSFilePicker } from '@ionic-native/file-picker';
import { Platform } from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Commonservice } from './commonservice';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { Apiservice } from './apiservice';


@Injectable()
export class Nativeservice {
    loading: any;
    alert: any;
    image: any;
    Promise: any;
    resolve: any;
    reject: any;
    cameraPhoto: any;
    locationAddress: any;
    title: any;

    constructor(
        private camera: Camera,
        private mediaCapture: MediaCapture,
        private file: File,
        private fileChooser: FileChooser,
        private filePath: FilePath,
        private filePicker: IOSFilePicker,
        public plt: Platform,
        private transfer: FileTransfer,
        private commonservice: Commonservice,
        private geolocation: Geolocation,
        private nativeGeocoder: NativeGeocoder,
        private apiservice: Apiservice,        

    ) {
        console.log('Hello Nativeservice');
    }


    getpicture(sourceType) {
        return new Promise((resolve, reject) => {
            var options = {
                quality: 50,
                destinationType: this.camera.DestinationType.FILE_URI,
                encodingType: this.camera.EncodingType.JPEG,
                mediaType: this.camera.MediaType.PICTURE,
                sourceType: sourceType,
                correctOrientation: true
            };
            this.camera.getPicture(options).then((res) => {
                resolve(res)
            }, (err) => {
                console.log(err);
                reject(err);
            });
        });
    }


    captureAudio() {
        return new Promise((resolve, reject) => {
            this.mediaCapture.captureAudio().then(res => {
                resolve(res)
            }, (err: CaptureError) => {
                console.log(err);
                reject(err);
            });
        });
    }

    captureVideo() {
        return new Promise((resolve, reject) => {
            let options: CaptureVideoOptions = {
                limit: 1,
                duration: 30
            }
            this.mediaCapture.captureVideo(options).then((res: MediaFile[]) => {
                resolve(res)
            }, (err) => {
                console.log(err);
                reject(err);
            });
        });
    }


    chooseFile() {
        return new Promise((resolve, reject) => {
            if (this.plt.is('ios')) {
                console.log('I am an iOS device!');
                this.filePicker.pickFile().then(res => {
                    console.log(res)
                    resolve(res);
                }).catch(err => {
                    console.log('Error', err)
                    reject(err);
                });
            } else {
                console.log('I am an Android device!');
                this.fileChooser.open().then(res => {
                    console.log(res)
                    this.filePath.resolveNativePath(res).then(filePath => {
                        resolve(filePath)
                    }).catch(err => {
                        console.log(err)
                    });
                }, (err) => {
                    console.log(err);
                    reject(err);
                });
            }

        });
    }


    uploadFile(fileurl, fileType) {
        var self = this;
        return new Promise((resolve, reject) => {
            self.location().then(onsuccess, onerror);
            function onsuccess(res) {
                self.latLongToAddress(res.coords.latitude, res.coords.longitude).then(success, error);
                function success(res) {
                    self.locationAddress = res.subThoroughfare + ',' + res.thoroughfare + ',' + res.locality + ',' + res.administrativeArea + ',' + res.countryName;
                    console.log("Address");
                    console.log(self.locationAddress);
                    console.log("Address");
                    let title = 'Enter Title';
                    self.commonservice.PromptAlert(title).then(suc, err);
                    function suc(res) {
                        self.title = res.mediatitle;
                        console.log(self.title);
                        if(fileType == 'text'){
                            var params = {
                                'userid': 2,
                                'title': self.title,
                                'location': self.locationAddress,
                                'datatype': fileType,
                                'text': fileurl
                            };
                            self.apiservice.saveMomentText(params).then((res) => {
                                resolve(res);
                            }).catch((err) => {
                                var error = 'Please try again';
                                reject(err);
                            });
                        }else{
                            self.uploadMedia(fileurl, fileType).then((res) => {
                                resolve(res);
                            }).catch((err) => {
                                reject(err);
                            });
                        }
                    }

                    function err(err) {
                        self.title = err.mediatitle;
                        console.log(self.title); 
                        if(fileType == 'text'){
                            var params = {
                                'userid': 2,
                                'title': self.title,
                                'location': self.locationAddress,
                                'datatype': fileType,
                                'text': fileurl
                            };
                            self.apiservice.saveMomentText(params).then((res) => {
                                resolve(res);
                            }).catch((err) => {
                                var error = 'Please try again';
                                reject(err);
                            });
                        }else{             
                            self.uploadMedia(fileurl, fileType).then((res) => {
                                resolve(res);
                            }).catch((err) => {
                                reject(err);
                            });
                        }
                    }

                }
                function error(err) {
                    reject(err);
                }
            }

            function onerror(err) {
                reject(err);
            }
        });
    }


    location() {
        var self = this;
        return new Promise((resolve, reject) => {
            this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((res) => {
                resolve(res);
            }).catch((err) => {
                console.log('Error getting location', err);
                var error = 'Error in getting location';
                reject(error);
            });

        });
    }


    latLongToAddress(latitude, longitude) {
        return new Promise((resolve, reject) => {
            let options: NativeGeocoderOptions = {
                useLocale: true,
                maxResults: 5
            };
            this.nativeGeocoder.reverseGeocode(latitude, longitude, options)
                .then((result: NativeGeocoderReverseResult[]) => {
                    resolve(result[0]);
                }).catch((error: any) => {
                    var err = 'Error in getting Address';
                    reject(err);
                });
        });
    }


    uploadMedia(fileurl, fileType) {
        return new Promise((resolve, reject) => {
            var fileTransfer = this.transfer.create();
            var options = {
                fileKey: "file",
                fileName: 'ionicfile',
                chunkedMode: false,
                mimeType: "multipart/form-data",
                params: {
                    'userid': 2,
                    'title': this.title,
                    'location': this.locationAddress,
                    'datatype': fileType
                },
            };
            fileTransfer.upload(fileurl, 'http://223.196.72.250/takeacross/viedoupload.php', options).then(function (res) {
                resolve(res);
            }, function (err) {
                console.log(err);
                var error = 'Please try again';
                reject(error);
            });
        });
    }



}
