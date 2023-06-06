import { HttpRequest } from '@/presentation/protocols'
import { AddSurveyController } from './add-survey-controller'
import { Validation } from '@/presentation/protocols/validation'
import { badRequest, noContent, serverError } from '@/presentation/helpers/http'
import { AddSurvey, AddSurveyModel } from '@/domain/usecases'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeAddSurvey = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add (data: AddSurveyModel): Promise<void> {
      return Promise.resolve()
    }
  }
  return new AddSurveyStub()
}

interface SutTypes {
  sut: AddSurveyController
  validationStub: Validation
  addSurveyStub: AddSurvey
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const addSurveyStub = makeAddSurvey()
  const sut = new AddSurveyController(validationStub, addSurveyStub)
  return {
    sut,
    validationStub,
    addSurveyStub
  }
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }]
  }
})

describe('AddSurvey Controller', () => {
  test('Should call Validation with correct params', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeRequest()

    await sut.handle(httpRequest)

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())

    const HttpResponse = await sut.handle(makeFakeRequest())

    expect(HttpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call AddSurvey with correct params', async () => {
    const { sut, addSurveyStub } = makeSut()
    const addSpy = jest.spyOn(addSurveyStub, 'add')
    const httpRequest = makeFakeRequest()

    await sut.handle(httpRequest)

    expect(addSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 500 if AddSurvey throws', async () => {
    const { sut, addSurveyStub } = makeSut()
    jest.spyOn(addSurveyStub, 'add').mockReturnValueOnce(Promise.reject(new Error()))

    const HttpResponse = await sut.handle(makeFakeRequest())

    expect(HttpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 os success', async () => {
    const { sut } = makeSut()

    const HttpResponse = await sut.handle(makeFakeRequest())

    expect(HttpResponse).toEqual(noContent())
  })
})
