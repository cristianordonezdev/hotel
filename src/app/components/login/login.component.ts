import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/userService';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { setUserData } from '../../libs/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService],
})
export class LoginComponent implements OnInit {
  constructor(private _service: UserService, private _router: Router) {
   
  }
  show_error_msg: boolean = false

  applyForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit(): void {
  }
  submitApplication() {
    this._service.login(
      this.applyForm.value.username ?? '',
      this.applyForm.value.password ?? '',
    ).subscribe((response) => {
      localStorage.setItem('token', response.token);
      this.saveUser(response);
      this._router.navigate(['/admin/home']);
    },(error) => {
      if (error.status >= 400) this.show_error_msg = true;
    })
  }
  saveUser(response: any): void {
    setUserData({
      user: response.nameUser,
      roles: response.roles,
    });
  }
}
