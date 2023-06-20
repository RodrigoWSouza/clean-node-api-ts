import { LoadSurveys } from '@/domain/usecases'
import { serverError, serverSuccess } from '@/presentation/helpers/http'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class LoadSurveysController implements Controller {
  constructor (
    private readonly loadSurveys: LoadSurveys
  ) {
    this.loadSurveys = loadSurveys
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load()
      return serverSuccess(surveys)
    } catch (error) {
      return serverError(error)
    }
  }
}
