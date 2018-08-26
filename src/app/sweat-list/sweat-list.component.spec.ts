import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SweatListComponent } from './sweat-list.component';

describe('SweatListComponent', () => {
  let component: SweatListComponent;
  let fixture: ComponentFixture<SweatListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SweatListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SweatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
