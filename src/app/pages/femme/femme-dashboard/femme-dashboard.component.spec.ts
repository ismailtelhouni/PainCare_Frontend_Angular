import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FemmeDashboardComponent } from './femme-dashboard.component';

describe('FemmeDashboardComponent', () => {
  let component: FemmeDashboardComponent;
  let fixture: ComponentFixture<FemmeDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FemmeDashboardComponent]
    });
    fixture = TestBed.createComponent(FemmeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
