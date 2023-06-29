import { DbLoadSurveyById } from '@/data/usecases/load-survey-by-id'
import { LoadSurveyByIdRepository } from '@/data/protocols'
import { throwError } from '@/domain/mocks'
import { mockSurveyModel } from '@/domain/mocks/mock-survey'
import { mockLoadSurveyByIdRepository } from '@/data/protocols/mocks'

jest.useFakeTimers('modern').setSystemTime(new Date())

type SutTypes = {
  sut: DbLoadSurveyById
  loadSurveysRepositoryStub: LoadSurveyByIdRepository
}

const makeSut = (): SutTypes => {
  const loadSurveysRepositoryStub = mockLoadSurveyByIdRepository()
  const sut = new DbLoadSurveyById(loadSurveysRepositoryStub)
  return {
    sut,
    loadSurveysRepositoryStub
  }
}

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

    expect(survey).toEqual(mockSurveyModel())
  })

  test('Should throw if LoadSurveyByIdRepository throws', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    jest.spyOn(loadSurveysRepositoryStub, 'loadById').mockImplementationOnce(throwError)
    const promise = sut.loadById('any_id')

    await expect(promise).rejects.toThrow()
  })
})
