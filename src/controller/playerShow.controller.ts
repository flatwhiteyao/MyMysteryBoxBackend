import { Controller, Post, Get, Del, Body, Param, Inject, Query } from '@midwayjs/core';
import { PlayerShowService } from '../service/playerShow.service';
import { UserService } from '../service/user.service';

@Controller('/player-shows')
export class PlayerShowController {
  @Inject()
  playerShowService: PlayerShowService;

  @Inject()
  userService: UserService;

  // 创建玩家秀
  @Post('/')
  async createPlayerShow(
    @Body('user_id') user_id: number,
    @Body('blind_box_id') blind_box_id: number,
    @Body('content') content: string,
    @Body('images') images: string[],
    @Body('rating') rating: number
  ) {
    try {
      await this.playerShowService.createPlayerShow(user_id, blind_box_id, content, images, rating);
      return { success: true };
    } catch (e) {
      return { success: false, message: e.message };
    }
  }

  // 获取玩家秀列表
  @Get('/')
  async getPlayerShowList() {
    const list = await this.playerShowService.getPlayerShowList();
    return { success: true, list };
  }

  // 获取玩家秀详情
  @Get('/:id')
  async getPlayerShowDetail(@Param('id') id: number) {
    const detail = await this.playerShowService.getPlayerShowDetail(id);
    if (!detail) return { success: false, message: '未找到玩家秀' };
    return { success: true, detail };
  }

  // 删除玩家秀
  @Del('/:id')
  async deletePlayerShow(
    @Param('id') id: number,
    @Query('user_id') user_id: number,
    @Query('is_admin') is_admin: boolean
  ) {
    try {
      await this.playerShowService.deletePlayerShow(id, user_id, is_admin);
      return { success: true };
    } catch (e) {
      return { success: false, message: '删除失败' };
    }
  }
} 