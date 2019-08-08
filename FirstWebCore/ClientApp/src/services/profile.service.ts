import { IFollower } from './../components/profile/profile.component';
import { IPost, ILike } from './../components/post/post.component';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IProfile } from 'src/components/profile/profile.component';

@Injectable({providedIn: 'root'})
export class ProfileService {
  url: string;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.url = baseUrl + 'api/profile';
  }
  getProfile(id: string) {
    return this.http.get<IProfile>(this.url + `/${id}`)
    .pipe(map((res: IProfile) => res));
  }
  getQuestions(id: String) {
    return this.http.get(this.url + `/questions/${id}`)
    .pipe(map((res: IPost[]) => res));
  }
  getAnswers(id: String) {
    return this.http.get(this.url + `/answers/${id}`)
    .pipe(map((res: IPost[]) => res));
  }
  getLikes(id: String) {
    return this.http.get(this.url + `/likes/${id}`)
    .pipe(map((res: ILike[]) => res));
  }
  following(followerId: string, userId: string) {
    return this.http.get<boolean>(this.url + `/following/${userId}/${followerId}`)
    .pipe(map(res => res));
  }
  follow(followerId: string, userId: string) {
    return this.http.post(this.url + `/follow/${userId}/${followerId}`, {});
  }
  getFriends(id: string) {
    return this.http.get<IFollower[]>(this.url + `/friends/${id}`)
    .pipe(map(res => res));
  }

}
