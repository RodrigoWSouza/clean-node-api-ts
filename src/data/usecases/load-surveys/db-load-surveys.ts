import { LoadSurveysRepository } from '@/data/protocols'
import { SurveyModel } from '@/domain/models'
import { LoadSurveys } from '@/domain/usecases'

export class DbLoadSurveys implements LoadSurveys {
  constructor (
    private readonly loadSurveysRepository: LoadSurveysRepository
  ) {
    this.loadSurveysRepository = loadSurveysRepository
  }

  async load (): Promise<SurveyModel[]> {
    return this.loadSurveysRepository.loadAll()
  }
}
