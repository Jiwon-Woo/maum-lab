import { Injectable } from '@nestjs/common';
import { SurveysService } from './surveys.service';
import DataLoader from 'dataloader';
import { Survey } from './entities/survey.entity';

@Injectable()
export class SurveyLoader {
  constructor(private surveysService: SurveysService) {}

  findOneById = new DataLoader<number, Survey>(async (ids: number[]) => {
    const surveys = await this.surveysService.findByIds(ids);

    return ids.map((id) => surveys.find((survey) => survey.id === id)!);
  });
}
