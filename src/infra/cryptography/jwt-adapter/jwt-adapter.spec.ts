import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'
import { Encrypter } from '@/data/protocols'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return Promise.resolve('any_token')
  }
}))

const makeSut = (): Encrypter => {
  return new JwtAdapter('secret')
}

const throwError = (): never => {
  throw new Error()
}

describe('Jwt Adapter', () => {
  test('should call sign with correct values', async () => {
    const sut = makeSut()
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('any_id')

    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
  })

  test('should return a token on sign success', async () => {
    const sut = makeSut()
    const accessToken = await sut.encrypt('any_id')

    expect(accessToken).toBe('any_token')
  })

  test('Should throw if sign throws', async () => {
    const sut = makeSut()
    jest.spyOn(jwt, 'sign').mockImplementationOnce(throwError)

    const promise = sut.encrypt('any_id')

    await expect(promise).rejects.toThrow()
  })
})
