import { AuthGuard } from './../services/auth-guard.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { RegisterComponent } from '../components/register/register.component';
import { UserAuthService } from 'src/services/auth.service';
import { LoginComponent } from '../components/login/login.component';
import { PostComponent } from '../components/post/post.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { NotificatinosComponent } from '../components/notificatinos/notificatinos.component';
import { LikesComponent } from '../components/likes/likes.component';
import { QuestionsComponent } from '../components/questions/questions.component';
import { AnswersComponent } from '../components/answers/answers.component';
import { AnswerQuestionComponent } from '../components/answer-question/answer-question.component';
import { PostViewComponent } from '../components/post-view/post-view.component';
import { ProfileService } from 'src/services/profile.service';
import { PostsService } from 'src/services/posts.service';
import { FriendsComponent } from '../components/friends/friends.component';
import { AskQuestionComponent } from '../components/ask-question/ask-question.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    RegisterComponent,
    LoginComponent,
    PostComponent,
    ProfileComponent,
    NotificatinosComponent,
    LikesComponent,
    QuestionsComponent,
    AnswersComponent,
    AnswerQuestionComponent,
    PostViewComponent,
    FriendsComponent,
    AskQuestionComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard] },
      { path: 'profile/:userId', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'friends', component: FriendsComponent, canActivate: [AuthGuard] },
      // { path: 'ask/question/:recvId', component: AskQuestionComponent, canActivate: [AuthGuard] },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'nav/:loggedIn', component: NavMenuComponent },
      { path: 'view/post/:postId', component: PostViewComponent, canActivate: [AuthGuard] },
      { path: 'answer/question/:qID', component: AnswerQuestionComponent, canActivate: [AuthGuard] },
      {
        path: 'notifications',
        children: [
          { path: 'likes', component: LikesComponent, canActivate: [AuthGuard] },
          { path: 'answers', component: AnswersComponent, canActivate: [AuthGuard] },
          { path: 'questions', component: QuestionsComponent, canActivate: [AuthGuard] },
        ],
        component: NotificatinosComponent,
        canActivate: [AuthGuard]
      },
    ])
  ],
  providers: [UserAuthService, AuthGuard, ProfileService, PostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
