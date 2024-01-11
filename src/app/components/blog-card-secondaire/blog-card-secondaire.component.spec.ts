import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogCardSecondaireComponent } from './blog-card-secondaire.component';

describe('BlogCardSecondaireComponent', () => {
  let component: BlogCardSecondaireComponent;
  let fixture: ComponentFixture<BlogCardSecondaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogCardSecondaireComponent]
    });
    fixture = TestBed.createComponent(BlogCardSecondaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
