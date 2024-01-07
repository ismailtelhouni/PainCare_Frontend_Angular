import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFemmeComponent } from './new-femme.component';

describe('NewFemmeComponent', () => {
  let component: NewFemmeComponent;
  let fixture: ComponentFixture<NewFemmeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewFemmeComponent]
    });
    fixture = TestBed.createComponent(NewFemmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
