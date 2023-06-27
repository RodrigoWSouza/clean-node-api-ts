import { LoadSurveyById, SaveSurveyResult } from '@/domain/usecases'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, serverError } from '@/presentation/helpers/http'
import {
  Controller,
  HttpRequest,
  HttpResponse
} from '@/presentation/protocols'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById,
    private readonly saveSurveyResult: SaveSurveyResult
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const { accountId } = httpRequest
      const survey = await this.loadSurveyById.loadById(surveyId)
      const { answer } = httpRequest.body

      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'))
      }

      if (!survey.answers.some(surveyAnswer => surveyAnswer.answer === answer)) {
        return forbidden(new InvalidParamError('answer'))
      }

      await this.saveSurveyResult.save({
        surveyId,
        accountId,
        answer,
        date: new Date()
      })
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
