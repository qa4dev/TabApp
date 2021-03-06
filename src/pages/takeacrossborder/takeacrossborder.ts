import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { Commonservice } from '../../providers/commonservice';
import { Apiservice } from '../../providers/apiservice';
import {ViewChild,  ElementRef } from '@angular/core';

import * as $ from "jquery";



@IonicPage()
@Component({
  selector: 'page-takeacrossborder',
  templateUrl: 'takeacrossborder.html',
})
export class TakeacrossborderPage {
  slides: any;
  currentIndex = 0;
  result: any;

  constructor(
      public navCtrl: NavController,
      public modalCtrl: ModalController,
      private commonservice: Commonservice,
      private apiservice: Apiservice,
      private elementRef:ElementRef
  ) {

      this.homedata();
  }

  homedata(){
      this.commonservice.showLoader();
      this.apiservice.homepage_data(null).then((res) => {
          this.commonservice.hideLoader();
          this.result = res;
          console.log(this.result);
          if (this.result.RespCode == "2003") {
              this.slides = this.result.sliderImages;
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

  nextSlide() {
      this.slides.slideNext();
  }

  previousSlide() {
      this.slides.slidePrev();
  }

  onSlideChanged() {
      this.currentIndex = this.slides.getActiveIndex();
      console.log('Slide changed! Current index is', this.currentIndex);
  }

  addtravel() {
      const modal = this.modalCtrl.create('AddTravelPage');
      modal.present();
  }


  addrequest(){  
      this.navCtrl.push('AddrequestPage')
  }

  mycart(){ 
      this.navCtrl.push('MycartPage');
  
  
    }

    ionViewDidLoad() {
       // alert('Hello Test');

        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = "/assets/js/custom.js";
        this.elementRef.nativeElement.appendChild(s);

        console.log('ionViewDidLoad HomePage');
        //this.homeFn();

    }

     homeFn(){

        setTimeout(function(){
            $('.counSlider').owlCarousel({
               loop:true,
               margin:0,
               nav:true,
               responsive:{
                   0:{
                       items:1
                   },
                   600:{
                       items:1
                   },
                   1000:{
                       items:1
                   }
               }
           });
           
           ContSlider();
           
           
           console.log( $('.mainBanner').length);
            $('.mainBanner').owlCarousel({
               loop:true,
               margin:0,
               nav:true,
               responsive:{
                   0:{
                       items:1
                   },
                   600:{
                       items:1
                   },
                   1000:{
                       items:1
                   }
               }
           });
           
           
           $('.homeCatSlider').owlCarousel({
               loop:true,
               margin:30,
               nav:true,
               responsive:{
                   0:{
                       items:2
                   },
                   600:{
                       items:4
                   },
                   1000:{
                       items:4
                   }
               }
           });
           
           
           $('.freshDealSlider').owlCarousel({
               loop:true,
               margin:15,
               nav:true,
               responsive:{
                   0:{
                       items:2
                   },
                   600:{
                       items:4
                   },
                   1000:{
                       items:4
                   }
               }
           });
           
           
           $('.popularFreshSlider').owlCarousel({
               loop:true,
               margin:15,
               nav:true,
               responsive:{
                   0:{
                       items:2
                   },
                   600:{
                       items:3
                   },
                   1000:{
                       items:3
                   }
               }
           });
           
           
           
           
       },2000);
       function ContSlider(){
        $('.counSlider li').each(function(){
            var FlagWidt = $(this).find('.contListItem').width();
            var htTopFlag = FlagWidt * 0.6;
            $(this).find('.flageShowHide').css('height',htTopFlag);
            var ZoomHt = FlagWidt * 0.9;
            var ZoomTop = FlagWidt * 0.15;
            $(this).find('.contShowHideCont').css('height',ZoomHt);
            $(this).find('.contShowHideCont').css('top',-ZoomTop);
            var flagHt = FlagWidt * 0.6;
            $(this).find('.flagBg').css('height',flagHt);
        });
        
    }
    }


    coutriesList(){
        this.navCtrl.push('CountryPage');
    }

    
}
