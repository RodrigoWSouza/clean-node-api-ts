import { DbAddAccount } from '@/data/usecases/add-account'
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account'
import env from '@/main/config/env'
import { AddAccount } from '@/domain/usecases'

export const makeDbAddAccount = (): AddAccount => {
  const salt = env.SALT
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAddAccount(bcryptAdapter, accountMongoRepository, accountMongoRepository)
}
