import { AccountMongoRepository } from '@/infra/db/mongodb/account'
import { DbLoadAccountByToken } from '@/data/usecases/load-account-by-token'
import { LoadAccountByToken } from '@/domain/usecases'
import { JwtAdapter } from '@/infra/cryptography'
import env from '@/main/config/env'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.JWT_SECRET)
  const accountMongoRepository = new AccountMongoRepository()

  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository)
}
