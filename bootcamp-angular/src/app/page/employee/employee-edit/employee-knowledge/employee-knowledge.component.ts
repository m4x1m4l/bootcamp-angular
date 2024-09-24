import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Knowledge} from "../../model/knowledge";
import {KnowledgeDataService} from "../../service/knowledge-data.service";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-employee-knowledge',
  templateUrl: './employee-knowledge.component.html',
  styleUrls: ['./employee-knowledge.component.scss']
})
export class EmployeeKnowledgeComponent {


  @Input() currentKnowledge: Knowledge = {
    experienceLevel: 5,
  }
  //@Output die beiden Buttons?
  employeeKnowledgeForm = new FormGroup({
    skillId: new FormControl(0, [Validators.required]),
    experienceLevel: new FormControl(0, [Validators.required]),
  });
  knowledges$: Observable<Knowledge[]> = of([{
    experienceLevel: 1,
    skillId: 123
  }, {
    experienceLevel: 1,
    skillId: 123
  },{
    experienceLevel: 1,
    skillId: 123
  }])

  constructor(private knowledgeDataService: KnowledgeDataService) {
  }


  ngOnInit():void {
    this.employeeKnowledgeForm.patchValue(this.currentKnowledge);
    this.knowledges$ = this.knowledgeDataService.knowledgeList$; //ist im constructor noch nicht vorhanden wegen input!
  }
  onSubmit() {
    //add or update?

  }

  onDelete() {
    console.log(this.currentKnowledge.employeeId)
    console.log(this.employeeKnowledgeForm.get('skillId')?.value)

    this.knowledgeDataService.deleteKnowledge(this.currentKnowledge.employeeId ?? 0,
      this.employeeKnowledgeForm.get('skillId')?.value ?? 0).subscribe();
  }

}
