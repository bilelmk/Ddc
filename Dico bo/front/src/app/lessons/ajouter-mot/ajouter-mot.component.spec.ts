import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterMotComponent } from './ajouter-mot.component';

describe('AjouterMotComponent', () => {
  let component: AjouterMotComponent;
  let fixture: ComponentFixture<AjouterMotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouterMotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterMotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
