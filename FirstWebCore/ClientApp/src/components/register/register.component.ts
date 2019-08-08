import { Component, OnInit } from '@angular/core';
import { UserAuthService } from './../../services/auth.service';
import { FormGroup, FormControl, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  User: FormGroup;
  constructor(private auth: UserAuthService, private router: Router) { }

  ngOnInit() {
    this.auth.isSignedIn()
    .subscribe(res => {
      if (res === true) {
        localStorage.setItem('loggedIn', 'true');
        this.router.navigate(['']);
      }
    });
    this.User = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', ),
      confirmpassword: new FormControl('', [Validators.required])
    });
  }
  register() {
    const user: IUser = {id: '', name: this.name.value, email: this.email.value,
      password: this.password.value, confirmpassword: this.confirmpassword.value};
    this.auth.register(user)
    .subscribe(() => {
      localStorage.setItem('loggedIn', 'true');
      location.reload();
      // this.router.navigate(['/']);
    });
  }
  get password() {
    return this.User.get('password');
  }
  get confirmpassword() {
    return this.User.get('confirmpassword');
  }
  get name() {
    return this.User.get('name');
  }
  get email() {
    return this.User.get('email');
  }
  login() {
    this.router.navigate(['/login']);
  }
}
export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  confirmpassword: string;
}
