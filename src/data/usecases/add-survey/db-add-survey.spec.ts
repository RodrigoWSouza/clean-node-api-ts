import { AddSurveyModel } from '@/domain/usecases/add-survey'
import { DbAddSurvey } from './db-add-survey'
import { AddSurveyRepository } from '@/data/protocols'

const makeAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add (data: AddSurveyModel): Promise<void> {
      return Promise.resolve()
    }
  }
  return new AddSurveyRepositoryStub()
}

interface SutTypes{
  sut: DbAddSurvey
  addSurveyRepositoryStub: AddSurveyRepository
}

const makeSut = (): SutTypes => {
  const addSurveyRepositoryStub = makeAddSurveyRepository()
  const sut = new DbAddSurvey(addSurveyRepositoryStub)
  return {
    sut,
    addSurveyRepositoryStub
  }
}

const makeFakeSurveyData = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }]
})

describe('DbAddSurvey Usecase', () => {
  test('Should call AddSurveyRepository with correct values', async () => {
    const { sut , addSurveyRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add')
    const surveyData = makeFakeSurveyData()

    await sut.add(surveyData)

    expect(addSpy).toBeCalledWith(surveyData)
  })

  test('Should throw if AddSurveyRepository throws', async () => {
    const { sut , addSurveyRepositoryStub } = makeSut()
    jest.spyOn(addSurveyRepositoryStub, 'add').mockReturnValueOnce(
      Promise.reject(new Error())
    )

    const promise = sut.add(makeFakeSurveyData())
    await expect(promise).rejects.toThrow()
  })
})