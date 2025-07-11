// src/controller/user.controller.ts
import { Body, Controller, Post, Inject } from "@midwayjs/core";
import { UserService } from "../service/user.service";

@Controller("/user")
export class UserController {
  @Inject()
  userService: UserService;

  @Post("/register")
  public async register(
    @Body("nickname") nickname: string,
    @Body("name") name: string,
    @Body("phone") phone: string,
    @Body("email") email: string,
    @Body("password") password: string,
    @Body("confirmPassword") confirmPassword: string
  ): Promise<{ success: boolean; message: string }> {
    if (password !== confirmPassword) {
      return { success: false, message: '两次输入的密码不一致' };
    }
    try {
      await this.userService.register(nickname, name, phone, email, password);
      return { success: true, message: '注册成功' };
    } catch (error) {
      return { success: false, message: '注册失败，手机号可能已被注册' };
    }
  }

  @Post("/login")
  public async login(
    @Body("phone") phone: string,
    @Body("password") password: string
  ): Promise<{ success: boolean; message: string; user?: any }> {
    const user = await this.userService.login(phone, password);
    if (user) {
      return { success: true, message: '登录成功', user };
    } else {
      return { success: false, message: '手机号或密码错误' };
    }
  }
}