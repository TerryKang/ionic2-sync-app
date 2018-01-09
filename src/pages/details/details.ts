import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataService } from '../../providers/DataService';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {
  title: any;
  item: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: DataService) {
    let navItem = this.navParams.get('item');
    
    if (navItem) {
      this.title = "Edit";
      this.item = navItem;
    } else {
      this.title = "New";
      this.item = {'data':{}};
    }
  }

  logForm() {
    let item = this.item;
    this.item = {'data':{}}; 
    if (item.id) {
      this.dataService.update(item);
       this.navCtrl.pop();
    } else {
      this.dataService.save(item);
       this.navCtrl.parent.select(0);
    };
   }
}
