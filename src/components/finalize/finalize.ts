import { Component, Input } from '@angular/core';
import { Slides, Platform, NavController, Modal, ModalController } from 'ionic-angular';

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
    const modal = this.modalCtrl.create(LoadingDialogComponent);
    modal.present();
    return modal;
  }

  private createPdf() {
    let docDefinition = {
      content: [{ text: 'Reminder' }]
    };
    this.pdfObject = pdfMake.createPdf(docDefinition);
  }

  private downloadPdf() {

    // Display progress modal
    const modal = this.createModal();

    if (this.platform.is('cordova')) {
      this.pdfObject.getBuffer(buffer => {
        let blob = new Blob([buffer], { type: 'application/pdf' });
        
        const file = this.file;
        file.writeFile(file.dataDirectory, 'evaluation.pdf', blob, { replace: true })
            .then(fileEntry => {
              modal.dismiss();
              this.fileOpener.open(`${file.dataDirectory}evaluation.pdf`, 'application/pdf');
            })
      })
    } else {
      setTimeout(() => {
        modal.dismiss();
        this.pdfObject.download();
      }, 4000);
    }
    
  }

}
