import { UserSummary } from '../user'
import { AnswerDetails } from './answer-details'

export class QuestionDetails {
    id : string
    title : string
    description : string
    likes : number
    user : UserSummary
    subjectTags : string[]
    answers : AnswerDetails[]
}
