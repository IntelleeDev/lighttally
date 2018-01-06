import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';

import { MyApp } from '../../app/app.component';
import { SignUpPage } from '../sign-up/sign-up';
import { HomePage } from '../../pages/home/home';

import { User } from '../../model/user';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

  errorMessage = null;
  signInForm: FormGroup;
  isAuthenticating = false;

  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private authProvider: AuthProvider
  ) {
    this.createForm();
  }
  
  authenticateUser() {
    this.showSpinner();

    // this.authProvider
    //     .authenticateUser(this.getData())
    //     .subscribe(authenticated => {
    //       if (authenticated) {
    //         this.hideSpinner();
    //         this.signInForm.reset()
    //         this.toHomePage();          
    //       } else {
    //         this.hideSpinner();
    //         this.errorMessage = 'Invalid username or password';
    //       }
    //     });
    this.signInForm.reset()
    this.hideSpinner();
    this.toHomePage();
  }

  toHomePage(): void {
    this.navCtrl.push(HomePage, {});
  }

  toSignUpPage(): void {
    this.navCtrl.push(SignUpPage, {});
  }

  private createForm() {
    this.signInForm = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  private getData(): User {
    const formModel = this.signInForm.value;

    const user: User = {
      fullname: '',
      phoneNumber: '',
      email: formModel.email,
      password: formModel.password
    }
    return user;
  }

  private showSpinner() {
    this.isAuthenticating = true;
  }

  private hideSpinner() {
    this.isAuthenticating = false;
  }

  
}
