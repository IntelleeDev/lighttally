import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Replacement } from '../../model/replacement';

@Component({
  selector: 'replacement',
  templateUrl: 'replacement.html'
})
export class ReplacementComponent {
  
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

    const replacement: Replacement = {
      specialNotes: formModel.specialNotes
    }
    return replacement;
  }
}
