import { LoginController } from '../../../presentation/controllers/login'
import { Controller } from '@/presentation/protocols'
import { DbAuthentication } from '../../../data/usecases/authentication'
import { LogMongoRepository } from '../../../infra/db/mongodb/log'
import { makeLoginValidation } from './login-validation-factory'
import { LogControllerDecorator } from '../../../main/decorators/log'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account'
import { BcryptAdapter } from '../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../infra/cryptography/jwt-adapter/jwt-adapter'
import env from '../../../main/config/env'

export const makeLoginController = (): Controller => {
  const salt = env.SALT
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.JWT_SECRET)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAuthentication = new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
  const loginController = new LoginController(dbAuthentication, makeLoginValidation())
  const logMongoRepository = new LogMongoRepository()

  return new LogControllerDecorator(loginController, logMongoRepository)
}
