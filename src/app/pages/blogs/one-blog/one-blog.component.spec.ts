import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneBlogComponent } from './one-blog.component';

describe('OneBlogComponent', () => {
  let component: OneBlogComponent;
  let fixture: ComponentFixture<OneBlogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OneBlogComponent]
    });
    fixture = TestBed.createComponent(OneBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
