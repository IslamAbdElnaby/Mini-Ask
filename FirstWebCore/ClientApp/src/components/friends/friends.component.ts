import { ProfileService } from 'src/services/profile.service';
import { UserAuthService } from 'src/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { IFollower, IAskUser } from '../profile/profile.component';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  curUserId: string;
  friends: IFollower[] = [];
  users: IAskUser[] = [];
  allUsers: IAskUser[] = [];
  constructor(private auth: UserAuthService,
    private profileService: ProfileService) { }

  ngOnInit() {
    this.auth.getAllUsers().subscribe(users => this.allUsers = users);
    this.auth.getCurUser()
      .subscribe(user => {
        this.curUserId = user.id;
        this.profileService.getFriends(this.curUserId)
          .subscribe(res => {
            this.friends = res;
            this.setUsers();
          });
      });
  }
  setUsers() {
    this.friends.forEach(f => {
      this.auth.getAskUserById(f.userId)
        .subscribe(user => f.user = user);
      this.auth.getAskUserById(f.followerId)
        .subscribe(user => f.follower = user);
    });
  }
  filter(name: HTMLInputElement) {
    const search = name.value.toLowerCase();

    if (search === '') {
      this.users = [];
      return;
    }
    this.users = this.allUsers
      .filter(u => u.name.toLowerCase().includes(search));
  }
}
