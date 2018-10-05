
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudDashboardComponent } from './cloud-dashboard.component';

describe('CloudDashboardComponent', () => {
  let component: CloudDashboardComponent;
  let fixture: ComponentFixture<CloudDashboardComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CloudDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloudDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
