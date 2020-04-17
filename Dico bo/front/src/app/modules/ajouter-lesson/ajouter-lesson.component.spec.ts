import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterLessonComponent } from './ajouter-lesson.component';

describe('AjouterLessonComponent', () => {
  let component: AjouterLessonComponent;
  let fixture: ComponentFixture<AjouterLessonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterLessonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
