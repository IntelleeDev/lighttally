import { Injectable } from '@angular/core';
import { PrettyPrinter } from './pretty-printer';

@Injectable()
export class BasicDocumentPrinter implements PrettyPrinter {
  
  print<T>(data: T): T {
    const content = [];
    const docData = data as any;

    // Page Header
    content.push({ text: 'Light Tally', style: 'header' });

    content.push({ text: 'Location Details', bold: true });
    content.push({
      table: {
        width: [ 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto' ],
        body: [
          [
            { text: 'Location', style: 'tableHeader', alignment: 'center', colSpan: 6 },
           {}, {}, {}, {}, {}, {}
          ]
        ]
      }
    });
    content.push({ text: `Evaluation for ${docData.location.businessName}`})
    content.push({ text: 'Location Data'});
    content.push({ text: ''})

    const styles = {
      header: {
        bold: true,
        fontSize: 22,
        alignment: 'center'
      },
      tableHeader: {
        bold: true,
        fontSize: 14,
        color: 'black'
      }
    }
    return { content, styles } as any ;
  }

}