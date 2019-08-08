import { Component, OnInit } from '@angular/core';
import { UserAuthService } from 'src/services/auth.service';
import { ProfileService } from 'src/services/profile.service';
import { IPost } from '../post/post.component';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit {
  curUserId: string;
  answers: IPost[] = [];
  constructor(private auth: UserAuthService,
    private profileService: ProfileService) {
  }

  ngOnInit() {
    this.auth.getCurUser().subscribe(user => {
      this.curUserId = user.id;
      this.profileService.getAnswers(user.id)
        .subscribe(res => {
          res.sort((a, b) => a.date >= b.date ? -1 : 1);
          this.answers = res;
          this.answers.forEach(ans => {
            this.auth.getAskUserById(ans.recvUserId)
            .subscribe(a => {
              ans.recvUser = {identityId : a.identityId, name: a.name};
            });
          });
        });
    });
  }

}
