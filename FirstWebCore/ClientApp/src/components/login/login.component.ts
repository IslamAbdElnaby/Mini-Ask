import { IUser } from 'src/components/register/register.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserAuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private auth: UserAuthService, private router: Router) { }
  UserForm: FormGroup;
  errors: any[] = [];
  ngOnInit() {
    this.auth.isSignedIn()
      .subscribe(res => {
        if (res === true) {
          localStorage.setItem('loggedIn', 'true');
          this.router.navigate(['/']);
        }
      });
    this.UserForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }
  get password() {
    return this.UserForm.get('password');
  }
  get name() {
    return this.UserForm.get('name');
  }
  login() {
    const user: IUser = {
      id: '',
      name: this.name.value, email: this.name.value,
      password: this.password.value, confirmpassword: ''
    };
    this.auth.login(user)
      .subscribe(a => {
        if (a === true) {
          localStorage.setItem('loggedIn', 'true');
          this.router.navigate(['/']);
          location.reload();
        } else {
          this.addErrors();
        }
      });
  }
  addErrors() {
    this.errors.push({ loginError: 'Username or password is not correct' });
  }
}
