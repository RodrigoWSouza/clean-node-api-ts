import { LoadSurveysController } from '@/presentation/controllers/survey'
import { LoadSurveys } from '@/domain/usecases'
import { SurveyModel } from '@/domain/models'
import { noContent, serverError, serverSuccess } from '@/presentation/helpers/http'

jest.useFakeTimers('modern').setSystemTime(new Date())

const makeLoadSurvey = (): LoadSurveys => {
  class AddSurveyStub implements LoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return Promise.resolve(makeFakeSurveys())
    }
  }
  return new AddSurveyStub()
}

interface SutTypes {
  sut: LoadSurveysController
  loadSurveysStub: LoadSurveys
}

const makeSut = (): SutTypes => {
  const loadSurveysStub = makeLoadSurvey()
  const sut = new LoadSurveysController(loadSurveysStub)
  return {
    sut,
    loadSurveysStub
  }
}

const makeFakeSurveys = (): SurveyModel[] => [
  {
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }],
    date: new Date()
  },
  {
    id: 'other_id',
    question: 'other_question',
    answers: [{
      image: 'other_image',
      answer: 'other_answer'
    }],
    date: new Date()
  }
]

describe('LoadSurveys Controller', () => {
  test('Should call LoadSurveys', async () => {
    const { sut, loadSurveysStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysStub, 'load')

    await sut.handle({})

    expect(loadSpy).toHaveBeenCalled()
  })

  test('Should return 500 if LoadSurveys throws', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockReturnValueOnce(Promise.reject(new Error()))

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

    expect(HttpResponse).toEqual(serverSuccess(makeFakeSurveys()))
  })
})
