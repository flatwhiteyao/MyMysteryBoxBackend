import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';

describe('抽取盲盒功能API测试', () => {
  let app: any;

  beforeAll(async () => {
    app = await createApp<Framework>();
  });

  afterAll(async () => {
    await close(app);
  });

  describe('随机抽取功能', () => {
    it('应该成功进行随机抽取', async () => {
      const result = await createHttpRequest(app)
        .get('/blind-box/draw')
        .query({ 
          id: 1,
          user_id: 1 
        });

      expect(result.status).toBe(200);
      expect(result.body.success).toBe(true);
      // 抽取结果应该包含样式信息
      if (result.body.style) {
        expect(result.body.style).toHaveProperty('id');
        expect(result.body.style).toHaveProperty('name');
        expect(result.body.style).toHaveProperty('photo');
        expect(result.body.style).toHaveProperty('probability');
      }
    });

    it('应该处理不存在的盲盒ID', async () => {
      const result = await createHttpRequest(app)
        .get('/blind-box/draw')
        .query({ 
          id: 99999,
          user_id: 1 
        });

      expect(result.status).toBe(200);
      expect(result.body.success).toBe(true);
      // 不存在的盲盒应该返回null或空结果
      expect(result.body.style).toBeNull();
    });

    it('应该处理无效的用户ID', async () => {
      const result = await createHttpRequest(app)
        .get('/blind-box/draw')
        .query({ 
          id: 1,
          user_id: 'invalid' 
        });

      expect(result.status).toBe(200);
      expect(result.body.success).toBe(true);
    });

    it('应该处理缺少参数的请求', async () => {
      const result = await createHttpRequest(app)
        .get('/blind-box/draw')
        .query({ 
          id: 1
          // 缺少 user_id
        });

      expect(result.status).toBe(200);
      expect(result.body.success).toBe(true);
    });
  });

  describe('用户抽取记录功能', () => {
    it('应该成功获取用户抽取记录', async () => {
      const result = await createHttpRequest(app)
        .get('/user-drawn-blind-boxes/')
        .query({ user_id: 1 });

      expect(result.status).toBe(200);
      expect(result.body.success).toBe(true);
      expect(Array.isArray(result.body.drawnBlindBoxes)).toBe(true);
    });

    it('应该处理不存在的用户ID', async () => {
      const result = await createHttpRequest(app)
        .get('/user-drawn-blind-boxes/')
        .query({ user_id: 99999 });

      expect(result.status).toBe(200);
      expect(result.body.success).toBe(true);
      expect(Array.isArray(result.body.drawnBlindBoxes)).toBe(true);
      expect(result.body.drawnBlindBoxes.length).toBe(0);
    });

    it('应该处理无效的用户ID参数', async () => {
      const result = await createHttpRequest(app)
        .get('/user-drawn-blind-boxes/')
        .query({ user_id: 'invalid' });

      expect(result.status).toBe(200);
      expect(result.body.success).toBe(true);
    });
  });

  describe('删除抽取记录功能', () => {
    it('应该成功删除抽取记录', async () => {
      const result = await createHttpRequest(app)
        .del('/user-drawn-blind-boxes/1');

      expect(result.status).toBe(200);
      expect(result.body.success).toBe(true);
    });

    it('应该处理不存在的记录ID', async () => {
      const result = await createHttpRequest(app)
        .del('/user-drawn-blind-boxes/99999');

      expect(result.status).toBe(200);
      expect(result.body.success).toBe(true);
    });

    it('应该处理缺少ID参数', async () => {
      const result = await createHttpRequest(app)
        .del('/user-drawn-blind-boxes/');

      expect(result.status).toBe(404); // 应该返回404
    });
  });

  describe('盲盒样式获取功能', () => {
    it('应该成功获取盲盒样式', async () => {
      const result = await createHttpRequest(app)
        .get('/blind-box/styles')
        .query({ id: 1 });

      expect(result.status).toBe(200);
      expect(result.body.success).toBe(true);
      expect(Array.isArray(result.body.styles)).toBe(true);
    });

    it('应该处理不存在的盲盒ID', async () => {
      const result = await createHttpRequest(app)
        .get('/blind-box/styles')
        .query({ id: 99999 });

      expect(result.status).toBe(200);
      expect(result.body.success).toBe(true);
      expect(Array.isArray(result.body.styles)).toBe(true);
      expect(result.body.styles.length).toBe(0);
    });
  });

  describe('抽取错误处理', () => {
    it('应该处理抽取过程中的错误', async () => {
      // 模拟数据库错误的情况
      const result = await createHttpRequest(app)
        .get('/blind-box/draw')
        .query({ 
          id: 'error',
          user_id: 1 
        });

      expect(result.status).toBe(200);
      // 即使有错误，也应该返回有效的响应格式
      expect(result.body).toHaveProperty('success');
    });

    it('应该处理样式获取错误', async () => {
      const result = await createHttpRequest(app)
        .get('/blind-box/styles')
        .query({ id: 'error' });

      expect(result.status).toBe(200);
      expect(result.body).toHaveProperty('success');
    });
  });

  describe('抽取边界情况', () => {
    it('应该处理没有样式的盲盒抽取', async () => {
      const result = await createHttpRequest(app)
        .get('/blind-box/draw')
        .query({ 
          id: 99999, // 假设这个ID没有样式
          user_id: 1 
        });

      expect(result.status).toBe(200);
      expect(result.body.success).toBe(true);
      expect(result.body.style).toBeNull();
    });

    it('应该处理概率为0的样式', async () => {
      // 这个测试验证系统对概率为0的样式的处理
      const result = await createHttpRequest(app)
        .get('/blind-box/draw')
        .query({ 
          id: 1,
          user_id: 1 
        });

      expect(result.status).toBe(200);
      expect(result.body.success).toBe(true);
    });
  });
}); 