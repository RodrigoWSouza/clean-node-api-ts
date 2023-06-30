import { LoadSurveysController } from '@/presentation/controllers/survey'
import { LoadSurveys } from '@/domain/usecases'
import { noContent, serverError, serverSuccess } from '@/presentation/helpers/http'
import { mockSurveyModels, throwError } from '@/domain/mocks'
import { mockLoadSurvey } from '@/presentation/mocks'

jest.useFakeTimers('modern').setSystemTime(new Date())

type SutTypes = {
  sut: LoadSurveysController
  loadSurveysStub: LoadSurveys
}

const makeSut = (): SutTypes => {
  const loadSurveysStub = mockLoadSurvey()
  const sut = new LoadSurveysController(loadSurveysStub)
  return {
    sut,
    loadSurveysStub
  }
}

describe('LoadSurveys Controller', () => {
  test('Should call LoadSurveys', async () => {
    const { sut, loadSurveysStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysStub, 'load')

    await sut.handle({})

    expect(loadSpy).toHaveBeenCalled()
  })

  test('Should return 500 if LoadSurveys throws', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockImplementationOnce(throwError)

    const HttpResponse = await sut.handle({})

    expect(HttpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 if LoadSurveys returns empty', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockReturnValueOnce(Promise.resolve([]))

    const HttpResponse = await sut.handle({})

    expect(HttpResponse).toEqual(noContent())
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()

    const HttpResponse = await sut.handle({})

    expect(HttpResponse).toEqual(serverSuccess(mockSurveyModels()))
  })
})
