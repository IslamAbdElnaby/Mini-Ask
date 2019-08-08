import { ProfileService } from 'src/services/profile.service';
import { UserAuthService } from 'src/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/services/posts.service';
import { IPost } from 'src/components/post/post.component';
import { IUser } from 'src/components/register/register.component';
import { IFollower } from 'src/components/profile/profile.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})
export class HomeComponent implements OnInit {
  friends: IFollower[] = [];
  posts: IPost[] = [];
  user: IUser = { id: '', name: '', password: '', email: '', confirmpassword: '' };
  askUser: any = {};
  IDs: number[] = [];
  loading = true;
  constructor(private postsService: PostsService,
    private auth: UserAuthService,
    private profileService: ProfileService) {
  }
  ngOnInit() {
    setTimeout(() => {
      this.auth.getCurUser().subscribe(user => {
        this.user = user;
        this.profileService.getFriends(user.id)
          .subscribe(res => {
            this.friends = res;
            this.setUsers();
          });
        this.auth.GetAskUserByIdentityId(user.id)
          .subscribe(u => this.askUser = u);
        this.postsService.getHomePosts(user.id)
          .subscribe(res => {
            this.posts = res;
            this.posts.sort((a, b) => a.date >= b.date ? -1 : 1);
            this.posts.forEach(p => {
              this.auth.getAskUserById(p.recvUserId)
                .subscribe(u => p.recvUser = u);
              this.auth.getAskUserById(p.sendUserId)
                .subscribe(u => p.sendUser = u);
            });
          });
        this.loading = false;
      });
    }, 500);
  }
  setUsers() {
    this.friends.forEach(f => {
      this.auth.getAskUserById(f.userId)
        .subscribe(user => f.user = user);
      this.auth.getAskUserById(f.followerId)
        .subscribe(user => f.follower = user);
    });
  }
  selectUser(id: number) {
    const a = this.IDs.find(q => q === id);
    if (a === undefined) {
      this.IDs.push(id);
    } else {
      this.IDs.splice(this.IDs.indexOf(a), 1);
    }
  }
  ask(question: HTMLInputElement, anon: HTMLInputElement) {
    // this.setSendRecv();
    if (question.value === '') { return; }

    this.IDs.forEach(id => {
      const post: IPost = {
        anonymous: anon.checked,
        question: question.value,
        recvUserId: id,
        sendUserId: this.askUser.id,
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
    });
    alert('Question Sent Successfully');
    question.value = '';
    anon.checked = false;
  }
}
