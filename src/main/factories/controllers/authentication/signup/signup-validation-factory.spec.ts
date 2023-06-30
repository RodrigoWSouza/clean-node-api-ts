import { Validation } from '@/presentation/protocols/validation'
import {
  RequiredFieldValidation,
  CompareFieldValidation ,
  ValidationComposite,
  EmailValidation
} from '@/validation/validators'
import { makeSignUpValidation } from '@/main/factories/controllers/authentication'
import { mockEmailValidator } from '@/validation/mocks'

jest.mock('@/validation/validators/validation-composite')

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', mockEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
