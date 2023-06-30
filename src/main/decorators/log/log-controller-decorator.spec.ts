import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { serverError, serverSuccess } from '@/presentation/helpers/http'
import { LogControllerDecorator } from '@/main/decorators/log'
import { LogErrorRepository } from '@/data/protocols/db/log'
import { mockAccountModel } from '@/domain/mocks'
import { mockLogErrorRepositoryStub } from '@/data/protocols/mocks'

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      return Promise.resolve(serverSuccess(mockAccountModel()))
    }
  }
  return new ControllerStub()
}

const mockRequest = (): HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

const makeFakeServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

type SutTypes = {
  sut: LogControllerDecorator
  controllerStub: Controller
  logErrorRepositoryStub: LogErrorRepository
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const logErrorRepositoryStub = mockLogErrorRepositoryStub()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)
  return {
    sut,
    controllerStub,
    logErrorRepositoryStub
  }
}
describe('LogControllerDecorator', () => {
  test('Should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')

    const httpRequest = mockRequest()
    await sut.handle(httpRequest)

    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('Should return the same result of the controller', async () => {
    const { sut } = makeSut()

    const httpRequest = mockRequest()
    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(serverSuccess(mockAccountModel()))
  })

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()

    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError')
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(
      Promise.resolve(makeFakeServerError())
    )

    const httpRequest = mockRequest()
    await sut.handle(httpRequest)

    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
