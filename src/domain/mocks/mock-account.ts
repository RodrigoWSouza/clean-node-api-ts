import { AccountModel } from '@/domain/models'
import { AddAccountParams, AuthenticationModel } from '@/domain/usecases'

export const mockAddAccountParams = (): AddAccountParams => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

export const mockAccountModel = (): AccountModel => Object.assign({}, mockAddAccountParams(), {
  id: 'any_id'
})

export const mockFakeAuthentication = (): AuthenticationModel => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})
