import { DbSaveSurveyResult } from '@/data/usecases/save-survey-result'
import { SaveSurveyResultRepository } from '@/data/protocols'
import { mockSaveSurveyResultRepository } from '@/data/protocols/mocks'
import {
  mockSurveyResultModel,
  mockSaveSurveyResultParams,
  throwError
} from '@/domain/mocks'

jest.useFakeTimers('modern').setSystemTime(new Date())

type SutTypes = {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository
}

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = mockSaveSurveyResultRepository()
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub)
  return {
    sut,
    saveSurveyResultRepositoryStub
  }
}

describe('DbSaveSurveyResult Usecase', () => {
  test('Should call SaveSurveyResultRepository with correct values', async () => {
    const { sut , saveSurveyResultRepositoryStub } = makeSut()
    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save')
    const surveyResultData = mockSaveSurveyResultParams()
    await sut.save(surveyResultData)

    expect(saveSpy).toHaveBeenCalledWith(surveyResultData)
  })

  test('Should return a SurveyResult on success', async () => {
    const { sut } = makeSut()

    const surveyResult = await sut.save(mockSaveSurveyResultParams())

    expect(surveyResult).toEqual(mockSurveyResultModel())
  })

  test('Should throw if SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockImplementationOnce(throwError)
    const promise = sut.save(mockSaveSurveyResultParams())

    await expect(promise).rejects.toThrow()
  })
})
