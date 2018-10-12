import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Apiservice } from '../providers/apiservice';
import { Commonservice } from '../providers/commonservice';
import { HttpModule } from '@angular/http';
import { Nativeservice } from '../providers/nativeservice';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { IonicStorageModule } from '@ionic/storage';
import { MediaCapture } from '@ionic-native/media-capture';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { IOSFilePicker } from '@ionic-native/file-picker';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';



@NgModule({
    declarations: [
        MyApp,
    ],
    imports: [
        BrowserModule,
        HttpModule,        
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Facebook,
        Apiservice,
        Commonservice,
        Nativeservice,
        Camera,
        MediaCapture,
        File,
        FileChooser,
        FilePath,
        IOSFilePicker,
        FileTransfer,
        Geolocation,
        NativeGeocoder,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
    ]
})
export class AppModule { }
