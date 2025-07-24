import { Controller, Get, Inject } from '@midwayjs/core';
import { PlayerShowService } from '../service/playerShow.service';
import { BlindBoxService } from '../service/blindBox.service';

@Controller('/')
export class HomeController {
  @Inject()
  playerShowService: PlayerShowService;

  @Inject()
  blindBoxService: BlindBoxService;

  @Get('/')
  async home(): Promise<string> {
    return 'Hello Midwayjs!';
  }

  @Get('/ranking')
  async getRanking() {
    const ranking = await this.playerShowService.getBlindBoxRanking(10);
    return { success: true, ranking };
  }

  @Get('/ad')
  async getAd() {
    const latest = await this.blindBoxService.getLatestBlindBox();
    if (!latest) {
      return { success: false, message: '暂无广告' };
    }
    return { success: true, ad: latest };
  }
}
