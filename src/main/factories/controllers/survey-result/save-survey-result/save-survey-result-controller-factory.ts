import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbLoadSurveyById } from '@/main/factories/usecases/survey'
import { SaveSurveyResultController } from '@/presentation/controllers/survey-result/save-survey-result'
import { makeDbSaveSurveyResult } from '@/main/factories/usecases'

export const makeSaveSurveyResultController = (): Controller => {
  const controller = new SaveSurveyResultController(makeDbLoadSurveyById(), makeDbSaveSurveyResult())

  return makeLogControllerDecorator(controller)
}
