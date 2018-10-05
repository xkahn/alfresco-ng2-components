
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudTableComponent } from './cloud-table.component';

describe('CloudTableComponent', () => {
  let component: CloudTableComponent;
  let fixture: ComponentFixture<CloudTableComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CloudTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloudTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
