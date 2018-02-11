import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {ActivatedRoute} from '@angular/router';
import {User} from 'firebase/app';
import {AmazingTimePickerService} from 'amazing-time-picker';
import {isUndefined} from 'util'; // this line you need

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  user: User;
  userId: string;
  phoneNumber: number;
  name: string;
  link: string;
  message: string;
  public selectedTimeOrder: string;
  public selectedTimeRecive: string;

  ResturantName: string;
  NotificationWay: string;
  orderPermission: boolean;
  returnPermission: boolean;
  recivePermission: boolean;
  suppliersPermission: boolean;
  satisticsPermission: boolean;
  sharePermission: boolean;
  options = [
    {value: 'email', viewValue: 'Email'},
    {value: 'Whatsapp', viewValue: 'Whatsapp'},
    {value: 'Phone', viewValue: 'Phone'},
    {value: 'SMS', viewValue: 'SMS'},
  ];
  TypeOfFillUp: string;

  constructor(public af: AngularFireDatabase, private atp: AmazingTimePickerService,
              public afAuth: AngularFireAuth, route: ActivatedRoute) {
    this.user = afAuth.auth.currentUser;
    this.orderPermission = true;
    this.returnPermission = false;
    this.recivePermission = true;
    this.suppliersPermission = false;
    this.satisticsPermission = false;
    this.sharePermission = true;

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.af.object(`users/${this.userId}`).subscribe(info => {
          if (isUndefined(info['NotificationWay'])) {
            this.TypeOfFillUp = 'email';
          } else {
            this.TypeOfFillUp = info['NotificationWay'];
          }
          if (isUndefined(info['TimeOrder'])) {
            this.selectedTimeOrder = '16:00';
          } else {
            this.selectedTimeOrder = info['TimeOrder'];
          }
          if (isUndefined(info['TimeRecive'])) {
            this.selectedTimeRecive = '16:00';
          } else {
            this.selectedTimeRecive = info['TimeRecive'];
          }
        });
        this.af.object(`users/${this.userId}/buyerPermissions`).subscribe(info => {
          console.log(info);
          this.orderPermission = info['order'];
          this.returnPermission = info['return'];
          this.recivePermission = info['recive'];
          this.suppliersPermission = info['suppliers'];
          this.satisticsPermission = info['satistics'];
          this.sharePermission = info['share'];

        });

      }

    });

  }

  openClockOrder() {
    const amazingTimePicker = this.atp.open({
      time: this.selectedTimeOrder,
      theme: 'light',
      arrowStyle: {
        background: 'red',
        color: 'white'
      }
    });
    amazingTimePicker.afterClose().subscribe(time => {
      this.selectedTimeOrder = time;
    });
  }

  openClockRecive() {
    const amazingTimePicker = this.atp.open({
      time: this.selectedTimeRecive,
      theme: 'light',
      arrowStyle: {
        background: 'red',
        color: 'white'
      }
    });
    amazingTimePicker.afterClose().subscribe(time => {
      this.selectedTimeRecive = time;
    });
  }

  ngOnInit(): void {
    window.onclick = function (event) {
      if (event.target === document.getElementById('id01')) {
        document.getElementById('id01').style.display = 'none';
      }
    };

  }

  onKeyPhone(phone) {
    this.phoneNumber = phone;
  }

  onKeyName(name) {
    this.name = name;
    this.link =
      'https://app.supplyme.net/#/subUserSignUp?domainUserId=' + this.userId + '&name=' + this.name + '&phoneNumber=' + this.phoneNumber;
    this.link = encodeURIComponent(this.link);
    console.log(this.link);
  }

  buildLink() {
    console.log(this.link);
    this.buildPermissions();
    this.sendSignUpWithWhatsApp();
  }

  buildPermissions() {
    this.af.object(`users/${this.userId}/buyerPermissions`).update({
      order: this.orderPermission,
      return: this.returnPermission,
      recive: this.recivePermission,
      suppliers: this.suppliersPermission,
      satistics: this.satisticsPermission,
      share: this.sharePermission,
    });

  }

  sendSignUpWithWhatsApp() {
    console.log(this.user.displayName);
    this.message = 'https://api.whatsapp.com/send?phone=972' + this.phoneNumber + '&text=שלום ' + this.name
      + ' %0A ' + this.afAuth.auth.currentUser.displayName + ' ' +
      ' מבקש שתרשם לאפליקציה SupplyME ותתחיל לנהל דרכה את הקניינות ' +
      ' %0A ' + this.link;
    location.href = this.message;
  }

  updateProfile(displayName) {
    this.afAuth.auth.currentUser.updateProfile({
      displayName: displayName,
      photoURL: 'https://example.com/jane-q-user/profile.jpg'
    }).then(function () {
      console.log(this.afAuth.auth.currentUser);
      alert('success');
    }, function (error) {
      alert('error');
    });
  }

  save() {
    this.af.object(`users/${this.userId}/TimeOrder`).set(this.selectedTimeOrder);
    this.af.object(`users/${this.userId}/TimeRecive`).set(this.selectedTimeRecive);
    this.af.object(`users/${this.userId}/NotificationWay`).set(this.TypeOfFillUp);
    console.log(this.selectedTimeOrder, this.selectedTimeRecive, this.TypeOfFillUp);
  }
}
