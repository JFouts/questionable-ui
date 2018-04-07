import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { PopularQuestions, QuestionDetails } from '../models/question'
import { 
    AskQuestionCommand, 
    AnswerQuestionCommand, 
    LikeQuestionCommand, 
    AcceptAnswerCommand 
} from '../models/question/command'
import { environment } from '../../environments/environment';

@Injectable()
export class QuestionService {

    private baseUrl = environment.baseServiceUrl

    constructor(private http : HttpClient) { }
    
    public fetchPopularQuestions() {
        return this.http.get<PopularQuestions>(this.baseUrl + '/query/popularQuestion')
    }

    public fetchQuestion(id : string) {
        return this.http.get<QuestionDetails>(this.baseUrl + '/query/question/' + id)
    }

    public askQuestion(id : string, command : AskQuestionCommand) {
        return this.http.put<any>(this.baseUrl + '/api/command/questions/' + id, command)
            .map(response => response.status == 204)
    }

    public answerQuestion(questionId : string, id : string, command : AnswerQuestionCommand) {
        return this.http.put<any>(this.baseUrl + '/api/command/questions/' + questionId + '/answers/' + id, command)
            .map(response => response.status == 204)
    }

    public likeQuestion(questionId : string, userId : string, command : LikeQuestionCommand) {
        return this.http.put<any>(this.baseUrl + '/api/command/questions/' + questionId + '/likes/' + userId, command)
            .map(response => response.status == 204)
    }

    public acceptAnswer(questionId : string, command : AcceptAnswerCommand) {
        return this.http.put<any>(this.baseUrl + '/api/command/questions/' + questionId + '/acceptedAnswer', command)
            .map(response => response.status == 204)
    }
}

