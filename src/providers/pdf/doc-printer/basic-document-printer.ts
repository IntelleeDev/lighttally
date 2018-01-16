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
        width: [ 'auto', '*', '*', '*', '*', '*', '*' ],
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
        width: [ 'auto', '*', '*', '*', '*', '*', '*' ],
        body: [
          [
            { text: 'Room', style: 'tableHeader', colSpan: 7 },
            {}, {}, {}, {}, {}, {}
          ],
          [
            { text: 'Name', colSpan: 2 }, {},
            { text: `${firstRoom.name}`, colSpan:5 }, {}, {}, {}, {}       
          ],
          [
            { text: 'Lift', colSpan: 2 }, {},
            { text: `${firstRoom.lift}`, colSpan: 5 }, {}, {}, {}, {}       
          ],
          [
            { text: 'Height to Fixtures', colSpan: 2 }, {},
            { text: `${firstRoom.heightToFixtures}`, colSpan:5 }, {}, {}, {}, {}       
          ],
          [
            { text: 'Light Occupied Hours', colSpan: 2 }, {},
            { text: `${firstRoom.lightOccupiedHours}`, colSpan:5 }, {}, {}, {}, {}       
          ],

          [
            { text: 'Fixture', style: 'tableHeader',  colSpan: 7 },
           {}, {}, {}, {}, {}, {}
          ],
          [
            { text: 'Number of Fixtures', colSpan: 2 }, {},
            { text: `${firstRoom.fixtures[0].numberOfFixtures}`, colSpan:5 }, {}, {}, {}, {}       
          ],
          [
            { text: 'Balast Type', colSpan: 2 }, {},
            { text: `${firstRoom.fixtures[0].balastType}`, colSpan:5 }, {}, {}, {}, {}       
          ],
          [
            { text: 'Number of Bulbs', colSpan: 2 }, {},
            { text: `${firstRoom.fixtures[0].numberOfBulbs}`, colSpan:5 }, {}, {}, {}, {}       
          ],
          [
            { text: 'Wrong Bulb', colSpan: 2 }, {},
            { text: `${firstRoom.fixtures[0].wrongBulb}`, colSpan:5 }, {}, {}, {}, {}       
          ],

          [
            { text: 'Replacement', style: 'tableHeader', alignment: 'center', colSpan: 7 },
           {}, {}, {}, {}, {}, {}
          ]
        ]
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

}