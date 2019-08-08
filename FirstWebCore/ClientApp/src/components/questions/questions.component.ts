import { UserAuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/services/profile.service';
import { IPost } from '../post/post.component';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  questions: IPost[];
  curUserId: string;
  constructor(private profileService: ProfileService,
    private auth: UserAuthService) { }

  ngOnInit() {
    this.auth.getCurUser().subscribe(user => {
      this.curUserId = user.id;
      this.profileService.getQuestions(user.id)
        .subscribe(res => {
          res.sort((a, b) => a.date >= b.date ? -1 : 1);
          this.questions = res;
          this.questions.forEach(q => {
            this.auth.getAskUserById(q.sendUserId)
            .subscribe(a => {
              q.sendUser = {identityId : a.identityId, name: a.name};
            });
          });
        });
    });
  }


}
