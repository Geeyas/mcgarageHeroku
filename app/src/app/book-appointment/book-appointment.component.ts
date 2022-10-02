import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { map } from 'rxjs';
@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit {

  bookForm: boolean = true;
  appID: boolean = false;


  url: string = "/api/bookappointment";

  DayDAte = new Date();
  id: number = this.DayDAte.getTime();

  allData: any[] = [];
  // allData: string;
  data: string = '';

  name: string = "";
  number: string = "";
  email: string = "";
  appointment: string = ""
  date: string = "";
  time: string = "";

  errMsgName: string = "";
  errMsgNumber: string = "";
  errMsgApp: string = "";
  errMsgEmail: string = "";
  errMsgDate: string = "";
  errMsgTime: string = "";
  successMsg: string = "";

  regexEmail: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  regexPhone: RegExp = /^\d{10}$/;

  dateArr = [];
  appointmentID: number = null;

  constructor(private http: HttpClient, private router: Router) { }

  async ngOnInit() {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Access-Control-Allow-Origin': '*',
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "*"
    });
    await this.http.get(this.url, { headers: header }).pipe(map((responseMap) => {
      const products = [];
      for (const key in responseMap) {
        if (responseMap.hasOwnProperty(key)) {
          products.push({ ...responseMap[key], id: key })
        }
      }
      this.allData = products;
      return products;
    })).subscribe((response) => {
    })
  }


  clear() {
    this.errMsgName = "";
    this.errMsgNumber = "";
    this.errMsgApp = "";
    this.errMsgEmail = "";
    this.errMsgDate = "";
    this.successMsg = "";
  }

  async validate() {
    if (!this.name) {
      this.errMsgName = "Full name required";
      return;
    } else if (!this.number) {
      this.errMsgNumber = "Contact number required";
      return;
    } else if (isNaN(parseInt(this.number))) {
      this.errMsgNumber = "Contact number is not valid";
      return;
    } else if (this.regexPhone.test(this.number) == false) {
      this.errMsgNumber = "Enter 10 digit number";
      return;
    } else if (!this.email) {
      this.errMsgEmail = "Email address required";
      return;
    } else if (this.regexEmail.test(this.email) == false) {
      this.errMsgEmail = "Email is not valid";
      return;
    } else if (this.appointment == "") {
      this.errMsgApp = "Select Appointment for";
      return;
    } else if (!this.date) {
      this.errMsgDate = "Select Date";
      return;
    } else if (!this.time) {
      this.errMsgTime = "Select Time";
      return;
    }
    else {
      for (let i = 0; i < this.allData.length; i++) {
        this.dateArr.push(this.allData[i].dateCheck);
      }

      const headers = new HttpHeaders();
      const header = headers.set('Content-Type', 'application/json; charset=utf-8');
      const appointmentID = this.id;
      const fullName = this.name;
      const contactNum = this.number;
      const email = this.email;
      const appointment = this.appointment;
      const onDate = this.date;
      const onTime = this.time;

      const dateCheck = 'Date:' + this.date + ' | Time: ' + this.time;

      if (this.dateArr.includes(dateCheck)) {
        this.successMsg = "Time slot booked!"
        return;
      } else {
        this.successMsg = "Booking...";
        await this.http.post(this.url, { appointmentID, fullName, contactNum, email, appointment, onDate, onTime, dateCheck }, { headers: header }).subscribe((response) => {
          console.log(response);
          this.name = "";
          this.number = "";
          this.email = "";
          this.appointment = "";
          this.date = "";
          this.time = "";
          this.errMsgName = "";
          this.errMsgNumber = "";
          this.errMsgApp = "";
          this.errMsgEmail = "";
          this.errMsgDate = "";
          this.successMsg = "Booked Successfully";
          this.appointmentID = appointmentID
          this.bookForm = false;
          this.appID = true;
        }, (err) => {
          this.successMsg = "Error in booking appointment. Please Try again!!"
          console.log(err);
        })
      }
    }
  }

  private async fetchData() {
    await this.http.get(this.url).pipe(map((responseMap) => {
      const products = [];
      for (const key in responseMap) {
        if (responseMap.hasOwnProperty(key)) {
          products.push({ ...responseMap[key], id: key })
        }
      }
      this.allData = products;
      return products;
    })).subscribe((response) => {
    })
  }
}