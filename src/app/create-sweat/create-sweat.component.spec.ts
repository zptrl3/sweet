import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSweatComponent } from './create-sweat.component';

describe('CreateSweatComponent', () => {
  let component: CreateSweatComponent;
  let fixture: ComponentFixture<CreateSweatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSweatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSweatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
