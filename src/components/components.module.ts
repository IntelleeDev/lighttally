import { NgModule } from '@angular/core';
import { GeneralInfoComponent } from './general-info/general-info';
import { ExistingLightComponent } from './existing-light/existing-light';
import { ReplacementComponent } from './replacement/replacement';
import { BulbDialogComponent } from './bulb-dialog/bulb-dialog';
import { FinalizeComponent } from './finalize/finalize';
@NgModule({
	declarations: [GeneralInfoComponent,
    ExistingLightComponent,
    ReplacementComponent,
    BulbDialogComponent,
    FinalizeComponent],
	imports: [],
	exports: [GeneralInfoComponent,
    ExistingLightComponent,
    ReplacementComponent,
    BulbDialogComponent,
    FinalizeComponent]
})
export class ComponentsModule {}
