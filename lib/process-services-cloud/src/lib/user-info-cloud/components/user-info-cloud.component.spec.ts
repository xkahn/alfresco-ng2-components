import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoCloudComponent } from './user-info-cloud.component';

describe('UserInfoCloudComponent', () => {
  let component: UserInfoCloudComponent;
  let fixture: ComponentFixture<UserInfoCloudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInfoCloudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoCloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
