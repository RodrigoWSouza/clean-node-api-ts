import { HttpRequest } from '@/presentation/protocols'
import { AddSurveyController } from '@/presentation/controllers/survey'
import { Validation } from '@/presentation/protocols/validation'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http'
import { mockAddSurvey, mockValidation } from '@/presentation/mocks'
import { AddSurvey } from '@/domain/usecases'
import { throwError } from '@/domain/mocks'

jest.useFakeTimers('modern').setSystemTime(new Date())

type SutTypes = {
  sut: AddSurveyController
  validationStub: Validation
  addSurveyStub: AddSurvey
}

const makeSut = (): SutTypes => {
  const validationStub = mockValidation()
  const addSurveyStub = mockAddSurvey()
  const sut = new AddSurveyController(validationStub, addSurveyStub)
  return {
    sut,
    validationStub,
    addSurveyStub
  }
}

const mockRequest = (): HttpRequest => ({
  body: {
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }],
    date: new Date()
  }
})

describe('AddSurvey Controller', () => {
  test('Should call Validation with correct params', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = mockRequest()

    await sut.handle(httpRequest)

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())

    const HttpResponse = await sut.handle(mockRequest())

    expect(HttpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call AddSurvey with correct params', async () => {
    const { sut, addSurveyStub } = makeSut()
    const addSpy = jest.spyOn(addSurveyStub, 'add')
    const httpRequest = mockRequest()

    await sut.handle(httpRequest)

    expect(addSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 500 if AddSurvey throws', async () => {
    const { sut, addSurveyStub } = makeSut()
    jest.spyOn(addSurveyStub, 'add').mockImplementationOnce(throwError)

    const HttpResponse = await sut.handle(mockRequest())

    expect(HttpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 os success', async () => {
    const { sut } = makeSut()

    const HttpResponse = await sut.handle(mockRequest())

    expect(HttpResponse).toEqual(noContent())
  })
})
