import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierLessonComponent } from './modifier-lesson.component';

describe('ModifierLessonComponent', () => {
  let component: ModifierLessonComponent;
  let fixture: ComponentFixture<ModifierLessonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierLessonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
