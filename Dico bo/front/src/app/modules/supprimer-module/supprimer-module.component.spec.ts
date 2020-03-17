import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupprimerModuleComponent } from './supprimer-module.component';

describe('SupprimerModuleComponent', () => {
  let component: SupprimerModuleComponent;
  let fixture: ComponentFixture<SupprimerModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupprimerModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupprimerModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
