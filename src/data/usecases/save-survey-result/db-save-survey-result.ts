import { SaveSurveyResultRepository } from '@/data/protocols'
import { SurveyResultModel } from '@/domain/models'
import { SaveSurveyResult, SaveSurveyResultParams } from '@/domain/usecases'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor (
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository
  ) {
    this.saveSurveyResultRepository = saveSurveyResultRepository
  }

  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    return this.saveSurveyResultRepository.save(data)
  }
}
