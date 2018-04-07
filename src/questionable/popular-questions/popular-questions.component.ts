import { Component, OnInit, Injectable, Inject } from '@angular/core'
import { PopularQuestions } from '../models/question'
import { QuestionService } from '../services/question.service'

@Component({
  selector: 'popular-questions',
  templateUrl: './popular-questions.component.html',
  styleUrls: ['./popular-questions.component.scss']
})
@Injectable()
export class PopularQuestionsComponent implements OnInit {
    
    public popularQuestions : PopularQuestions

    constructor(
        private service: QuestionService
    ) { }
    
    public ngOnInit() {
        this.service.fetchPopularQuestions()
            .subscribe(data => this.popularQuestions = data)
    }
}
