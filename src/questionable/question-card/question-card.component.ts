import { Component, Input, Injectable, Inject, OnInit } from '@angular/core';
import { QuestionSummary } from '../models/question';
import { LikeQuestionCommand } from '../models/question/command';
import { Guid } from '../utilities/guid';
import { QuestionService } from '../services/question.service';
import { UserService } from '../services/user.service';

@Component({
    selector: 'question-card',
    templateUrl: './question-card.component.html',
    styleUrls: ['./question-card.component.scss']
})
@Injectable()
export class QuestionCardComponent implements OnInit {

    private userId : string
    @Input()
    public question : QuestionSummary

    constructor(
        private service : QuestionService,
        private userService : UserService
    ) { }
    
    public ngOnInit() {
        this.userId = this.userService.getLoggedInUser().id
    }

    public onLike() {
        var command = new LikeQuestionCommand()
        command.occuredAtUtc = new Date()
        this.service.likeQuestion(this.question.questionId, this.userId, command)
            .subscribe(success => {
                this.question.likes++
            })
    }
}
