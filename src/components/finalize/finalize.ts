import { Component, Input } from '@angular/core';
import { 
  Platform, 
  NavController,
  ToastController, 
  Modal, ModalController } from 'ionic-angular';

import { AngularFirestore } from 'angularfire2/firestore';

import { Location } from '../../model/location';
import { Evaluation } from '../../model/evaluation';

import { PdfProvider } from '../../providers/pdf/pdf';
import { CacheProvider } from '../../providers/cache/cache';

import { LoadingDialogComponent } from '../loading-dialog/loading-dialog';
import { Room } from '../../model/room';
import { Fixture } from '../../model/fixture';
import { Replacement } from '../../model/replacement';


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
    private modalCtrl: ModalController,
    private angularFirestore: AngularFirestore) { }

  doNewEvaluation() {
    this.resetAllForms();
    this.toSlide(0);
  }

  finishEvaluation() {
    const modal = this.createModal();

    const firestore = this.angularFirestore.firestore;
    const batch = firestore.batch();

    const evalId = this.angularFirestore.createId();
    const evalRef = firestore.collection('evaluations').doc(evalId);
    const evaluation: Evaluation = {
      timestamp: new Date(),
      locationId: '',
      userId: '',
      id: evalId
    };
    batch.set(evalRef, evaluation);

    const evaluations: Array<any> = this.cache.getItem('evaluation');
    evaluations.forEach(value => {
      const room: Room = value.room;
      const roomId = this.angularFirestore.createId();
      const roomRef = firestore.collection('rooms').doc(roomId);
      batch.set(roomRef, { id: roomId, ...room, evaluationId: evalId });

      const fixtures: Array<Fixture> = value.fixtures;
      fixtures.forEach((fixture: Fixture) => {
        const fixId = this.angularFirestore.createId();
        const fixRef = firestore.collection('fixtures').doc(fixId);
        batch.set(fixRef, { id: fixId, ...fixture, roomId: roomId });
        
        const replacements: Array<Replacement> = value.replacements;
        replacements.forEach((replacement: Replacement) => {
          const repId = this.angularFirestore.createId();
          const repRef = firestore.collection('replacements').doc(repId);
          batch.set(repRef, { id: repId, ...replacement, fixtureId: fixId });
        });
      });

    });

    batch.commit()
         .then(() => {
            this.createToast('Evaluation successful');
            setTimeout(() => {
              modal.dismiss();
              this.navCtrl.popToRoot();
            }, 2000); 
          })
         .catch(error => {
           this.createToast(error);
         });

    // console.log(this.cache.getItem('location'))
    // console.log(this.cache.getItem('evaluation'));
    // // this.navCtrl.popToRoot();
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
