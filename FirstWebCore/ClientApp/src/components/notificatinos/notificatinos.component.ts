import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notificatinos',
  templateUrl: './notificatinos.component.html',
  styleUrls: ['./notificatinos.component.css']
})
export class NotificatinosComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate(['/notifications/questions']);
  }
}
