import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FCM } from '@ionic-native/fcm';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  token;
  data;
  constructor(public navCtrl: NavController, private fcm: FCM) {
    this.fcm.subscribeToTopic('highScores');

    this.fcm.getToken().then(token => {
      this.token = token;
    });

    this.fcm.onNotification().subscribe(data => {
      if(data.wasTapped){
        this.data = JSON.stringify(data);
        console.log("Received in background");
      } else {
        this.data = JSON.stringify(data);
        console.log("Received in foreground");
      }
    });

    this.fcm.onTokenRefresh().subscribe(token => {
      console.log(token)
    });

  }

}
