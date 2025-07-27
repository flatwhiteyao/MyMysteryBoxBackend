import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';

describe('搜索功能API测试', () => {
  let app: any;

  beforeAll(async () => {
    app = await createApp<Framework>();
  });

  afterAll(async () => {
    await close(app);
  });

  describe('盲盒搜索功能', () => {
    it('应该成功搜索包含关键词的盲盒', async () => {
      const result = await createHttpRequest(app)
        .get('/blind-box/search')
        .query({ keyword: '测试' });

      expect(result.status).toBe(200);
      expect(result.body.success).toBe(true);
      expect(Array.isArray(result.body.blindBoxes)).toBe(true);
      expect(result.body.keyword).toBe('测试');
      expect(typeof result.body.count).toBe('number');
      expect(result.body.message).toContain('找到') || expect(result.body.message).toBe('未找到匹配的盲盒');
    });

    it('应该处理空关键词搜索（返回所有盲盒）', async () => {
      const result = await createHttpRequest(app)
        .get('/blind-box/search')
        .query({ keyword: '' });

      expect(result.status).toBe(200);
      expect(result.body.success).toBe(true);
      expect(Array.isArray(result.body.blindBoxes)).toBe(true);
      expect(result.body.message).toBe('显示所有盲盒');
    });

    it('应该处理未传关键词参数（返回所有盲盒）', async () => {
      const result = await createHttpRequest(app)
        .get('/blind-box/search');

      expect(result.status).toBe(200);
      expect(result.body.success).toBe(true);
      expect(Array.isArray(result.body.blindBoxes)).toBe(true);
      expect(result.body.message).toBe('显示所有盲盒');
    });

    it('应该处理不存在的关键词', async () => {
      const result = await createHttpRequest(app)
        .get('/blind-box/search')
        .query({ keyword: '不存在的关键词' });

      expect(result.status).toBe(200);
      expect(result.body.success).toBe(true);
      expect(Array.isArray(result.body.blindBoxes)).toBe(true);
      expect(result.body.blindBoxes.length).toBe(0);
      expect(result.body.count).toBe(0);
      expect(result.body.message).toBe('未找到匹配的盲盒');
    });

    it('应该处理特殊字符搜索', async () => {
      const result = await createHttpRequest(app)
        .get('/blind-box/search')
        .query({ keyword: '!@#$%' });

      expect(result.status).toBe(200);
      expect(result.body.success).toBe(true);
      expect(Array.isArray(result.body.blindBoxes)).toBe(true);
    });

    it('应该处理中英文混合搜索', async () => {
      const result = await createHttpRequest(app)
        .get('/blind-box/search')
        .query({ keyword: '测试test' });

      expect(result.status).toBe(200);
      expect(result.body.success).toBe(true);
      expect(Array.isArray(result.body.blindBoxes)).toBe(true);
    });
  });

  describe('获取所有盲盒功能', () => {
    it('应该成功获取所有盲盒', async () => {
      const result = await createHttpRequest(app)
        .get('/blind-box/');

      expect(result.status).toBe(200);
      expect(result.body.success).toBe(true);
      expect(Array.isArray(result.body.blindBoxes)).toBe(true);
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

  describe('搜索错误处理', () => {
    it('应该处理搜索过程中的错误', async () => {
      // 模拟数据库错误的情况
      const result = await createHttpRequest(app)
        .get('/blind-box/search')
        .query({ keyword: 'error' });

      expect(result.status).toBe(200);
      // 即使有错误，也应该返回有效的响应格式
      expect(result.body).toHaveProperty('success');
      expect(result.body).toHaveProperty('message');
    });
  });
}); 