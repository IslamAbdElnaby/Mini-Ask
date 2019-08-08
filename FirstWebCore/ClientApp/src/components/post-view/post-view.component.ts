import { UserAuthService } from 'src/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/services/posts.service';
import { IPost } from '../post/post.component';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit {
  post: IPost = {
    qSeen: false,
    ansSeen: false,
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
  postId: number;
  constructor(private postsService: PostsService,
    private route: ActivatedRoute,
    private auth: UserAuthService) { }
  ngOnInit() {
    this.route.queryParamMap
      .subscribe(pars => {
        try {
          const likeId = +pars.get('likeId');
          if (likeId !== 0) {
            this.postsService.setLikeSeen(likeId).subscribe();
          }
        } catch {
        }
      });
    this.route.paramMap
      .subscribe(params => {
        this.postId = +params.get('postId');
        this.postsService.getPostById(this.postId)
          .subscribe(post => {
            if (!post) { return; }
            this.post = post;
            if (post.ansSeen !== true) {
              this.postsService.setAnsSeen(post.id).subscribe();
            }
            this.auth.getAskUserById(this.post.recvUserId)
              .subscribe(u => this.post.recvUser = u);
            this.auth.getAskUserById(this.post.sendUserId)
              .subscribe(u => this.post.sendUser = u);
          });
      });
  }

}
