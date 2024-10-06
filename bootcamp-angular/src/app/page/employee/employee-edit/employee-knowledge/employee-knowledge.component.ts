import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Knowledge} from "../../model/knowledge";
import {Observable, of} from "rxjs";
import {Skill} from "../../../skill/model/skill";

@Component({
  selector: 'app-employee-knowledge',
  templateUrl: './employee-knowledge.component.html',
  styleUrls: ['./employee-knowledge.component.scss']
})
export class EmployeeKnowledgeComponent {


  @Input() currentKnowledge: Knowledge = {
    experienceLevel: 5,
  }
  @Input() filteredSkillsList$: Observable<Skill[]> = of([]);

  @Input() isAddNewComponent: boolean = false;

  @Output() knowledgeDeleted: EventEmitter<Knowledge> = new EventEmitter<Knowledge>();
  @Output() knowledgeSaved: EventEmitter<Knowledge> = new EventEmitter<Knowledge>();

  employeeKnowledgeForm = new FormGroup({
    skillId: new FormControl(0, [Validators.required]),
    experienceLevel: new FormControl(0, [Validators.required]),
  });



  constructor() {
  }


  ngOnInit():void {
    this.employeeKnowledgeForm.patchValue(this.currentKnowledge);
    if(!this.isAddNewComponent){
      this.employeeKnowledgeForm.get('skillId')?.disable();
    }

  }
  onSubmit() {
    const skillId = +this.employeeKnowledgeForm.get('skillId')!.value! ?? 0;
    const experienceLevel = +this.employeeKnowledgeForm.get('experienceLevel')!.value! ?? 0;
    const employeeId = 3;

    this.knowledgeSaved.emit({
      skillId,
      experienceLevel,
      employeeId
    });
  }

  onDelete() {

  }

}
