import { Component } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-get-quote',
  templateUrl: './get-quote.component.html',
  styleUrls: ['./get-quote.component.css']
})
export class GetQuoteComponent {

  name: string = "";
  email: string = "";
  phone: string = "";
  appointment: string = "";
  message: string = "";

  errMsg: string = "";
  successMsg: string = "";

  regexEmail: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  regexPhone: RegExp = /^\d{10}$/;

  constructor() { }

  clear() {
    this.errMsg = "";
    this.successMsg = "";
  }

  async getQuote() {
    if (!this.name) {
      this.errMsg = "Name is required";
      return;
    } else if (!this.email) {
      this.errMsg = "Email is required";
      return;
    } else if (this.regexEmail.test(this.email) == false) {
      this.errMsg = "Email is not valid";
      return;
    } else if (!this.phone) {
      this.errMsg = "Phone is required";
      return;
    } else if (this.regexPhone.test(this.phone) == false) {
      this.errMsg = "Enter 10 digit number";
      return;
    } else if (isNaN(parseInt(this.phone))) {
      this.errMsg = "Phone number isn't valid";
      return;
    } else if (!this.appointment) {
      this.errMsg = "Appointment is required";
      return;
    } else if (!this.message) {
      this.errMsg = "Message is required";
      return;
    } else {
      this.successMsg = "Sending quote request....";
      await emailjs.send("service_8umtamb", "template_x5rq1qz", {
        from_name: this.name,
        QuoteService: this.appointment,
        name: this.name,
        phone: this.phone,
        email: this.email,
        subject: this.email,
        message: this.message,
      }, "A_iw6yoFPOSo578BH").then((result: EmailJSResponseStatus) => {
        this.successMsg = "Quote request has been sent successfully. You will receive your request soon to your email."
        this.name = "";
        this.email = "";
        this.phone = "";
        this.appointment = "";
        this.message = "";
        this.errMsg = "";
      }, (error) => {
        this.successMsg = "Error in sending quote request. Please try again!!";
      });
    }

  }

}
