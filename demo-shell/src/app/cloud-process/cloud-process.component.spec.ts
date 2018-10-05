import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudProcessComponent } from './cloud-process.component';

describe('CloudProcessComponent', () => {
  let component: CloudProcessComponent;
  let fixture: ComponentFixture<CloudProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloudProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloudProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
