import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FemmeActionsComponent } from './femme-actions.component';

describe('FemmeActionsComponent', () => {
  let component: FemmeActionsComponent;
  let fixture: ComponentFixture<FemmeActionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FemmeActionsComponent]
    });
    fixture = TestBed.createComponent(FemmeActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
