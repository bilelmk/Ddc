import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MotPage } from './mot.page';

describe('MotPage', () => {
  let component: MotPage;
  let fixture: ComponentFixture<MotPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MotPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
