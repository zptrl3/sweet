import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SweatDetailComponent } from './sweat-detail.component';

describe('SweatDetailComponent', () => {
  let component: SweatDetailComponent;
  let fixture: ComponentFixture<SweatDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SweatDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SweatDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
