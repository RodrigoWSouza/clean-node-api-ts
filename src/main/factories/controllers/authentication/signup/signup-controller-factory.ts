import { Controller } from '@/presentation/protocols'
import { SignUpController } from '@/presentation/controllers/authentication/signup'
import { makeSignUpValidation } from './signup-validation-factory'
import { makeDbAuthentication , makeDbAddAccount } from '@/main/factories/usecases/authentication'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())

  return makeLogControllerDecorator(controller)
}
