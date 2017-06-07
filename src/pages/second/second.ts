import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {tokenNotExpired} from 'angular2-jwt';
/**
 * Generated class for the SecondPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-second',
  templateUrl: 'second.html',
})
export class SecondPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: Storage) {
  }

  ionViewCanEnter(){
    return this.storage.get('id_token').then(token => {
      return tokenNotExpired(null, token);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SecondPage');
  }

}
