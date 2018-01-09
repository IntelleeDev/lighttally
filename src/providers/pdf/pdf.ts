import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the PdfProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PdfProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PdfProvider Provider');
  }

}
