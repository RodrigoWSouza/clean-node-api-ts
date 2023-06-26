import { SaveSurveyResultRepository } from '@/data/protocols'
import { SurveyResultModel } from '@/domain/models'
import { SaveSurveyResult, SaveSurveyResultModel } from '@/domain/usecases'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor (
    private readonly loadSurveysRepository: SaveSurveyResultRepository
  ) {
    this.loadSurveysRepository = loadSurveysRepository
  }

  async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    return this.loadSurveysRepository.save(data)
  }
}
