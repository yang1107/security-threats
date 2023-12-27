import { Component } from '@angular/core';
import {IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel} from '@ionic/angular/standalone';
import {NgForOf} from '@angular/common';
import {Message} from '../models/message';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, NgForOf],
})
export class HomePage {
  protected version: string = '';
  protected items: Message[] = [];

  constructor(private httpClient: HttpClient) {
    this.httpClient.get('http://localhost:8080/check-version?versionFile=v1').subscribe((result: any) =>{
      this.version = result.version;
    });
  }
}
