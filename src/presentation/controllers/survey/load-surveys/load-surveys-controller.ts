import { LoadSurveys } from '@/domain/usecases'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class LoadSurveysController implements Controller {
  constructor (
    private readonly loadSurveys: LoadSurveys
  ) {
    this.loadSurveys = loadSurveys
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadSurveys.load()
    return null
  }
}
