import { UserAuthService } from './../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/services/posts.service';
import { IPost } from '../post/post.component';

@Component({
  selector: 'app-answer-question',
  templateUrl: './answer-question.component.html',
  styleUrls: ['./answer-question.component.css']
})
export class AnswerQuestionComponent implements OnInit {
  curUser: any;
  qID: number;
  question: IPost = {
    ansSeen: false,
    qSeen: false,
    id: -1,
    question: '',
    answer: '',
    recvUser: { identityId: '', name: '' },
    recvUserId: 1,
    sendUser: { identityId: '', name: '' },
    sendUserId: 1,
    date: '',
    likes: [],
    answered: true,
    anonymous: false
  };
  constructor(private postService: PostsService,
    private auth: UserAuthService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.auth.getCurUser()
      .subscribe(u => {
        this.auth.GetAskUserByIdentityId(u.id)
          .subscribe(user => {
            this.curUser = user;
            this.route.paramMap
              .subscribe(params => {
                this.qID = +params.get('qID');
                this.postService.getQuestionById(this.qID)
                  .subscribe(res => {
                    if (!this.isOwner(res.recvUserId)) { return; }
                    this.question = res;
                    if (res.qSeen !== true) {
                      this.postService.setQSeen(res.id).subscribe();
                    }
                  });
              });
          });
      });
  }
  Answer(answer: HTMLInputElement) {
    // console.log(answer.value);
    this.postService.answerQuestion(this.qID, answer.value)
      .subscribe();
    this.router.navigate(['/']);
  }
  isOwner(recvId: number) {
    return this.curUser.id === recvId;
  }

}
