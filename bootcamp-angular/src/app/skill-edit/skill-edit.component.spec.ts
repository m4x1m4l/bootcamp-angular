import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillEditComponent } from './skill-edit.component';

describe('SkillEditComponent', () => {
  let component: SkillEditComponent;
  let fixture: ComponentFixture<SkillEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkillEditComponent]
    });
    fixture = TestBed.createComponent(SkillEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
