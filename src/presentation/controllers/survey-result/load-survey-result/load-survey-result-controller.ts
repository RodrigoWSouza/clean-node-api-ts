import {
  LoadSurveyById,
  LoadSurveyResult
} from '@/domain/usecases'
import { InvalidParamError } from '@/presentation/errors'
import {
  forbidden,
  serverError,
  serverSuccess
} from '@/presentation/helpers/http'
import {
  Controller,
  HttpRequest,
  HttpResponse
} from '@/presentation/protocols'

export class LoadSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById,
    private readonly loadSurveyResult: LoadSurveyResult
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const survey = await this.loadSurveyById.loadById(surveyId)

      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'))
      }
      const surveyResult = await this.loadSurveyResult.load(surveyId)

      return serverSuccess(surveyResult)
    } catch (error) {
      return serverError(error)
    }
  }
}
