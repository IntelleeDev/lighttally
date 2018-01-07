import { Injectable } from '@angular/core';

@Injectable()
export class CacheProvider {

  private cache: Map<string, any>;

  constructor() {
    this.cache = new Map();
  }

  addItem(key: string, item: any) {
    this.cache.set(key, item);
  }

  getItem(key: string): any {
    return this.cache.get(key);
  }

}
