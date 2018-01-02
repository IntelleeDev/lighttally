import { Component } from '@angular/core';

import { BULB_CATEGORIES } from '../../data/constants';

@Component({
  selector: 'bulb-category',
  templateUrl: 'bulb-category.html'
})
export class BulbCategoryComponent {

  headTitle = 'Bulb Categories';
  categories: Array<{type: any, src: any}> = BULB_CATEGORIES;

  constructor() { }

}
