import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
      kalvins: '',
      specialNotes: ''
    });
  }
}
