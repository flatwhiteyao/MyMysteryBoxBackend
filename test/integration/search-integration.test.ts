import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';

describe('搜索功能集成测试', () => {
  let app: any;

  beforeAll(async () => {
    app = await createApp<Framework>();
  });

  afterAll(async () => {
    await close(app);
  });

  describe('完整的搜索流程测试', () => {
    it('应该完成完整的搜索到获取样式流程', async () => {
      // 第一步：搜索盲盒
      const searchResult = await createHttpRequest(app)
        .get('/blind-box/search')
        .query({ keyword: '测试' });

      expect(searchResult.status).toBe(200);
      expect(searchResult.body.success).toBe(true);
      expect(Array.isArray(searchResult.body.blindBoxes)).toBe(true);

      // 第二步：如果有搜索结果，获取第一个盲盒的样式
      if (searchResult.body.blindBoxes.length > 0) {
        const firstBlindBox = searchResult.body.blindBoxes[0];
        const stylesResult = await createHttpRequest(app)
          .get('/blind-box/styles')
          .query({ id: firstBlindBox.id });

        expect(stylesResult.status).toBe(200);
        expect(stylesResult.body.success).toBe(true);
        expect(Array.isArray(stylesResult.body.styles)).toBe(true);
      }
    });

    it('应该处理搜索到随机抽取的完整流程', async () => {
      // 第一步：获取所有盲盒
      const allBlindBoxesResult = await createHttpRequest(app)
        .get('/blind-box/');

      expect(allBlindBoxesResult.status).toBe(200);
      expect(allBlindBoxesResult.body.success).toBe(true);
      expect(Array.isArray(allBlindBoxesResult.body.blindBoxes)).toBe(true);

      // 第二步：如果有盲盒，进行随机抽取
      if (allBlindBoxesResult.body.blindBoxes.length > 0) {
        const firstBlindBox = allBlindBoxesResult.body.blindBoxes[0];
        const drawResult = await createHttpRequest(app)
          .get('/blind-box/draw')
          .query({ 
            id: firstBlindBox.id,
            user_id: 1 
          });

        expect(drawResult.status).toBe(200);
        expect(drawResult.body.success).toBe(true);
      }
    });
  });

  describe('搜索功能边界测试', () => {
    it('应该处理大量并发搜索请求', async () => {
      const searchPromises = [];
      const keywords = ['测试', '盲盒', '玩具', '收藏', '限定'];

      // 创建多个并发搜索请求
      for (const keyword of keywords) {
        searchPromises.push(
          createHttpRequest(app)
            .get('/blind-box/search')
            .query({ keyword })
        );
      }

      const results = await Promise.all(searchPromises);

      // 验证所有请求都成功
      for (const result of results) {
        expect(result.status).toBe(200);
        expect(result.body.success).toBe(true);
        expect(Array.isArray(result.body.blindBoxes)).toBe(true);
      }
    });

    it('应该处理连续搜索操作', async () => {
      const keywords = ['测试', '', '不存在的关键词', '!@#$%'];

      for (const keyword of keywords) {
        const result = await createHttpRequest(app)
          .get('/blind-box/search')
          .query({ keyword });

        expect(result.status).toBe(200);
        expect(result.body.success).toBe(true);
        expect(Array.isArray(result.body.blindBoxes)).toBe(true);
      }
    });
  });

  describe('搜索API端点可用性测试', () => {
    it('应该验证所有搜索相关API端点可用', async () => {
      // 测试搜索端点
      const searchResult = await createHttpRequest(app)
        .get('/blind-box/search')
        .query({ keyword: '测试' });

      expect(searchResult.status).toBe(200);

      // 测试获取所有盲盒端点
      const allBlindBoxesResult = await createHttpRequest(app)
        .get('/blind-box/');

      expect(allBlindBoxesResult.status).toBe(200);

      // 测试获取样式端点
      const stylesResult = await createHttpRequest(app)
        .get('/blind-box/styles')
        .query({ id: 1 });

      expect(stylesResult.status).toBe(200);
    });
  });

  describe('搜索错误处理集成测试', () => {
    it('应该正确处理各种错误情况', async () => {
      // 测试无效的盲盒ID
      const invalidStylesResult = await createHttpRequest(app)
        .get('/blind-box/styles')
        .query({ id: 'invalid' });

      expect(invalidStylesResult.status).toBe(200);

      // 测试无效的用户ID
      const invalidDrawResult = await createHttpRequest(app)
        .get('/blind-box/draw')
        .query({ 
          id: 1,
          user_id: 'invalid' 
        });

      expect(invalidDrawResult.status).toBe(200);
    });
  });

  describe('搜索性能集成测试', () => {
    it('应该在合理时间内完成搜索操作', async () => {
      const startTime = Date.now();
      
      const result = await createHttpRequest(app)
        .get('/blind-box/search')
        .query({ keyword: '测试' });

      const endTime = Date.now();
      const responseTime = endTime - startTime;

      expect(result.status).toBe(200);
      expect(result.body.success).toBe(true);
      // 搜索响应时间应该在合理范围内（比如2秒内）
      expect(responseTime).toBeLessThan(2000);
    });

    it('应该在合理时间内获取所有盲盒', async () => {
      const startTime = Date.now();
      
      const result = await createHttpRequest(app)
        .get('/blind-box/');

      const endTime = Date.now();
      const responseTime = endTime - startTime;

      expect(result.status).toBe(200);
      expect(result.body.success).toBe(true);
      // 获取所有盲盒应该在合理时间内完成
      expect(responseTime).toBeLessThan(2000);
    });
  });
}); 