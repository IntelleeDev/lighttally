import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, Toast, ToastController } from 'ionic-angular';

import { User } from '../../model/user';
import { RegistrationProvider } from '../../providers/registration/registration';

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  isWaiting = false;
  errorBag: any;
  validationErrors: any;
  signUpForm: FormGroup;  

  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private regProvider: RegistrationProvider
  ) {
      this.createForm();
      this.signUpForm.valueChanges.subscribe(this.onValueChange.bind(this));

      this.errorBag = {
        email: '',
        fullname: '',
        password: '',
        phoneNumber: '',
      }
      this.validationErrors = {
        fullname: { required: 'Fullname is required' },
        email: { required: 'Email is required', email: 'Please input a valid email address' },
        password: { required: 'Password is required', minlength: 'Min length is 8 characters' },
        phoneNumber: { required: 'Phone Number is required', pattern:'Please enter a valid phone number' }
      } 
  }

  registerUser() {
    this.showSpinner();
    this.regProvider
      .registerUser(this.getData())
      .then(() => {
        this.hideSpinner()
        this.signUpForm.reset()
        this.createToast('Account created successfully. Please SignIn')
            .onDidDismiss(() => this.backToSignInPage())
      })
      .catch(() => {
        this.createToast('Connection error')
      });
  }

  backToSignInPage() {
    this.navCtrl.popTo(SignUpPage);
  }

  private onValueChange(value: any) {
    if (!this.signUpForm) {
      return;
    }
    const form = this.signUpForm;
    for (const field in this.errorBag) {
      this.errorBag[field] = '';
      let control = form.get(field);
      if (control && control.invalid && (control.dirty || control.untouched)) {
        const messages = this.validationErrors[field];
        for (const key in control.errors) {
          this.errorBag[field] = messages[key];
        }
      }
    }
  }

  private getData(): User {
    const formModel = this.signUpForm.value;

    const user: User = {
      email: formModel.email,
      fullname: formModel.fullname,
      password: formModel.password,
      phoneNumber: formModel.phoneNumber
    }
    return user;
  }

  private createForm() {
    this.signUpForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('/^[0-9]{10}$/')]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  private createToast(message: string): Toast {
    return this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'bottom'
    });
  }

  private showSpinner() {
    this.isWaiting = true;
  }

  private hideSpinner() {
    this.isWaiting = false;
  }

}
