import { EmailValidatorAdapter } from '@/infra/validation/email-validator-adapter'
import { Validation } from '@/presentation/protocols/validation'
import {
  RequiredFieldValidation,
  CompareFieldValidation,
  ValidationComposite,
  EmailValidation
} from '@/validation/validators'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
