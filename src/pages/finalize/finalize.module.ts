import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FinalizePage } from './finalize';

@NgModule({
  declarations: [
    FinalizePage,
  ],
  imports: [
    IonicPageModule.forChild(FinalizePage),
  ],
})
export class FinalizePageModule {}
