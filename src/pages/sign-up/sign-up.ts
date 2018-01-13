import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, Toast, ToastController } from 'ionic-angular';

import { SignInPage } from '../sign-in/sign-in';
import { User } from '../../model/user';
import { RegistrationProvider } from '../../providers/registration/registration';

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  isWaiting = false;
  signUpForm: FormGroup;  

  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private regProvider: RegistrationProvider) {
      this.createForm();
  }

  registerUser() {
    this.showSpinner();
    this.regProvider
      .registerUser(this.getData())
      .then(() => {
        this.hideSpinner();
        this.signUpForm.reset();
        this.backToSignInPage();
        this.createToast('Account created successfully. Please SignIn')
            .onDidDismiss(() => this.backToSignInPage())
      })
      .catch(() => {
        this.createToast('Connection error')
      });
  }

  backToSignInPage() {
    this.navCtrl.popTo(SignInPage);
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
    const pattern = /^[0-9]{10}$/;
    this.signUpForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(pattern)]],
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

  get email() { return this.signUpForm.get('email'); }
  get fullname() { return this.signUpForm.get('fullname'); }
  get password() { return this.signUpForm.get('password'); }
  get phoneNumber() { return this.signUpForm.get('phoneNumber'); }

}
