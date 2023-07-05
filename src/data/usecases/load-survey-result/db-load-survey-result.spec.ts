import { DbLoadSurveyResult } from '@/data/usecases/load-survey-result'
import { LoadSurveyResultRepository } from '@/data/protocols'
import { mockLoadSurveyResultRepository } from '@/data/protocols/mocks'
import {
  mockSurveyResultModel,
  throwError
} from '@/domain/mocks'

jest.useFakeTimers('modern').setSystemTime(new Date())

type SutTypes = {
  sut: DbLoadSurveyResult
  loadSurveyResultRepositoryStub: LoadSurveyResultRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository()
  const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub)
  return {
    sut,
    loadSurveyResultRepositoryStub
  }
}

describe('DbLoadSurveyResult Usecase', () => {
  test('Should call LoadSurveyResultRepository with correct values', async () => {
    const { sut , loadSurveyResultRepositoryStub } = makeSut()
    const loadBySurveySpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
    await sut.load('any_survey_id')

    expect(loadBySurveySpy).toHaveBeenCalledWith('any_survey_id')
  })

  test('Should return a SurveyResult on success', async () => {
    const { sut } = makeSut()

    const surveyResult = await sut.load('any_survey_id')

    expect(surveyResult).toEqual(mockSurveyResultModel())
  })

  test('Should throw if LoadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockImplementationOnce(throwError)
    const promise = sut.load('any_survey_id')

    await expect(promise).rejects.toThrow()
  })
})
