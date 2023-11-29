import { Injectable, Logger } from '@nestjs/common';
import { SurveysService } from './surveys.service';
import DataLoader from 'dataloader';
import { Survey } from './entities/survey.entity';
import { plainLogMessage } from 'src/utils/log-message';

@Injectable()
export class SurveyLoader {
  constructor(private surveysService: SurveysService) {}
  private readonly logger = new Logger(SurveyLoader.name);

  findOneById = new DataLoader<number, Survey>(async (ids: number[]) => {
    const surveys = await this.surveysService.findByIds(ids);
    const sortedSurveys = ids.map(
      (id) => surveys.find((survey) => survey.id === id)!,
    );
    this.logger.log(plainLogMessage('findOneById'), ids, sortedSurveys);
    return sortedSurveys;
  });
}
