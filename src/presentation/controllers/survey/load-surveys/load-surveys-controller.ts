import { LoadSurveys } from '@/domain/usecases'
import { serverSuccess } from '@/presentation/helpers/http'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class LoadSurveysController implements Controller {
  constructor (
    private readonly loadSurveys: LoadSurveys
  ) {
    this.loadSurveys = loadSurveys
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const surveys = await this.loadSurveys.load()
    return serverSuccess(surveys)
  }
}
