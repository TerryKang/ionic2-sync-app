import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import { DataService } from '../../providers/DataService';

@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {
  items:any;
  subscription: any;

  constructor(public navCtrl: NavController, public dataService: DataService) {
     this.dataService.init();

     this.subscription = this.dataService.syncData.subscribe(data =>
      this.onDataSync(data));
  }

  onDataSync(items) {
     console.log(items);
    this.items = items;
  }

  onItem(item) {
    this.navCtrl.push(DetailsPage, {
      item : item
    });

  }

  removeItem(item) {
    this.dataService.deleteItem(item);
  }
}
