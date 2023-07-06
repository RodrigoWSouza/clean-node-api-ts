import { LoadSurveyById } from '@/domain/usecases'
import { InvalidParamError } from '@/presentation/errors'
import { forbidden, serverError, serverSuccess } from '@/presentation/helpers/http'
import {
  Controller,
  HttpRequest,
  HttpResponse
} from '@/presentation/protocols'

export class LoadSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { surveyId } = httpRequest.params
    await this.loadSurveyById.loadById(surveyId)
    return Promise.resolve(null)
  }
}
