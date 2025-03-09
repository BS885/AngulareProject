import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { techerGuardGuard } from './techer-guard.guard';

describe('techerGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => techerGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
