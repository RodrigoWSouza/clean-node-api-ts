import { LoadSurveyById } from '@/domain/usecases'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, serverError } from '@/presentation/helpers/http'
import {
  Controller,
  HttpRequest,
  HttpResponse
} from '@/presentation/protocols'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const survey = await this.loadSurveyById.loadById(surveyId)

      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'))
      }

      const { answer } = httpRequest.body
      if (!survey.answers.some(surveyAnswer => surveyAnswer.answer === answer)) {
        return forbidden(new InvalidParamError('answer'))
      }
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
