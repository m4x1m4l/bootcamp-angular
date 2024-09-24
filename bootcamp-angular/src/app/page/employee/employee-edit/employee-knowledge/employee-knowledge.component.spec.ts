import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EmployeeKnowledgeComponent} from './employee-knowledge.component';

describe('EmployeeKnowledgeComponent', () => {
  let component: EmployeeKnowledgeComponent;
  let fixture: ComponentFixture<EmployeeKnowledgeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeKnowledgeComponent]
    });
    fixture = TestBed.createComponent(EmployeeKnowledgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
