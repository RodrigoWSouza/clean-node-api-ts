import { AddAccount, AddAccountParams } from '@/domain/usecases'
import { AccountModel } from '@/domain/models/account'
import {
  AddAccountRepository,
  Hasher,
  LoadAccountByEmailRepository
} from '@/data/protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {
    this.hasher = hasher
    this.addAccountRepository = addAccountRepository
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
  }

  async add (accountData: AddAccountParams): Promise<AccountModel> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    if (!account) {
      const hashedPassword = await this.hasher.hash(accountData.password)

      const newAccount = await this.addAccountRepository.add(
        Object.assign({}, accountData, { password: hashedPassword })
      )
      return newAccount
    }
    return null
  }
}
