import { HttpRequest, HttpResponse, Middleware } from '@/presentation/protocols'
import { AccessDeniedError } from '@/presentation/errors'
import { forbidden, serverError, serverSuccess } from '@/presentation/helpers/http/http-helper'
import { LoadAccountByToken } from '@/domain/usecases/load-account-by-token'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken
  ) {
    this.loadAccountByToken = loadAccountByToken
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']

      if (!accessToken) {
        return forbidden(new AccessDeniedError())
      }

      const account = await this.loadAccountByToken.load(accessToken)
      if (!account) {
        return forbidden(new AccessDeniedError())
      }

      return serverSuccess({ accountId: account.id })
    } catch (error) {
      return serverError(error)
    }
  }
}
