import { Component, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Bulb } from '../../model/bulb';
import { Replacement } from '../../model/replacement';
import { BulbSelectionComponent } from '../bulb-selection/bulb-selection';

@Component({
  selector: 'replacement',
  templateUrl: 'replacement.html'
})
export class ReplacementComponent {
  @Input() public toSlide;
  @Input() public addNewLight;
  @ViewChild(BulbSelectionComponent) bulbSelection: BulbSelectionComponent;

  title = 'Replacement Bulb';
  replacementForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder) {
    this.createForm();
  }

  private createForm() {
    this.replacementForm = this.formBuilder.group({
      specialNotes: ''
    });
  }

  getData(): Replacement {
    const formModel = this.replacementForm.value;
    const replacementBulb = this.bulbSelection.getSelectedBulb();

    const replacement: Replacement = {
      replacementBulb: replacementBulb ? replacementBulb : {} as Bulb, 
      specialNotes: formModel.specialNotes
    }
    return replacement;
  }

  resetForm() {
    this.bulbSelection.reset();
    this.replacementForm.reset();
  }

  addLight() {
    this.addNewLight();
    this.toSlide(1);
  }

  get formInvalid() { 
    return !this.bulbSelection.getSelectedBulb()
  }
}
