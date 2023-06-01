import { AddSurvey } from '@/domain/usecases/add-survey'
import { badRequest } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { Validation } from '@/presentation/protocols/validation'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey
  ) {
    this.validation = validation
    this.addSurvey = addSurvey
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return badRequest(error)
    }
    const { question, answers } = httpRequest.body
    await this.addSurvey.add({
      question,
      answers
    })
    return Promise.resolve(null)
  }
}
