import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MotsPage } from './mots.page';

describe('MotsPage', () => {
  let component: MotsPage;
  let fixture: ComponentFixture<MotsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MotsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
