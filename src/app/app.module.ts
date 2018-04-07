import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppMaterialModule } from './app.material.module'
import { HttpClientModule } from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router'
import { AppComponent } from './app.component'
import { PopularQuestionsComponent } from '../questionable/popular-questions/popular-questions.component'
import { QuestionCardComponent } from '../questionable/question-card/question-card.component'
import { QuestionService } from '../questionable/services/question.service'
import { QuestionDetailComponent } from '../questionable/question-detail/question-detail.component'
import { AskQuestionComponent } from '../questionable/ask-question/ask-question.component'
import { UserService } from '../questionable/services/user.service'
import { AnswerQuestionComponent } from '../questionable/answer-question/answer-question.component'

const appRoutes: Routes = [
  { path: 'popular', component: PopularQuestionsComponent },
  { path: 'question/:id', component: QuestionDetailComponent },
  { path: 'ask', component: AskQuestionComponent },
  { path: '**', redirectTo: 'popular' }
];

@NgModule({
  declarations: [
    AppComponent,
    PopularQuestionsComponent,
    QuestionCardComponent,
    QuestionDetailComponent,
    AskQuestionComponent,
    AnswerQuestionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true })
  ],
  providers: [QuestionService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
