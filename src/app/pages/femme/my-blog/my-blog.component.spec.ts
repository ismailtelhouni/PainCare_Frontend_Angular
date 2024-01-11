import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBlogComponent } from './my-blog.component';

describe('MyBlogComponent', () => {
  let component: MyBlogComponent;
  let fixture: ComponentFixture<MyBlogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyBlogComponent]
    });
    fixture = TestBed.createComponent(MyBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
