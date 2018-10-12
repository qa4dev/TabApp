import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Nativeservice } from '../../providers/nativeservice';
import { Commonservice } from '../../providers/commonservice';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';


const MEDIA_FILES_KEY = 'mediaFiles';
@IonicPage()
@Component({
    selector: 'page-video',
    templateUrl: 'video.html',
})
export class VideoPage {
    mediaFiles = [];
    @ViewChild('myvideo') myVideo: any;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private storage: Storage,
        
        public actionSheetCtrl: ActionSheetController,
        public nativeservice: Nativeservice,
        private commonservice: Commonservice, 
        
    ) {
    }

    ionViewDidLoad() {
        this.storage.get(MEDIA_FILES_KEY).then(res => {
            console.log("res");
            console.log(res);
            console.log("res");
            this.mediaFiles = JSON.parse(res) || [];
            console.log("mediaFiles");
            console.log(this.mediaFiles);
            console.log("mediaFiles");
        })
    }
    

    travelmoments() {
        var self = this;        
        const actionSheet = this.actionSheetCtrl.create({
            title: 'Please select one option',
            buttons: [
                {
                    text: 'Camera',
                    handler: () => {
                        this.nativeservice.getpicture(1).then(onsuccess, onerror);

                        function onsuccess(res){
                            var cameraPicture = res; 
                            self.commonservice.showLoader();                            
                            self.nativeservice.uploadFile(cameraPicture,null).then(onsuccess, onerror);
                            function onsuccess(res){
                                console.log("Image Uploaded");
                                console.log(res);
                                console.log("Image Uploaded");
                                self.commonservice.hideLoader();                                
                                var msg = 'File Upload successfully';                            
                                self.commonservice.showAlert(msg);
                            }
                            function onerror(err){
                                self.commonservice.hideLoader();                                
                                var msg = 'Please try again';                            
                                self.commonservice.showAlert(msg);
                            }
                                                                      
                        }
                
                        function onerror(err){
                            var msg = 'Please try again';                            
                            self.commonservice.showAlert(msg);
                        }
                    }
                },{
                    text: 'Capture Audio',
                    handler: () => {
                        this.nativeservice.captureAudio().then(onsuccess, onerror);
                        function onsuccess(res){
                            var AudioUrl = res[0].fullPath;
                            console.log("Audio");
                            console.log(AudioUrl);
                            console.log("Audio");
                            self.commonservice.showLoader();                            
                            self.nativeservice.uploadFile(AudioUrl,null).then(onsuccess, onerror);
                            function onsuccess(res){
                                console.log("Audio Uploaded");
                                console.log(res);
                                console.log("Audio Uploaded");
                                self.commonservice.hideLoader();                                
                                var msg = 'Audio Upload successfully';                            
                                self.commonservice.showAlert(msg);
                            }
                            function onerror(err){
                                self.commonservice.hideLoader();                                
                                var msg = 'Please try again';                            
                                self.commonservice.showAlert(msg);
                            }                          
                        }
                
                        function onerror(err){
                            var msg = 'Please try again';                            
                            self.commonservice.showAlert(msg);
                        }                        
                    }
                }, {
                    text: 'Capture Video',
                    handler: () => {
                        this.nativeservice.captureVideo().then(onsuccess, onerror);
                        function onsuccess(res){
                            var videoUrl = res[0].fullPath;
                            console.log("Video");
                            console.log(videoUrl);
                            console.log("Video");
                            self.commonservice.showLoader();                            
                            self.nativeservice.uploadFile(videoUrl,null).then(onsuccess, onerror);
                            function onsuccess(res){
                                console.log("Video Uploaded");
                                console.log(res);
                                console.log("Video Uploaded");
                                self.commonservice.hideLoader();                                
                                var msg = 'Video Upload successfully';                            
                                self.commonservice.showAlert(msg);
                            }
                            function onerror(err){
                                self.commonservice.hideLoader();                                
                                var msg = 'Please try again';                            
                                self.commonservice.showAlert(msg);
                            }                                                                          
                        }
                
                        function onerror(){
                            var msg = 'Please try again';                            
                            self.commonservice.showAlert(msg);
                        }                        
                    }
                },{
                    text: 'Choose From Gallery',
                    handler: () => {
                        this.nativeservice.chooseFile().then(onsuccess, onerror);
                        function onsuccess(res){
                            var choosedFile = res;
                            console.log("choosedFile");
                            console.log(choosedFile);
                            console.log("choosedFile");              
                        }
                
                        function onerror(err){
                            var msg = 'Please try again';                            
                            self.commonservice.showAlert(msg);
                        }                        
                    }
                },{
                    text: 'Cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    }

    captureAudio() {
        // this.mediaCapture.captureAudio().then(res => {
        //     this.storeMediaFiles(res);
        // }, (err: CaptureError) => console.error(err));
    }

    captureVideo() {
        // let options: CaptureVideoOptions = {
        //     limit: 1,
        //     duration: 30
        // }
        // this.mediaCapture.captureVideo(options).then((res: MediaFile[]) => {
        //     console.log("video");
        //     console.log(res);
        //     console.log("video");
        //     let capturedFile = res[0];
        //     let fileName = capturedFile.name;
        //     let dir = capturedFile['localURL'].split('/');
        //     dir.pop();
        //     let fromDirectory = dir.join('/');
        //     var toDirectory = this.file.dataDirectory;

        //     this.file.copyFile(fromDirectory, fileName, toDirectory, fileName).then((res) => {
        //         console.log("copyFile")
        //         console.log(res)
        //         console.log("copyFile")
        //         let fileUrl = this.file.dataDirectory+fileName;             
        //         this.storeMediaFiles([{ name: fileName, size: capturedFile.size, fileUrl }]);
        //     }, err => {
        //         console.log('err: ', err);
        //     });
        // },
        //     (err: CaptureError) => console.error(err));
    }

    play(myFile) { alert("play")
        // if (myFile.name.indexOf('.aac') > -1) {
        //     const audioFile: MediaObject = this.media.create(myFile.localURL);
        //     console.log("audioFile");
        //     console.log(audioFile);
        //     console.log("audioFile");            
        //     audioFile.play();
        // } else {
        //     let path = this.file.dataDirectory + myFile.name;
        //     console.log("path");
        //     console.log(path);
        //     console.log("path");            
        //    // let url = path.replace(/^file:\/\//, '');
        //     let video = this.myVideo.nativeElement;
        //     video.src = path;
        //     // video.src = 'https://13-lvl3-pdl.vimeocdn.com/01/2113/3/85569724/224036863.mp4?expires=1536243729&token=053f5c35433c70acb01e3';
            
        //     video.play();
        // }
    }

    
    // storeMediaFiles(files) { alert("storeMediaFiles")
    //     this.storage.get(MEDIA_FILES_KEY).then(res => {
    //         if (res) {
    //             let arr = JSON.parse(res);
    //             arr = arr.concat(files);
    //             this.storage.set(MEDIA_FILES_KEY, JSON.stringify(arr));
    //         } else {
    //             this.storage.set(MEDIA_FILES_KEY, JSON.stringify(files))
    //         }
    //         this.mediaFiles = this.mediaFiles.concat(files);
    //     })
    // }
}
