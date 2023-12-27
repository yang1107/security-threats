import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput, IonListHeader, IonButton, AlertController, IonNote
} from '@ionic/angular/standalone';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {Message} from '../models/message';
import {HttpClient} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, NgForOf, IonInput, FormsModule, IonListHeader, NgIf, IonButton, IonNote, DatePipe],
})
export class HomePage {
  protected version: string = '';
  protected messages: Message[] = [];

  protected username: string = '';
  protected password: string = '';

  constructor(private httpClient: HttpClient,
              private alertController: AlertController) {
    this.httpClient.get('http://localhost:8080/check-updates?versionFile=v1').subscribe((result: any) =>{
      this.version = result.version;
    });
  }

  async login() {
    this.messages = [];
    this.httpClient.get<Message[]>(`http://localhost:8080/messages?username=${this.username}&password=${this.password}`).subscribe({
      next: result => {
        this.messages = result;
      },
      error: async () => {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Invalid username or password',
          buttons: [
            {text: 'Continue', role: 'cancel'},
          ]
        });
        await alert.present();
      }
    });
  }
}
