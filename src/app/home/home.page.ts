import { Component } from '@angular/core';
import {IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel} from '@ionic/angular/standalone';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, NgForOf],
})
export class HomePage {
  items = [];

  constructor() {}
}
