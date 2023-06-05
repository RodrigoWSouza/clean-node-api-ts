import { HttpRequest, HttpResponse, Middleware } from '@/presentation/protocols'
import { AccessDeniedError } from '@/presentation/errors'
import { forbidden, serverSuccess } from '@/presentation/helpers/http/http-helper'
import { LoadAccountByToken } from '@/domain/usecases/load-account-by-token'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken
  ) {
    this.loadAccountByToken = loadAccountByToken
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const accessToken = httpRequest.headers?.['x-access-token']

    if (!accessToken) {
      return forbidden(new AccessDeniedError())
    }

    const account = await this.loadAccountByToken.load(accessToken)
    if (!account) {
      return forbidden(new AccessDeniedError())
    }

    return serverSuccess({ accountId: account.id })
  }
}
