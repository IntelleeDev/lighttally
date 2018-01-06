import { NgModule } from '@angular/core';
import { GeneralInfoComponent } from './general-info/general-info';
import { ExistingLightComponent } from './existing-light/existing-light';
import { ReplacementComponent } from './replacement/replacement';
import { BulbDialogComponent } from './bulb-dialog/bulb-dialog';
import { FinalizeComponent } from './finalize/finalize';
import { BulbSelectionComponent } from './bulb-selection/bulb-selection';
import { WorkTimeComponent } from './work-time/work-time';
import { BulbCategoryComponent } from './bulb-category/bulb-category';
import { LightComponent } from './light/light';
@NgModule({
	declarations: [GeneralInfoComponent,
    ExistingLightComponent,
    ReplacementComponent,
    BulbDialogComponent,
    FinalizeComponent,
    BulbSelectionComponent,
    WorkTimeComponent,
    BulbCategoryComponent,
    LightComponent],
	imports: [],
	exports: [GeneralInfoComponent,
    ExistingLightComponent,
    ReplacementComponent,
    BulbDialogComponent,
    FinalizeComponent,
    BulbSelectionComponent,
    WorkTimeComponent,
    BulbCategoryComponent,
    LightComponent]
})
export class ComponentsModule {}
