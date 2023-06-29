import { DbAddSurvey } from '@/data/usecases/add-survey'
import { AddSurveyRepository } from '@/data/protocols'
import { mockAddSurveyRepository } from '@/data/protocols/mocks'
import { mockAddSurveyParams } from '@/domain/mocks/mock-survey'

jest.useFakeTimers('modern').setSystemTime(new Date())

type SutTypes = {
  sut: DbAddSurvey
  addSurveyRepositoryStub: AddSurveyRepository
}

const makeSut = (): SutTypes => {
  const addSurveyRepositoryStub = mockAddSurveyRepository()
  const sut = new DbAddSurvey(addSurveyRepositoryStub)
  return {
    sut,
    addSurveyRepositoryStub
  }
}

describe('DbAddSurvey Usecase', () => {
  test('Should call AddSurveyRepository with correct values', async () => {
    const { sut , addSurveyRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add')
    const surveyData = mockAddSurveyParams()

    await sut.add(surveyData)

    expect(addSpy).toBeCalledWith(surveyData)
  })

  test('Should throw if AddSurveyRepository throws', async () => {
    const { sut , addSurveyRepositoryStub } = makeSut()
    jest.spyOn(addSurveyRepositoryStub, 'add').mockReturnValueOnce(
      Promise.reject(new Error())
    )

    const promise = sut.add(mockAddSurveyParams())
    await expect(promise).rejects.toThrow()
  })
})
