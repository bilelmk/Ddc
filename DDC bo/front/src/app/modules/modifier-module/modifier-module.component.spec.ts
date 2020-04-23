import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierModuleComponent } from './modifier-module.component';

describe('ModifierModuleComponent', () => {
  let component: ModifierModuleComponent;
  let fixture: ComponentFixture<ModifierModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
