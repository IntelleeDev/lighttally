import { Component, Input } from '@angular/core';
import { 
  Platform, 
  NavController,
  ToastController, 
  Modal, ModalController } from 'ionic-angular';

import { Location } from '../../model/location';

import { PdfProvider } from '../../providers/pdf/pdf';
import { CacheProvider } from '../../providers/cache/cache';

import { LoadingDialogComponent } from '../loading-dialog/loading-dialog';

@Component({
  selector: 'finalize',
  templateUrl: 'finalize.html'
})
export class FinalizeComponent {
  @Input() public toSlide;
  @Input() public resetAllForms;

  constructor(
    private pdf: PdfProvider,
    private platform: Platform,
    private cache: CacheProvider,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController) { }

  doNewEvaluation() {
    this.resetAllForms();
    this.toSlide(0);
  }

  finishEvaluation() {
    this.createPdf();
    this.downloadPdf();
    // this.navCtrl.popToRoot();
  }

  private createModal(): Modal {
    const modal = this.modalCtrl.create(LoadingDialogComponent, {
      message: 'Generating Files...'
    });
    modal.present();
    return modal;
  }

  private createToast(message: string) {
    const toast = this.toastCtrl.create({
      message,
      duration: 3000
    });
    toast.present();
  }

  private createPdf() {
    const location: Location = this.cache.getItem('location');
    this.pdf.create({ location: location });    
  }

  private downloadPdf() {
    const modal = this.createModal();
    this.pdf.download()
            .then(() => { modal.dismiss() })
            .catch(error => { 
              this.createToast(error)
              modal.dismiss(); 
            })    
  }

}
