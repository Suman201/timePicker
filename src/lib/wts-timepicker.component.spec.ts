import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WtsTimepickerComponent } from './wts-timepicker.component';

describe('WtsTimepickerComponent', () => {
  let component: WtsTimepickerComponent;
  let fixture: ComponentFixture<WtsTimepickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WtsTimepickerComponent],
      imports: []
    });
    fixture = TestBed.createComponent(WtsTimepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
