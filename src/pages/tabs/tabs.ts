import { Component } from '@angular/core';

import { MainPage } from '../main/main';
import { DetailsPage } from '../details/details';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MainPage;
  tab2Root = DetailsPage;

  constructor() {

  }
}
