import { Component, OnInit, Injectable } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { AskQuestionCommand } from '../models/question/command';
import { Guid } from '../utilities';
import { UserService } from '../services/user.service';
import {ENTER, COMMA, SPACE} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';

@Component({
  selector: 'ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.scss']
})
@Injectable()
export class AskQuestionComponent implements OnInit {

    public question: string
    public title: string
    public subjectTags: string[] = [];
    private questionId = Guid.generate();
    public separatorKeysCodes = [ENTER, COMMA, SPACE]
    constructor(
        private service: QuestionService,
        private userService: UserService
    ) { }

    public ngOnInit() {
    }

    public onAskQuestion() {
        const command = <AskQuestionCommand> {
            userId: this.userService.getLoggedInUser().id,
            description: this.question,
            title: this.title,
            occuredAtUtc: new Date(),
            subjectTags: this.subjectTags
        }

        this.service.askQuestion(this.questionId, command).subscribe(x => x);
    }

    public removeSubjectTag(tag: string) {
        const index = this.subjectTags.indexOf(tag);

        if (index >= 0) {
            this.subjectTags.splice(index, 1);
        }
    }

    public addSubjectTag(event: MatChipInputEvent) {
        const input = event.input
        let tag = event.value

        if(this.isEmptyOrSpaces(tag)) return
        
        tag = tag.replace(' ', '')
                 .toLocaleLowerCase();
        
        const index = this.subjectTags.indexOf(tag);

        if(index < 0) {
            this.subjectTags.push(tag);
        }

        if(input) {
            input.value = '';
        }
    }

    private isEmptyOrSpaces(str){
        return str === null || str.match(/^ *$/) !== null;
    }
}
