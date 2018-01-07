import { Component, Input } from '@angular/core';
import { 
  Slides, 
  Platform, 
  NavController,
  ToastController, 
  Modal, ModalController } from 'ionic-angular';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { File } from '@ionic-native/file';
import { FileOpener } from "@ionic-native/file-opener";

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
    private platform: Platform,
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
    let docDefinition = {
      content: [{ text: 'Reminder' }]
    };
    this.pdfObject = pdfMake.createPdf(docDefinition);
  }

  private downloadPdf() {
    const modal = this.createModal();

    if (this.platform.is('cordova')) {
      this.platform.ready().then(() => {
        this.pdfObject.getBuffer(buffer => {
          let blob = new Blob([buffer], { type: 'application/pdf' });
          
          this.createToast('Making PDF');
          this.file.writeFile(this.file.dataDirectory, 'ev.pdf', blob, { replace: true })
              .then(fileEntry => {
                modal.dismiss();
                this.fileOpener.open(this.file.dataDirectory + 'ev.pdf', 'application/pdf');
              })
              .catch(error => this.createToast(error));
        });
      });
    } else {
      modal.dismiss();
      this.pdfObject.download()
    }
    
  }

}
