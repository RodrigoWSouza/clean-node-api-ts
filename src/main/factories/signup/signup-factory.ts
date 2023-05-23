import { Controller } from '../../../presentation/protocols'
import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account'
import { SignUpController } from '../../../presentation/controllers/signup/signup-controller'
import { LogControllerDecorator } from '../../decorators/log/log-controller-decorator'
import { LogMongoRepository } from '../../../infra/db/mongodb/log'
import { makeSignUpValidation } from './signup-validation-factory'
import env from '../../../main/config/env'

export const makeSignUpController = (): Controller => {
  const salt = env.SALT
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const signUpController = new SignUpController(dbAddAccount, makeSignUpValidation())
  const logMongoRepository = new LogMongoRepository()

  return new LogControllerDecorator(signUpController, logMongoRepository)
}
