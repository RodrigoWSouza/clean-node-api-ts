import { HttpRequest } from '@/presentation/protocols'
import { LoadSurveyById } from '@/domain/usecases'
import { SaveSurveyResultController } from './save-survey-result-controller'
import { SurveyModel } from '@/domain/models'

jest.useFakeTimers('modern').setSystemTime(new Date())

const makeLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById (id: string): Promise<SurveyModel> {
      return Promise.resolve(makeFakeSurvey())
    }
  }
  return new LoadSurveyByIdStub()
}

type SutTypes = {
  sut: SaveSurveyResultController
  loadSurveyByIdStub: LoadSurveyById
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = makeLoadSurveyById()
  const sut = new SaveSurveyResultController(loadSurveyByIdStub)
  return {
    sut,
    loadSurveyByIdStub
  }
}

const makeFakeRequest = (): HttpRequest => ({
  params: {
    surveyId: 'any_survey_id'
  }
})

const makeFakeSurvey = (): SurveyModel => ({
  id: 'any_id',
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }],
  date: new Date()
})

describe('SaveSurveyResult Controller', () => {
  test('Should call LoadSurveyById with correct params', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    const loadSurveyByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
    const httpRequest = makeFakeRequest()
    await sut.handle(httpRequest)

    expect(loadSurveyByIdSpy).toHaveBeenCalledWith(httpRequest.params.surveyId)
  })
})
