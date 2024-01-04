import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftLandingComponent } from './left-landing.component';

describe('LeftLandingComponent', () => {
  let component: LeftLandingComponent;
  let fixture: ComponentFixture<LeftLandingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeftLandingComponent]
    });
    fixture = TestBed.createComponent(LeftLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
