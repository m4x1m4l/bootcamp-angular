import { TestBed } from '@angular/core/testing';

import { SkillDataServiceService } from './skill-data-service.service';

describe('SkillDataServiceService', () => {
  let service: SkillDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
