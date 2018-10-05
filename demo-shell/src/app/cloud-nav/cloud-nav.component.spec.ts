
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CloudNavComponent } from './cloud-nav.component';

describe('CloudNavComponent', () => {
  let component: CloudNavComponent;
  let fixture: ComponentFixture<CloudNavComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatSidenavModule],
      declarations: [CloudNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloudNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
