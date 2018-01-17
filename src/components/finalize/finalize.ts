import { Component, Input } from '@angular/core';
import { Modal, NavController, ToastController, ModalController } from 'ionic-angular';

import { PdfProvider } from '../../providers/pdf/pdf';
import { EmailProvider } from '../../providers/email/email';
import { CacheProvider } from '../../providers/cache/cache';
import { FirestoreBatchProcessor } from '../../data/processor/firestore-batch-processor';

import { DashboardPage } from '../../pages/dashboard/dashboard';
import { LoadingDialogComponent } from '../loading-dialog/loading-dialog';


@Component({
  selector: 'finalize',
  templateUrl: 'finalize.html',
  providers: [ FirestoreBatchProcessor, EmailProvider ]
})
export class FinalizeComponent {
  @Input() public toSlide;
  @Input() public resetAllForms;

  constructor(
    private pdf: PdfProvider,
    private email: EmailProvider,
    private cache: CacheProvider,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private batchProcessor: FirestoreBatchProcessor) { }
    

  doNewEvaluation() {
    this.resetAllForms();
    this.toSlide(0);
  }

  finishEvaluation() {
    const modal = this.createModal();
    
    const user = this.cache.getItem('user');  // The evaluator
    const location = this.cache.getItem('location');
    const evaluations = this.cache.getItem('evaluation');
    this.batchProcessor
        .process<any>({ user, location: location.location, contact: location.contact, evaluations })
        .then(() => {
          this.createToast('Saved evaluation successfully');
          
          this.createPdf();
          this.savePdf()
              .then(() => {
                this.createToast('Finished generating files')
                    .onDidDismiss(() => {
                      modal.onDidDismiss(() => { 
                        this.email.send({})
                            .then(() => {
                              this.navCtrl.popToRoot();
                            })
                      })
                      modal.dismiss();
                    });
              })
              .catch(error => {
                this.createToast(error + 'from file write')
                    .onDidDismiss(() => modal.dismiss());
              })
        })
        .catch(error => this.createToast(error));
    // this.createPdf();
    // this.savePdf()
    // .then(() => {
    //   this.createToast('Finished generating files')
    //       .onDidDismiss(() => {
    //         modal.onDidDismiss(() => this.navCtrl.popToRoot())
    //         modal.dismiss();
    //       });
    // })
    // .catch(error => {
    //   this.createToast(error + 'from file write')
    //       .onDidDismiss(() => modal.dismiss());
    // })
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
    return toast;
  }

  private createPdf() {
    const location = this.cache.getItem('location');
    const evaluations = this.cache.getItem('evaluation');
    console.log(evaluations);
    this.pdf.create({ 
      evaluations,
      contact: location.contact, 
      location: location.location, 
    });    
  }

  private savePdf(): Promise<any> {
    return this.pdf.save();
  }

}
