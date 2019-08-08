import { IAskUser } from './../profile/profile.component';
import { UserAuthService } from 'src/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { PostsService } from 'src/services/posts.service';
import { IUser } from '../register/register.component';
import { post } from 'selenium-webdriver/http';
import { delay } from 'q';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  like: ILike = null;
  // tslint:disable-next-line:no-input-rename
  user: IUser = { id: '', name: '', password: '', email: '', confirmpassword: '' };
  askUser: any = {};
  // tslint:disable-next-line:no-input-rename
  @Input('posts') posts: IPost[] = null;
  userID: string;
  @Input('isProfile') isProfile: Boolean = false;
  constructor(private postsService: PostsService,
    private route: ActivatedRoute,
    private auth: UserAuthService) {
  }

  ngOnInit() {
    this.auth.getCurUser().subscribe(user => {
      this.user = user;
      this.auth.GetAskUserByIdentityId(user.id)
        .subscribe(u => this.askUser = u);
    });
    // if (this.isProfile === true) {
    //   this.route.params.subscribe(params => this.userID = params.userId);

    // this.postsService.getUserPosts(this.userID).subscribe(res => this.posts = res);
    // }
    // console.log('postsid: ' + this.userID);
    // this.postsService.getUserPosts(this.userID)
    //   .subscribe(res => this.posts = res);
  }
  // tslint:disable-next-line: no-shadowed-variable
  toggle(post: IPost) {
    const liked = post.likes.find(l => +l.reactUserId === this.askUser.id || l.reactUserId === this.user.id);
    this.postsService.toggleLike(post.id, this.user.id)
      .subscribe(res => {
        this.like = {
          id: 0,
          postId: post.id,
          reactUserId: this.user.id,
          answer: post.answer,
          reactUserName: this.user.name,
          seen: false
        };
        if (liked === undefined) {
          post.likes.push(this.like);
        } else {
          const idx = post.likes.indexOf(liked);
          post.likes.splice(idx, 1);
        }
      });
  }
  // tslint:disable-next-line:no-shadowed-variable
  isLiked(post: IPost) {
    const liked = post.likes.find(l => +l.reactUserId === this.askUser.id || l.reactUserId === this.user.id);
    return liked !== undefined;
  }
}

export interface IPost {
  id: number;
  question: string;
  answer: string;
  recvUser: { name: string, identityId: string };
  recvUserId: number;
  sendUser: { name: string, identityId: string };
  sendUserId: number;
  date: string;
  likes: ILike[];
  answered: boolean;
  anonymous: boolean;
  qSeen: boolean;
  ansSeen: boolean;
}
export interface ILike {
  id: number; postId: number; reactUserId: string; answer: string; reactUserName: string; seen: boolean;
}
