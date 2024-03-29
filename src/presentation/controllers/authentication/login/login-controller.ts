import { badRequest, serverError, serverSuccess, unauthorized } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { Authentication } from '@/domain/usecases'
import { Validation } from '@/presentation/protocols/validation'

export class LoginController implements Controller {
  constructor (
    private readonly authentication: Authentication,
    private readonly validation: Validation
  ) {
    this.validation = validation
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { email, password } = httpRequest.body

      const accessToken = await this.authentication.auth({ email, password })

      if (!accessToken) {
        return unauthorized()
      }

      return serverSuccess({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
