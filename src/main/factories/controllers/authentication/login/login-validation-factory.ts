import { EmailValidatorAdapter } from '@/infra/validation/email-validator-adapter'
import { Validation } from '@/presentation/protocols/validation'
import {
  RequiredFieldValidation,
  ValidationComposite ,
  EmailValidation
} from '@/validation/validators'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
