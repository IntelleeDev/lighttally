import { Injectable } from '@angular/core';
import { PrettyPrinter } from './pretty-printer';

@Injectable()
export class BasicDocumentPrinter implements PrettyPrinter {
  
  print<T>(data: T): T {
    const content = [];
    const docData = data as any;

    console.log(docData);

    // Page Header
    content.push({ text: 'Light Tally', style: 'header' });

    // Location and Contact Data
    content.push({ text: 'Location Details', bold: true, color: 'black', margin: [0, 5, 0, 5] });
    content.push({
      table: {
        headerRows: 2,
        widths: [ 'auto', 'auto', 'auto', '*', '*', '*', '*' ],
        body: [
          [
            { text: 'Location', style: 'tableHeader', alignment: 'center', colSpan: 7 },
           {}, {}, {}, {}, {}, {}
          ],
          [
            { text: 'Address', style: 'tableHeader', alignment: 'center' },
            { text: 'Business Name', style: 'tableHeader', alignment: 'center' },
            { text: 'Account No', style: 'tableHeader', alignment: 'center' },
            { text: 'Energy Company', style: 'tableHeader', alignment: 'center' },
            { text: 'KWH Filed', style: 'tableHeader', alignment: 'center' },
            { text: 'Square Ft', style: 'tableHeader', alignment: 'center' },
            { text: 'Working Hrs', style: 'tableHeader', alignment: 'center' },
          ],
          [
            `${docData.location.address}`,
            `${docData.location.businessName}`,
            `${docData.location.accountNumber}`,
            `${docData.location.energyCompany}`,
            `${docData.location.khwFiled}`,
            `${docData.location.squareFootage}`,
            `${docData.location.workingHours}`,
          ],

          [
            { text: 'Contact', style: 'tableHeader', alignment: 'center', colSpan: 7 },
            {}, {}, {}, {}, {}, {}
          ],
          [
            { text: 'Name', style: 'tableHeader', alignment: 'center', colSpan: 2 },
            {},
            { text: 'Email', style: 'tableHeader', alignment: 'center', colSpan: 3 },
            {}, {},
            { text: 'Phonenumber', style: 'tableHeader', alignment: 'center', colSpan: 2 },
            {}
          ],
          [
            { text: `${docData.contact.name}`, colSpan:2 }, {},
            { text: `${docData.contact.email}`, colSpan: 3}, {},{},
            { text: `${docData.contact.phoneNumber}`, colSpan: 2 }, {}
          ]
          
        ]
      }
    });

    // Evaluation Details
    const firstRoom = docData.evaluations[0];
    content.push({ text: 'Evaluation Details', bold: true, color: 'black', margin: [0, 10, 0, 5] });
    content.push({
      table: {
        headerRows: 1,
        widths: [ 100, '*', '*', '*', '*', '*', '*' ],
        body:  this.buildRoomTable(docData.evaluations)
      }
    });

    const styles = {
      header: {
        bold: true,
        fontSize: 22,
        alignment: 'center'
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black'
      }
    }
    return { content, styles } as any ;
  }

  private buildRoomTable(roomData: Array<any>): any {
    let row = [];
    return roomData.map(room => {
      row.push(this.buildTableHeader('Room'));
      row.push(this.buildAttribute('Name', room.name));
      row.push(this.buildAttribute('Lift', room.lift));
      row.push(this.buildAttribute('Height to Fixtures', room.heightToFixtures));
      row.push(this.buildAttribute('Light Occupied Hours', room.lightOccupiedHours));
      return row;
    });
  }

  private buildTableHeader(title: string): any {
    return [
      { text: title, style: 'tableHeader', colSpan: 7 },
      {},{},{},{},{},{}
    ]
  } 

  private buildAttribute(title: string, value: any): any {
    return [
      { text: title, colSpan: 2 }, {},
      { text: value, colSpan: 5 }, {}, {}, {}, {}
    ]
  }
}