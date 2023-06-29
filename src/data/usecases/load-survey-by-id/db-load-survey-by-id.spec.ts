import { DbLoadSurveyById } from '@/data/usecases/load-survey-by-id'
import { LoadSurveyByIdRepository } from '@/data/protocols'
import { SurveyModel } from '@/domain/models'
import { throwError } from '@/domain/mocks'

jest.useFakeTimers('modern').setSystemTime(new Date())

const makeLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById (): Promise<SurveyModel> {
      return Promise.resolve(makeFakeSurvey())
    }
  }
  return new LoadSurveyByIdRepositoryStub()
}

type SutTypes = {
  sut: DbLoadSurveyById
  loadSurveysRepositoryStub: LoadSurveyByIdRepository
}

const makeSut = (): SutTypes => {
  const loadSurveysRepositoryStub = makeLoadSurveyByIdRepository()
  const sut = new DbLoadSurveyById(loadSurveysRepositoryStub)
  return {
    sut,
    loadSurveysRepositoryStub
  }
}

const makeFakeSurvey = (): SurveyModel => ({
  id: 'any_id',
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }],
  date: new Date()
})

describe('DbLoadSurveyById Usecase', () => {
  test('Should call LoadSurveyByIdRepository with correct params', async () => {
    const { sut , loadSurveysRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadById')

    await sut.loadById('any_id')

    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return a Survey on success', async () => {
    const { sut } = makeSut()

    const survey = await sut.loadById('any_id')

    expect(survey).toEqual(makeFakeSurvey())
  })

  test('Should throw if LoadSurveyByIdRepository throws', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    jest.spyOn(loadSurveysRepositoryStub, 'loadById').mockImplementationOnce(throwError)
    const promise = sut.loadById('any_id')

    await expect(promise).rejects.toThrow()
  })
})
