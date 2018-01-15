import { Injectable } from '@angular/core';
import { PrettyPrinter } from './pretty-printer';

@Injectable()
export class BasicDocumentPrinter implements PrettyPrinter {
  
  print<T>(data: T): T {
    const content = [];
    const docData = data as any;

    // Page Header


    content.push({ text: `Evaluation for ${docData.location.businessName}`})
    content.push({ text: 'Location Data'});
    content.push({ text: ''})

    const styles = {
      header: {
        bold: true,
        fontSize: 22,
      }
    }
    return { content, styles } as any ;
  }

}