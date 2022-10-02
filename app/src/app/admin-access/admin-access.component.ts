import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-access',
  templateUrl: './admin-access.component.html',
  styleUrls: ['./admin-access.component.css']
})
export class AdminAccessComponent implements OnInit {

  DayDAte = new Date();
  adminID: number = this.DayDAte.getTime();
  email: string = "";
  emailRm: string = "";

  errMsgAdminAccess: string = "";
  errMsgAdminRm: string = "";

  allData: any = [];
  allSignupData: any = [];
  emailArr = [];
  signupEmail = [];

  urlAdmin: string = "/api/adminAccess/";
  urlSignup: string = "/api/signup/";

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.http.get(this.urlAdmin).subscribe((res) => {
      this.allData = res;
    }, (err) => {
      console.log("error in fetching data");
    });

    this.http.get(this.urlSignup).subscribe((res) => {
      this.allSignupData = res;
    }, (err) => {
      console.log("error in fetching data");
    });

  }

  async provideAccess() {
    for (let i = 0; i < this.allData.length; i++) {
      this.emailArr.push(this.allData[i].email);
    }

    for (let i = 0; i < this.allSignupData.length; i++) {
      this.signupEmail.push(this.allSignupData[i].email);
    }

    if (this.signupEmail.includes(this.email)) {
      if (this.emailArr.includes(this.email)) {
        this.errMsgAdminAccess = "Already an admin";
      } else {
        await this.http.post(this.urlAdmin, { adminID: this.adminID, email: this.email }).subscribe((res => {

        }), (err) => {
          this.errMsgAdminAccess = "Admin Access provided successfully";
          setTimeout(() => {
            location.reload();
          }, 1000)
        })
      }
    } else {
      this.errMsgAdminAccess = "Please signup to get admin access";
    }

  }
  async removeAccess() {
    if (!this.emailRm) {
      this.errMsgAdminRm = "Field is empty";
    } else if (this.emailRm === 'mcgarage6060@gmail.com') {
      this.errMsgAdminRm = "Main Admin cannot be deleted";
    } else {
      await this.http.delete((this.urlAdmin + this.emailRm)).subscribe(res => {
        this.errMsgAdminRm = "Delete successfully";
        setTimeout(() => {
          location.reload();
        }, 1000)
      })
    }

  }
  clear() {
    this.errMsgAdminAccess = "";
    this.errMsgAdminRm = "";
  }
  logOut() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
