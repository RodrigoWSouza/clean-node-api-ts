import {
  AddAccountRepository,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository
} from '@/data/protocols/db'
import { AccountModel } from '@/domain/models'
import { AddAccountParams } from '@/domain/usecases'
import { mockAccountModel } from '@/domain/mocks'
import { LoadAccountByTokenRepository } from '../db/account/load-account-by-token-repository'

export const mockAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (accountData: AddAccountParams): Promise<AccountModel> {
      return Promise.resolve(mockAccountModel())
    }
  }
  return new AddAccountRepositoryStub()
}

export const mockLoadAccountByEmailRepositoryStub = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<AccountModel> {
      return Promise.resolve(mockAccountModel())
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

export const mockLoadAccountByTokenRepositoryStub = (): LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
    async loadByToken (token: string, role?: string): Promise<AccountModel> {
      return Promise.resolve(mockAccountModel())
    }
  }
  return new LoadAccountByTokenRepositoryStub()
}

export const mockUpdateAccessTokenRepository = (): UpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
    async updateAccessToken (id: string, token: string): Promise<void> {
      return Promise.resolve()
    }
  }
  return new UpdateAccessTokenRepositoryStub()
}
