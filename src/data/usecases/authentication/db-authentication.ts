import { Authentication, AuthenticationModel } from '@/domain/usecases'
import {
  LoadAccountByEmailRepository,
  HashCompare,
  Encrypter,
  UpdateAccessTokenRepository
} from '@/data/protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashCompare: HashCompare,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.hashCompare = hashCompare
    this.encrypter = encrypter
    this.updateAccessTokenRepository = updateAccessTokenRepository
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
    if (!account) {
      return null
    }

    const isValid = await this.hashCompare.compare(authentication.password, account.password)
    if (!isValid) {
      return null
    }

    const accessToken = await this.encrypter.encrypt(account.id)
    await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken)
    return accessToken
  }
}
