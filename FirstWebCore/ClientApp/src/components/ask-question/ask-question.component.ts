import { IPost } from './../post/post.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/services/auth.service';
import { PostsService } from 'src/services/posts.service';

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.css']
})
export class AskQuestionComponent implements OnInit {
  recvId: number;
  sendId: number;
  user: any = {};
  constructor(private auth: UserAuthService,
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService) { }

  ngOnInit() {
    this.auth.getCurUser()
      .subscribe(user => {
        this.user = user;
        this.auth.GetAskUserByIdentityId(user.id)
        .subscribe(u => this.sendId = u.id);
      });
    this.route.params.subscribe(params => {
      this.recvId = +params.recvId;
    });
  }
  ask(question: HTMLInputElement, anon: HTMLInputElement) {
    const post: IPost = {
      ansSeen: false,
      qSeen: false,
      anonymous: anon.checked,
      question: question.value,
      recvUserId: this.recvId,
      sendUserId: this.sendId,
      answer: '',
      date: '',
      id: -1,
      answered: false,
      likes: [],
      sendUser: { identityId: '', name: '' },
      recvUser: { identityId: '', name: '' },
    };
    // console.log(post);
    this.postsService.askQuestion(post)
      .subscribe(res => console.log(res));
    alert('Question Sent Successfully');
    this.router.navigate(['/']);
  }
}

