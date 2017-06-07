import { AuthHttp } from 'angular2-jwt';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  restInfo = {};

  constructor(
    public navCtrl: NavController,
    public http: Http,
    public storage: Storage,
    public authHttp: AuthHttp) {

  }



  onSubmit(data) {
    console.log(`email: ${data.email}, password: ${data.password}`)
    this.http.post('http://localhost:3001/users/login', 
    {"email":data.email, "password":data.password})
    .subscribe(res => {
      let body = res.json();
      let token = body.id_token;
      this.storage.set('id_token', token);
    });
  }

  loadPublic() {
    this.http.get('http://localhost:3001/api/information')
    .subscribe(res => {
      console.log(`my result: ${res}`)
      this.restInfo = res;
    });
  }

  loadPrivate() {
    this.authHttp.get('http://localhost:3001/api/protected/information')
    .subscribe(res => {
      console.log(`my result: ${res}`)
      this.restInfo = res;
    });
  }

  logOut() {
    this.storage.set('id_token', '')
  }

  pushSecond() {
    this.navCtrl.push('SecondPage').catch(err => {
      console.log('Not Allowed', err)
    })
  }

}
