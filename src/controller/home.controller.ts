import { Controller, Get, Inject } from '@midwayjs/core';
import { PlayerShowService } from '../service/playerShow.service';

@Controller('/')
export class HomeController {
  @Inject()
  playerShowService: PlayerShowService;

  @Get('/')
  async home(): Promise<string> {
    return 'Hello Midwayjs!';
  }

  @Get('/ranking')
  async getRanking() {
    const ranking = await this.playerShowService.getBlindBoxRanking(10);
    return { success: true, ranking };
  }
}
