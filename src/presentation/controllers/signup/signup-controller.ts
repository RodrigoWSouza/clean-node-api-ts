import { AddAccount } from '@/domain/usecases/add-account'
import { badRequest, serverError, serverSuccess } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication } from '@/domain/usecases/authentication'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {
    this.addAccount = addAccount
    this.validation = validation
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password } = httpRequest.body

      await this.addAccount.add({
        name,
        email,
        password
      })

      const accessToken = await this.authentication.auth({
        email,
        password
      })

      return serverSuccess({ accessToken })
    } catch (erro) {
      return serverError(erro)
    }
  }
}
