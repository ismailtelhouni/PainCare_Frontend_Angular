import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightLandingComponent } from './right-landing.component';

describe('RightLandingComponent', () => {
  let component: RightLandingComponent;
  let fixture: ComponentFixture<RightLandingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RightLandingComponent]
    });
    fixture = TestBed.createComponent(RightLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
