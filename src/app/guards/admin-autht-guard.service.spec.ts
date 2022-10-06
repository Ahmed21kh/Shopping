import { TestBed } from '@angular/core/testing';

import { AdminAuthtGuardService } from './admin-autht-guard.service';

describe('AdminAuthtGuardService', () => {
  let service: AdminAuthtGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAuthtGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
