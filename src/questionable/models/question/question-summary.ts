import { UserSummary } from '../user'

export class QuestionSummary {
    questionId : string
    title : string
    description : string
    likes : number
    user : UserSummary
    subjectTags : string[]
    numberOfAnswers : number
}
