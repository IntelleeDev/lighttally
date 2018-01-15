import { Injectable } from '@angular/core';
import { PrettyPrinter } from './pretty-printer';

@Injectable()
export class BasicDocumentPrinter implements PrettyPrinter {
  
  print<T>(data: T): T {
    const content = [];
    const docData = data as any;

    content.push({ text: `Evaluation for ${docData.location.businessName}`})
    content.push({ text: 'Location Data'});
    content.push({ text: ''})

    return { content } as any ;
  }

}