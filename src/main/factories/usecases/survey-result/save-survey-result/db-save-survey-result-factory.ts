import { DbSaveSurveyResult } from '@/data/usecases/save-survey-result'
import { SaveSurveyResult } from '@/domain/usecases'
import { SurveyResultMongoRepository } from '@/infra/db/mongodb'

export const makeDbSaveSurveyResult = (): SaveSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository()
  return new DbSaveSurveyResult(surveyResultMongoRepository)
}
