import { Component, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Replacement } from '../../model/replacement';
import { BulbSelectionComponent } from '../bulb-selection/bulb-selection';

@Component({
  selector: 'replacement',
  templateUrl: 'replacement.html'
})
export class ReplacementComponent {
  @Input() public toSlide;
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
      replacementBulb, 
      specialNotes: formModel.specialNotes
    }
    return replacement;
  }

  resetForm() {
    this.bulbSelection.reset();
    this.replacementForm.reset();
  }

  // Implementation will come from parent Room component
  addBulb() {
    this.toSlide(1);
  }

  get formInvalid() { 
    return !this.bulbSelection.getSelectedBulb()
  }
}
