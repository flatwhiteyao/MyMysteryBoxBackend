import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';

describe('用户登录注册功能测试', () => {
  let app: any;

  beforeAll(async () => {
    app = await createApp<Framework>();
  });

  afterAll(async () => {
    await close(app);
  });

  describe('用户注册功能', () => {
    it('应该成功注册新用户', async () => {
      const registerData = {
        nickname: '测试用户',
        name: '测试姓名',
        phone: '13800138000',
        email: 'test@example.com',
        password: '123456',
        confirmPassword: '123456',
        role: 'user'
      };

      const result = await createHttpRequest(app)
        .post('/user/register')
        .send(registerData);

      expect(result.status).toBe(200);
      expect(result.body.success).toBe(true);
      expect(result.body.message).toBe('注册成功');
    });

    it('应该拒绝密码不匹配的注册', async () => {
      const registerData = {
        nickname: '测试用户',
        name: '测试姓名',
        phone: '13800138001',
        email: 'test@example.com',
        password: '123456',
        confirmPassword: '654321',
        role: 'user'
      };

      const result = await createHttpRequest(app)
        .post('/user/register')
        .send(registerData);

      expect(result.status).toBe(200);
      expect(result.body.success).toBe(false);
      expect(result.body.message).toBe('两次输入的密码不一致');
    });

    it('应该拒绝重复手机号注册', async () => {
      const registerData = {
        nickname: '测试用户2',
        name: '测试姓名2',
        phone: '13800138000', // 使用已存在的手机号
        email: 'test2@example.com',
        password: '123456',
        confirmPassword: '123456',
        role: 'user'
      };

      const result = await createHttpRequest(app)
        .post('/user/register')
        .send(registerData);

      expect(result.status).toBe(200);
      expect(result.body.success).toBe(false);
      expect(result.body.message).toBe('注册失败，手机号可能已被注册');
    });
  });

  describe('用户登录功能', () => {
    it('应该成功登录已注册用户', async () => {
      const loginData = {
        phone: '13800138000',
        password: '123456'
      };

      const result = await createHttpRequest(app)
        .post('/user/login')
        .send(loginData);

      expect(result.status).toBe(200);
      expect(result.body.success).toBe(true);
      expect(result.body.message).toBe('登录成功');
      expect(result.body.user).toBeDefined();
      expect(result.body.user.phone).toBe('13800138000');
    });

    it('应该拒绝错误的手机号登录', async () => {
      const loginData = {
        phone: '13800138099',
        password: '123456'
      };

      const result = await createHttpRequest(app)
        .post('/user/login')
        .send(loginData);

      expect(result.status).toBe(200);
      expect(result.body.success).toBe(false);
      expect(result.body.message).toBe('手机号或密码错误');
    });

    it('应该拒绝错误的密码登录', async () => {
      const loginData = {
        phone: '13800138000',
        password: 'wrongpassword'
      };

      const result = await createHttpRequest(app)
        .post('/user/login')
        .send(loginData);

      expect(result.status).toBe(200);
      expect(result.body.success).toBe(false);
      expect(result.body.message).toBe('手机号或密码错误');
    });
  });

  describe('用户信息获取功能', () => {
    it('应该成功获取用户信息', async () => {
      const result = await createHttpRequest(app)
        .get('/api/user')
        .query({ uid: 1 });

      expect(result.status).toBe(200);
      expect(result.body.success).toBe(true);
      expect(result.body.user).toBeDefined();
    });

    it('应该处理不存在的用户ID', async () => {
      const result = await createHttpRequest(app)
        .get('/api/user')
        .query({ uid: 99999 });

      expect(result.status).toBe(200);
      expect(result.body.success).toBe(false);
      expect(result.body.message).toBe('用户不存在');
    });
  });
}); 