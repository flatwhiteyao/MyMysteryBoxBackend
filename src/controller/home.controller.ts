import { Controller, Get, Inject } from '@midwayjs/core';
import { PlayerShowService } from '../service/playerShow.service';
import { BlindBoxService } from '../service/blindBox.service';
import { join } from 'path';
import * as fs from 'fs';

@Controller('/')
export class HomeController {
  @Inject()
  playerShowService: PlayerShowService;

  @Inject()
  blindBoxService: BlindBoxService;

  @Get('/')
  async home(): Promise<string> {
    try {
      // 返回前端页面
      const indexPath = join(__dirname, '../build/public/index.html');
      return fs.readFileSync(indexPath, 'utf8');
    } catch (error) {
      return 'Hello! (Fallback)';
    }
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
