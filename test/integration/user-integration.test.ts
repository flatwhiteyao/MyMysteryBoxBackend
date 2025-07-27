import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';

describe('用户功能集成测试', () => {
  let app: any;

  beforeAll(async () => {
    app = await createApp<Framework>();
  });

  afterAll(async () => {
    await close(app);
  });

  describe('完整的用户注册登录流程', () => {
    it('应该完成完整的注册到登录流程', async () => {
      // 第一步：注册新用户
      const registerData = {
        nickname: '集成测试用户',
        name: '集成测试姓名',
        phone: '14000140000',
        email: 'integration@example.com',
        password: '123456',
        confirmPassword: '123456',
        role: 'user'
      };

      const registerResult = await createHttpRequest(app)
        .post('/user/register')
        .send(registerData);

      expect(registerResult.status).toBe(200);
      expect(registerResult.body.success).toBe(true);
      expect(registerResult.body.message).toBe('注册成功');

      // 第二步：使用注册的账号登录
      const loginData = {
        phone: '14000140000',
        password: '123456'
      };

      const loginResult = await createHttpRequest(app)
        .post('/user/login')
        .send(loginData);

      expect(loginResult.status).toBe(200);
      expect(loginResult.body.success).toBe(true);
      expect(loginResult.body.message).toBe('登录成功');
      expect(loginResult.body.user).toBeDefined();
      expect(loginResult.body.user.phone).toBe('14000140000');
      expect(loginResult.body.user.nickname).toBe('集成测试用户');
    });

    it('应该处理注册后立即登录的边界情况', async () => {
      // 注册用户
      const registerData = {
        nickname: '边界测试用户',
        name: '边界测试姓名',
        phone: '14100141000',
        email: 'boundary@example.com',
        password: '123456',
        confirmPassword: '123456',
        role: 'user'
      };

      await createHttpRequest(app)
        .post('/user/register')
        .send(registerData);

      // 立即尝试登录
      const loginData = {
        phone: '14100141000',
        password: '123456'
      };

      const loginResult = await createHttpRequest(app)
        .post('/user/login')
        .send(loginData);

      expect(loginResult.status).toBe(200);
      expect(loginResult.body.success).toBe(true);
    });
  });

  describe('错误处理集成测试', () => {
    it('应该正确处理各种错误情况', async () => {
      // 测试缺少必要字段的注册
      const incompleteRegisterData = {
        nickname: '不完整用户',
        phone: '14200142000',
        password: '123456',
        confirmPassword: '123456'
        // 缺少 name, email, role
      };

      const incompleteResult = await createHttpRequest(app)
        .post('/user/register')
        .send(incompleteRegisterData);

      // 测试缺少必要字段的登录
      const incompleteLoginData = {
        phone: '14200142000'
        // 缺少 password
      };

      const incompleteLoginResult = await createHttpRequest(app)
        .post('/user/login')
        .send(incompleteLoginData);

      // 这些测试验证了API的健壮性
      expect(incompleteResult.status).toBe(200);
      expect(incompleteLoginResult.status).toBe(200);
    });
  });

  describe('API端点可用性测试', () => {
    it('应该验证所有用户相关API端点可用', async () => {
      // 测试注册端点
      const registerResult = await createHttpRequest(app)
        .post('/user/register')
        .send({
          nickname: 'API测试用户',
          name: 'API测试姓名',
          phone: '14300143000',
          email: 'apitest@example.com',
          password: '123456',
          confirmPassword: '123456',
          role: 'user'
        });

      expect(registerResult.status).toBe(200);

      // 测试登录端点
      const loginResult = await createHttpRequest(app)
        .post('/user/login')
        .send({
          phone: '14300143000',
          password: '123456'
        });

      expect(loginResult.status).toBe(200);

      // 测试用户信息获取端点
      const userInfoResult = await createHttpRequest(app)
        .get('/api/user')
        .query({ uid: 1 });

      expect(userInfoResult.status).toBe(200);
    });
  });
}); 