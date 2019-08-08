import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { rS } from '@angular/core/src/render3';
import { IPost, ILike } from 'src/components/post/post.component';

@Injectable({ providedIn: 'root' })
export class PostsService {
  url: string;
  headers = new HttpHeaders().set('content-type', 'application/json');
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.url = baseUrl + 'api/Posts';
  }
  getUserPosts(id: string) {
    return this.http.get<IPost[]>(this.url + '/' + id)
      .pipe(map((res: IPost[]) => res));
  }
  getHomePosts(id: string) {
    return this.http.get<IPost[]>(this.url + '/GetHomePosts/' + id)
      .pipe(map((res: IPost[]) => res));
  }
  toggleLike(postId: number, reactUserId: string) {
    return this.http.post(this.url + `/setLike/${postId}/${reactUserId}`, {})
      .pipe(map(res => res));
  }
  askQuestion(post: IPost) {
    return this.http.post(this.url, post).pipe(map(res => res));
  }
  answerQuestion(id: number, answer: string) {
    return this.http.put(this.url + `/answer/${id}/${answer}`, {})
      .pipe(map(res => res));
  }
  getQuestionById(id: number) {
    return this.http.get(this.url + `/question/${id}`)
      .pipe(map((res: IPost) => res));
  }
  getPostById(id: number) {
    return this.http.get(this.url + `/getPost/${id}`)
      .pipe(map((res: IPost) => res));
  }
  setQSeen(id: number) {
    return this.http.post(this.url + `/SetQSeen/${id}`, {})
      .pipe(map(res => res));
  }
  setAnsSeen(id: number) {
    return this.http.post(this.url + `/SetAnsSeen/${id}`, {})
      .pipe(map(res => res));
  }
  setLikeSeen(id: number) {
    return this.http.post(this.url + `/SetLikeSeen/${id}`, {})
      .pipe(map(res => res));
  }
  getNotificationCount(userId: number) {
    return this.http.get<number>(this.url + `/GetNotificationCount/${userId}`)
      .pipe(map(res => res));
  }
}
