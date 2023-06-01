import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { Validation } from '@/presentation/protocols/validation'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(httpRequest.body)
    return Promise.resolve(null)
  }
}
