import { DbAuthentication } from '@/data/usecases/authentication'
import { AccountMongoRepository } from '@/infra/db/mongodb/account'
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter/jwt-adapter'
import env from '@/main/config/env'
import { Authentication } from '@/domain/usecases/authentication'

export const makeDbAuthentication = (): Authentication => {
  const salt = env.SALT
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.JWT_SECRET)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
}
