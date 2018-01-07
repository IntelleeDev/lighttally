import { Component, Input } from '@angular/core';
import { Slides, Platform, NavController } from 'ionic-angular';

import { File } from '@ionic-native/file';
import {  FileOpener } from "@ionic-native/file-opener";

import { RoomPage } from '../../pages/room/room';
import { DashboardPage } from '../../pages/dashboard/dashboard';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfMake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
    private navCtrl: NavController) { }

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

  private createPdf() {
    let docDefinition = {
      content: [{ text: 'Reminder' }]
    };
    this.pdfObject = pdfMake.createPdf(docDefinition);
  }

  private downloadPdf() {

    if (this.platform.is('cordova')) {
      this.pdfObject.getBuffer(buffer => {
        let blob = new Blob([buffer], { type: 'application/pdf' });
        
        const file = this.file;
        file.writeFile(file.dataDirectory, 'evaluation.pdf', blob, { replace: true })
            .then(fileEntry => {
              this.fileOpener.open(`${file.dataDirectory}evaluation.pdf`, 'application/pdf');
            })
      })
    } else {
      this.pdfObject.download();
    }
    
  }

}
