import { Injectable } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { BasicDocumentPrinter } from './doc-printer/basic-document-printer';

@Injectable()
export class PdfProvider {
  private pdfObject;

  constructor(
    private file: File,
    private platform: Platform,
    private fileOpener: FileOpener,
    private toastCtrl: ToastController,
    private docPrinter: BasicDocumentPrinter) { }

  create(data: any) {
    const docDef   = this.docPrinter.print<any>(data);
    this.pdfObject = pdfMake.createPdf(docDef);
  }

  private makeDocDefinition(data): any {
    const content = []; 
    content.push({ text: `Evaluation for ${data.location.businessName}`})
    content.push({ text: 'Location Data'});
    content.push({ text: ''})
    return { content };
  }

  save(): Promise<any> {
    if (this.isRunningOnMobileDevice()) {
      return this.platform.ready().then(() => {
        this.pdfObject.getBuffer(buffer => {
          this.makeToast('Making PDF');
          let blob = new Blob([buffer], { type: 'application/pdf' });
          return this.file.writeFile(this.file.dataDirectory, 'eval.pdf', blob, { replace: true })
              .then(fileEntry => {
                this.fileOpener.open(this.file.dataDirectory + 'eval.pdf', 'application/pdf');
              })
              .catch(error => this.makeToast(error));
        })
      });
    } else {
      return Promise.resolve(this.pdfObject.download());
    }
  }

  private isRunningOnMobileDevice(): boolean {
    return this.platform.is('cordova');
  }

  private makeToast(message: string) {
    const toast = this.toastCtrl.create({
      message,
      duration: 4000
    });
    toast.present();
  }
}
