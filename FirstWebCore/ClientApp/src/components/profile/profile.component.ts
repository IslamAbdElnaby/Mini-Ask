import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/services/profile.service';
import { IPost } from '../post/post.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService } from 'src/services/auth.service';
import { IUser } from '../register/register.component';
import { PostsService } from 'src/services/posts.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: IProfile;
  // tslint:disable-next-line:no-input-rename
  userID: string;
  curUserId: string;
  recvrId: number;
  sendrId: number;
  // tslint:disable-next-line:no-inferrable-types
  follow: boolean = false;
  loading = true;
  constructor(private profileService: ProfileService,
    private auth: UserAuthService,
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.auth.getCurUser()
        .subscribe(user => this.curUserId = user.id);
      this.route.params.subscribe(params => {
        this.userID = params.userId;
      });
      this.profileService.getProfile(this.userID)
        .subscribe((res => {
          if (res) {
            this.profile = res;
            this.profile.posts = this.profile.posts.filter(p => p.answered !== false);
            this.profile.posts.sort((a, b) => a.date >= b.date ? -1 : 1);
            this.profile.posts.forEach(p => {
              this.auth.getAskUserById(p.recvUserId)
                .subscribe(u => p.recvUser = u);
              this.auth.getAskUserById(p.sendUserId)
                .subscribe(u => p.sendUser = u);
            });
            this.setSendRecv();
            this.following();
            this.loading = false;
          } else {
            this.router.navigate(['/login']);
          }
          // console.log(this.profile.posts);
          // console.log(this.profile.followers);
        }));
    }, 500);
  }
  showImage(myImage, modal, modalImage) {
    modalImage.src = myImage.src;
    // console.log(modalImage)
    modal.style.display = 'block';
  }
  hide(modal) {
    modal.style.display = 'none';
  }
  ask(question: HTMLInputElement, anon: HTMLInputElement) {
    // this.setSendRecv();
    if (question.value === '') { return; }
    const post: IPost = {
      anonymous: anon.checked,
      question: question.value,
      recvUserId: this.recvrId,
      sendUserId: this.sendrId,
      answer: '',
      date: '',
      id: -1,
      answered: false,
      likes: [],
      sendUser: { identityId: '', name: '' },
      recvUser: { identityId: '', name: '' },
      ansSeen: false,
      qSeen: false
    };
    this.postsService.askQuestion(post)
      .subscribe(res => console.log(res));
    alert('Question Sent Successfully');
    question.value = '';
    anon.checked = false;
  }
  setSendRecv() {
    this.auth.GetAskUserByIdentityId(this.profile.identityId)
      .subscribe(res => this.recvrId = res.id);
    this.auth.GetAskUserByIdentityId(this.curUserId)
      .subscribe(res => this.sendrId = res.id);
  }
  following() {
    try {
      this.profileService.following(this.curUserId, this.profile.identityId)
        .subscribe(res => this.follow = res);
    } catch { }
  }
  setFollow() {
    this.profileService.follow(this.curUserId, this.profile.identityId)
      .subscribe(res => res);
    this.follow = !this.follow;
  }
}
export interface IProfile {
  id: number;
  identityId: string;
  name: string;
  email: string;
  photoPath: string;
  posts: IPost[];
  followers: IFollower[];
}
export interface IAskUser {
  id: number;
  identityId: string;
  name: string;
}
export interface IFollower {
  userId: number;
  user: IAskUser;
  followerId: number;
  follower: IAskUser;
  id: number;
}
