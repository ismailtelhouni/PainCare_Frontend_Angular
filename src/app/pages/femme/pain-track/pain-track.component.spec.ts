import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainTrackComponent } from './pain-track.component';

describe('PainTrackComponent', () => {
  let component: PainTrackComponent;
  let fixture: ComponentFixture<PainTrackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PainTrackComponent]
    });
    fixture = TestBed.createComponent(PainTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
