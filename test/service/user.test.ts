import { createApp, close } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';
import { UserService } from '../../src/service/user.service';

describe('用户服务单元测试', () => {
  let app: any;
  let userService: UserService;

  beforeAll(async () => {
    app = await createApp<Framework>();
    userService = await app.getApplicationContext().getAsync(UserService);
  });

  afterAll(async () => {
    await close(app);
  });

  describe('用户注册服务', () => {
    it('应该成功注册新用户', async () => {
      const userData = {
        nickname: '单元测试用户',
        name: '单元测试姓名',
        phone: '13900139000',
        email: 'unittest@example.com',
        password: '123456',
        role: 'user'
      };

      const userId = await userService.register(
        userData.nickname,
        userData.name,
        userData.phone,
        userData.email,
        userData.password,
        userData.role
      );

      expect(userId).toBeDefined();
      expect(typeof userId).toBe('number');
      expect(userId).toBeGreaterThan(0);
    });

    it('应该处理重复手机号注册', async () => {
      const userData = {
        nickname: '重复用户',
        name: '重复姓名',
        phone: '13900139000', // 使用已存在的手机号
        email: 'duplicate@example.com',
        password: '123456',
        role: 'user'
      };

      await expect(
        userService.register(
          userData.nickname,
          userData.name,
          userData.phone,
          userData.email,
          userData.password,
          userData.role
        )
      ).rejects.toThrow();
    });
  });

  describe('用户登录服务', () => {
    it('应该成功验证用户登录', async () => {
      const loginData = {
        phone: '13900139000',
        password: '123456'
      };

      const user = await userService.login(loginData.phone, loginData.password);

      expect(user).toBeDefined();
      expect(user.phone).toBe(loginData.phone);
      expect(user.password).toBe(loginData.password);
    });

    it('应该拒绝错误的手机号', async () => {
      const loginData = {
        phone: '13900139999',
        password: '123456'
      };

      const user = await userService.login(loginData.phone, loginData.password);

      expect(user).toBeUndefined();
    });

    it('应该拒绝错误的密码', async () => {
      const loginData = {
        phone: '13900139000',
        password: 'wrongpassword'
      };

      const user = await userService.login(loginData.phone, loginData.password);

      expect(user).toBeUndefined();
    });
  });

  describe('用户信息获取服务', () => {
    it('应该成功获取用户信息', async () => {
      const userId = 1;
      const user = await userService.getUser(userId);

      expect(user).toBeDefined();
      expect(user.id).toBe(userId);
    });

    it('应该处理不存在的用户ID', async () => {
      const userId = 99999;
      const user = await userService.getUser(userId);

      expect(user).toBeUndefined();
    });
  });
}); 