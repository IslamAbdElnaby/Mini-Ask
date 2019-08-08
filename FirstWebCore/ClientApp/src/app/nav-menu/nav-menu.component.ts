import { PostsService } from './../../services/posts.service';
import { IUser } from './../../components/register/register.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService } from 'src/services/auth.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit, OnDestroy {
  loggedIn: Boolean = false;
  isExpanded = false;
  count = 0;
  curUser: IUser = { id: '', name: '', password: '', email: '', confirmpassword: '' };
  constructor(private auth: UserAuthService,
    private postService: PostsService,
    private router: Router) {
  }
  ngOnInit() {
    this.auth.isSignedIn()
      .subscribe(res => {
        this.loggedIn = res as Boolean;
        if (this.loggedIn === true) {
          this.auth.getCurUser()
            .subscribe(user => {
              this.curUser = user;
              this.loadNotification();
              localStorage.setItem('userId', user.id);
            });
        }
        localStorage.setItem('loggedIn', this.loggedIn + '');
      });
  }
  ngOnDestroy() {
    localStorage.setItem('loggedIn', 'false');
  }
  collapse() {
    this.isExpanded = false;
  }
  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  logout() {
    localStorage.setItem('loggedIn', 'false');
    this.auth.logout()
      .subscribe(res => {
        this.loggedIn = false;
        localStorage.setItem('loggedIn', 'false');
        location.reload();
      });
    // this.router.navigate(['/login']);
    // location.reload();
  }
  IsLoggedIn() {
    try {
      return localStorage.getItem('loggedIn') === 'true';
    } catch { return false; }
  }
  loadNotification() {
    this.auth.GetAskUserByIdentityId(this.curUser.id)
      .subscribe(user => {
        this.postService.getNotificationCount(user.id)
          .subscribe(count => {
            this.count = count;
            console.log(count);
          });
      });
  }
  resetCount() {
    this.count = 0;
    this.redirectToQuestion();
  }
  redirectToQuestion() {
    this.router.navigate(['/notifications/questions']);
  }
}
