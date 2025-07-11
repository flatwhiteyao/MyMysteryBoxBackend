// src/controller/api.controller.ts
import { Controller, Get, Query, Inject } from "@midwayjs/core";
import { UserService } from "../service/user.service";

@Controller("/api")
export class ApiController {
  @Inject()
  userService: UserService;

  @Get("/user")
  public async getUser(@Query("uid") uid: number) {
    try {
      // 直接传递 uid 的值，而不是 { uid } 对象
      const user = await this.userService.getUser(uid);
      if (user) {
        return { success: true, user };
      } else {
        return { success: false, message: '用户不存在' };
      }
    } catch (error) {
      return { success: false, message: '获取用户信息失败' };
    }
  }
}