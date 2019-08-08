import { IPost, ILike } from './../post/post.component';
import { ProfileService } from 'src/services/profile.service';
import { UserAuthService } from 'src/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.css']
})
export class LikesComponent implements OnInit {
  likes: ILike[] = [];
  temp: any[] = [];
  curUserId: string;
  constructor(private auth: UserAuthService,
    private profileService: ProfileService) {
  }

  ngOnInit() {
    this.auth.getCurUser()
      .subscribe(user => {
        this.curUserId = user.id;
        this.profileService.getLikes(user.id)
          .subscribe(res => {
            this.likes = res;
            this.initViewPosts();
          });
      });
  }
  initViewPosts() {
    this.likes.sort((a, b) => a.id > b.id ? -1 : 1);
    this.likes.forEach(l => {
      this.auth.getAskUserById(+l.reactUserId)
      .subscribe(user => {
        l.reactUserId = user.identityId;
        l.reactUserName = user.name;
      });
    });
  }
}
