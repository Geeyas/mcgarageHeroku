import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isShowLogOut: boolean = false;
  isShowLogIn: boolean = true;

  username: string = "";
  messageErr: string = "";
  messageSucc: string = "";
  password: string = "";
  url: string = "/api/signup";
  urlAdmin: string = "/api/adminAccess";


  allData: any = [];
  length: number = 0;
  index: number = null;

  fullName = [];
  email = [];
  passwrd = [];
  checkArr = [];

  loggedUser: string = "";
  loggedEmail: string = "";
  loggedContact: string = "";
  userAvatar: string = "";

  logged = document.querySelector('logged');
  loggin = document.querySelector('.logging');

  allAdminData: any = [];
  adminAccess = [];

  adminUsername: string = "mcgarage6060@gmail.com";
  adminPassword: string = "admin";
  constructor(private router: Router, private http: HttpClient) { }

  async ngOnInit() {
    const headers = new HttpHeaders();
    const header = headers.append('Content-Type', 'application/json; charset=utf-8');
    await this.http.get(this.url, { headers: header }).subscribe((response) => {
      this.allData = response;
      this.allData.forEach((data) => {
        this.fullName.push(data.fullName);
        this.email.push(data.email);
        this.passwrd.push(data.password);
        this.checkArr.push(data.check);
      })
    }, (err) => {
      console.log(err);
      this.messageErr = "Loggin not working refresh the page!!";
    })
    if (localStorage.getItem('user') !== null) {
      this.loggedEmail = localStorage.getItem('email');
      this.loggedUser = localStorage.getItem('user');
      this.userAvatar = `https://joeschmoe.io/api/v1/${this.loggedUser}`;
      this.isShowLogOut = true;
      this.isShowLogIn = false;
    }

    await this.http.get(this.urlAdmin, { headers: header }).subscribe((res) => {
      this.allAdminData = res;
      this.allAdminData.forEach((data) => {
        this.adminAccess.push(data.email);
      })
    });
  }

  async login() {
    if (!this.username) {
      this.messageErr = "Email must be entered";
      return;
    } else if (!this.password) {
      this.messageErr = "Password must be entered";
      return;
    } else {
      var checkID = this.username + this.password;
      if (this.checkArr.includes(checkID)) {
        var index = this.email.indexOf(this.username);
        if (this.username == this.adminUsername && this.password == this.adminPassword) {
          // admin logged in
          this.messageSucc = "Logged in Successfully";
          sessionStorage.setItem('user_type', 'admin');
          this.router.navigate(['/admin']);
        } else {
          if (this.adminAccess.includes(this.username)) {
            this.messageSucc = "Logged in Successfully";
            sessionStorage.setItem('user_type', 'admin');
            this.router.navigate(['/admin']);
            return;
          } else {
            //user logged in
            this.messageSucc = "Logged in Successfully";
            setTimeout(() => {
              this.loggedEmail = this.username;
              this.loggedUser = this.fullName[index];
              this.userAvatar = `https://joeschmoe.io/api/v1/${this.loggedUser}`;
              this.isShowLogOut = true;
              this.isShowLogIn = false;
              localStorage.setItem('email', this.loggedEmail);
              localStorage.setItem('user', this.loggedUser);
            }, 1000);
          }
        }
      } else {
        this.username = "";
        this.password = "";
        this.messageErr = "Logged in Failed";
      }
    }
  }

  // FUNCTION gets fired when the google signin button is pressed and the values are fetched from the database to the console
  getData() {
    this.http.get(this.url).subscribe((response) => {
      console.log(response);
    }, (err) => {
      this.messageErr = "Error in Logging in";
    })
  }

  clear() {
    this.messageErr = "";
    this.messageSucc = "";
  }

  logOut() {
    this.isShowLogOut = false;
    this.isShowLogIn = true;
    this.username = "";
    this.password = "";
    this.messageSucc = "Logged out Successfully";
    this.messageErr = "";
    setTimeout(() => {
      this.messageSucc = "";
    }, 1500);
    localStorage.clear();
    sessionStorage.clear();
  }
}
