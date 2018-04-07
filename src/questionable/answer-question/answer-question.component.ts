import { Component, Injectable, OnInit, Input } from '@angular/core'
import { QuestionService } from '../services/question.service'
import { UserService } from '../services/user.service'
import { QuestionDetails } from '../models/question/question-details'
import { Guid } from '../utilities/guid'
import { AnswerQuestionCommand } from '../models/question/command'
import { AnswerDetails } from '../models/question'
import { UserSummary } from '../models/user';

@Component({
  selector: 'answer-question',
  templateUrl: './answer-question.component.html',
  styleUrls: ['./answer-question.component.scss']
})
@Injectable()
export class AnswerQuestionComponent implements OnInit {
    
    private user : UserSummary

    @Input()
    public question : QuestionDetails
    public answer : string
    public answerId : string = Guid.generate()

    constructor(
        private service: QuestionService,
        private userService: UserService) { }

    public ngOnInit() {
        this.user = this.userService.getLoggedInUser()
    }

    public onSubmitAnswer() {
        if(this.question && this.answer)
            this.submitAnswer()
    }

    private submitAnswer() {
        let command = this.createAnswerQuestionCommand();
        this.service.answerQuestion(this.question.id, this.answerId, command)
            .subscribe(success => { this.onAnswerSubmitted(command) });
    }

    private createAnswerQuestionCommand() {
        return <AnswerQuestionCommand> {
            userId: this.user.id,
            description: this.answer,
            occuredAtUtc: new Date()
        }
    }

    private onAnswerSubmitted(command: AnswerQuestionCommand) {
        let answer = <AnswerDetails> {
            id: this.answerId,
            description: command.description,
            accepted: false,
            user: this.user
        }
        this.question.answers.push(answer)
    }
}
