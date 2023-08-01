import { TestBed } from '@angular/core/testing';

import { WtsTimepickerService } from './wts-timepicker.service';

describe('WtsTimepickerService', () => {
  let service: WtsTimepickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WtsTimepickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
