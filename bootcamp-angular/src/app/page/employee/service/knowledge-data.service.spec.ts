import { TestBed } from '@angular/core/testing';

import { KnowledgeDataService } from './knowledge-data.service';

describe('KnowledgeDataService', () => {
  let service: KnowledgeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KnowledgeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
