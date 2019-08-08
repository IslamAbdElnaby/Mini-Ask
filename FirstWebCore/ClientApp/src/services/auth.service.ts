import { IAskUser } from './../components/profile/profile.component';
import { IUser } from './../components/register/register.component';
import { map } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class UserAuthService {
  url: string;
  headers = new HttpHeaders().set('content-type', 'application/json');
  constructor(private http: HttpClient,  @Inject('BASE_URL') baseUrl: string) {
    this.url = baseUrl + 'api/Auth';
  }
  login(user: IUser) {
    return this.http.post(this.url + '/login', user, {headers: this.headers})
    .pipe(map(res => res));
  }
  register(user: IUser) {
    return this.http.post<Boolean>(this.url + '/Register', user, {headers: this.headers})
    .pipe(map(res => res));
  }
  isSignedIn() {
    return this.http.get(this.url + '/IsSignedIn', {})
    .pipe(map(res => res));
  }
  logout() {
    return this.http.post(this.url + '/logout', {})
    .pipe(map(res => res));
  }
  getCurUser() {
    return this.http.get(this.url + '/get')
    .pipe(map((user: IUser) => user));
  }
  GetAskUserByIdentityId(identityId: string) {
    return this.http.get<IAskUser>(this.url + `/GetAskUserByIdentityId/${identityId}`)
    .pipe(map(user => user));
  }
  getAskUserById(id: number) {
    return this.http.get<IAskUser>(this.url + `/GetAskUserById/${id}`)
    .pipe(map(user => user));
  }
  getAllUsers() {
    return this.http.get<IAskUser[]>(this.url + `/allUsers`)
    .pipe(map(users => users));
  }
}
