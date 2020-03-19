import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimerLessonComponent } from './supprimer-lesson.component';

describe('SupprimerLessonComponent', () => {
  let component: SupprimerLessonComponent;
  let fixture: ComponentFixture<SupprimerLessonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupprimerLessonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupprimerLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
