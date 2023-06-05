import { AddSurveyRepository } from '@/data/protocols'
import { AddSurvey, AddSurveyModel } from '@/domain/usecases/add-survey'

export class DbAddSurvey implements AddSurvey {
  constructor (
    private readonly addSurveyRepository: AddSurveyRepository
  ) {
    this.addSurveyRepository = addSurveyRepository
  }

  async add (data: AddSurveyModel): Promise<void> {
    await this.addSurveyRepository.add(data)
  }
}
