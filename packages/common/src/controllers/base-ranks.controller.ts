import { Controller } from '@nestjs/common';

import { RanksService } from '../services';

@Controller('ranks')
export abstract class BaseRanksController {
  constructor(protected readonly ranksService: RanksService) {}
}
