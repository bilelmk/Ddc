import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimerMotComponent } from './supprimer-mot.component';

describe('SupprimerMotComponent', () => {
  let component: SupprimerMotComponent;
  let fixture: ComponentFixture<SupprimerMotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupprimerMotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupprimerMotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
