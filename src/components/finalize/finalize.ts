import { Component, Input } from '@angular/core';
import { 
  Slides, 
  Platform, 
  NavController,
  ToastController, 
  Modal, ModalController } from 'ionic-angular';

import { Location } from '../../model/location';
import { File } from '@ionic-native/file';
import { FileOpener } from "@ionic-native/file-opener";

import { PdfProvider } from '../../providers/pdf/pdf';
import { CacheProvider } from '../../providers/cache/cache';

import { RoomPage } from '../../pages/room/room';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { LoadingDialogComponent } from '../loading-dialog/loading-dialog';

@Component({
  selector: 'finalize',
  templateUrl: 'finalize.html'
})
export class FinalizeComponent {
  @Input() public toSlide;
  @Input() public resetAllForms;

  private pdfObject;

  constructor(
    private file: File,
    private pdf: PdfProvider,
    private platform: Platform,
    private cache: CacheProvider,
    private fileOpener: FileOpener,
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
    // this.navCtrl.setRoot(DashboardPage);
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
