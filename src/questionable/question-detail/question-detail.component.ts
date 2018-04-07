import { Component, Injectable, OnInit } from "@angular/core";
import { ActivatedRoute, Router, ParamMap } from "@angular/router";
import { QuestionService } from "../services/question.service";
import { UserService } from "../services/user.service";
import { QuestionDetails } from "../models/question";
import { AcceptAnswerCommand, LikeQuestionCommand } from "../models/question/command";

@Component({
  selector: 'question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss']
})
@Injectable()
export class QuestionDetailComponent implements OnInit {
    
    private userId : string
    
    public question : QuestionDetails

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: QuestionService,
        private userService: UserService
    ) { }

    public ngOnInit() {
        this.userId = this.userService.getLoggedInUser().id
        this.route.paramMap
            .switchMap((params: ParamMap) =>
                this.service.fetchQuestion(params.get('id')))
            .subscribe(data => this.question = data);
    }

    public isQuestionClosed() {
        return this.question.answers.some(x => x.accepted)
    }

    public isOwnQuestion() {
        return this.userId == this.question.user.id
    }

    public acceptAnswer(id : string) {
        if(this.question) {
            let command = new AcceptAnswerCommand()
            command.userId = this.userId
            command.answerId = id
            this.service.acceptAnswer(this.question.id, command)
                .subscribe(success => {
                    this.question.answers.forEach((answer => {
                        if(answer.id == id) {
                            answer.accepted = true
                        }
                    }))
                })
        }
    }

    public hasAcceptedAnswer() {
        return this.question.answers.some(x => x.accepted);
    }
    
    public onLike() {
        var command = new LikeQuestionCommand()
        command.occuredAtUtc = new Date()
        this.service.likeQuestion(this.question.id, this.userId, command)
            .subscribe(success => {
                this.question.likes++
            })
    }
}
