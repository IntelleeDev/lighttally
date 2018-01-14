import { Component, Input } from '@angular/core';
import { Modal, NavController, ToastController, ModalController } from 'ionic-angular';

import { Room } from '../../model/room';
import { Fixture } from '../../model/fixture';
import { Location } from '../../model/location';
import { Evaluation } from '../../model/evaluation';
import { Replacement } from '../../model/replacement';

import { PdfProvider } from '../../providers/pdf/pdf';
import { CacheProvider } from '../../providers/cache/cache';
import { FirestoreBatchProcessor } from '../../data/processor/firestore-batch-processor';

import { DashboardPage } from '../../pages/dashboard/dashboard';
import { LoadingDialogComponent } from '../loading-dialog/loading-dialog';


@Component({
  selector: 'finalize',
  templateUrl: 'finalize.html',
  providers: [ FirestoreBatchProcessor ]
})
export class FinalizeComponent {
  @Input() public toSlide;
  @Input() public resetAllForms;

  constructor(
    private pdf: PdfProvider,
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
    modal.onDidDismiss(() => {
      this.navCtrl.popTo(DashboardPage);
    });

    const location = this.cache.getItem('location');
    const evaluations = this.cache.getItem('evaluation');
    this.batchProcessor
        .process<any>({ location: location.location, contact: location.contact, evaluations })
        .then(() => {
          this.createToast('Evaluation successful');
          
          this.createPdf();
          this.createToast('Making PDF');

          this.downloadPdf()
              .then(() => {
                this.createToast('Finished generating files')
                    .onDidDismiss(() => modal.dismiss());
              })
              .catch(error => {
                this.createToast(error)
                    .onDidDismiss(() => modal.dismiss());
              })
        })
        .catch(error => this.createToast('error'));
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
    const location: Location = this.cache.getItem('location');
    this.pdf.create({ location: location });    
  }

  private downloadPdf(): Promise<any> {
    return this.pdf.download();
  }

}
