import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessServiceCloudComponent } from './process-service-cloud.component';

describe('ProcessServiceCloudComponent', () => {
  let component: ProcessServiceCloudComponent;
  let fixture: ComponentFixture<ProcessServiceCloudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessServiceCloudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessServiceCloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
