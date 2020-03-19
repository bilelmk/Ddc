import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierMotComponent } from './modifier-mot.component';

describe('ModifierMotComponent', () => {
  let component: ModifierMotComponent;
  let fixture: ComponentFixture<ModifierMotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierMotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierMotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
