import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificatinosComponent } from './notificatinos.component';

describe('NotificatinosComponent', () => {
  let component: NotificatinosComponent;
  let fixture: ComponentFixture<NotificatinosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificatinosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificatinosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
