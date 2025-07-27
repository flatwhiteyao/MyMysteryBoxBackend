import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';

describe('搜索功能性能测试', () => {
  let app: any;

  beforeAll(async () => {
    app = await createApp<Framework>();
  });

  afterAll(async () => {
    await close(app);
  });

  describe('搜索响应时间测试', () => {
    it('搜索API应该在500ms内响应', async () => {
      const startTime = Date.now();
      
      const result = await createHttpRequest(app)
        .get('/blind-box/search')
        .query({ keyword: '测试' });

      const endTime = Date.now();
      const responseTime = endTime - startTime;

      expect(result.status).toBe(200);
      expect(result.body.success).toBe(true);
      expect(responseTime).toBeLessThan(500);
    });

    it('获取所有盲盒应该在300ms内响应', async () => {
      const startTime = Date.now();
      
      const result = await createHttpRequest(app)
        .get('/blind-box/');

      const endTime = Date.now();
      const responseTime = endTime - startTime;

      expect(result.status).toBe(200);
      expect(result.body.success).toBe(true);
      expect(responseTime).toBeLessThan(300);
    });

    it('获取盲盒样式应该在200ms内响应', async () => {
      const startTime = Date.now();
      
      const result = await createHttpRequest(app)
        .get('/blind-box/styles')
        .query({ id: 1 });

      const endTime = Date.now();
      const responseTime = endTime - startTime;

      expect(result.status).toBe(200);
      expect(result.body.success).toBe(true);
      expect(responseTime).toBeLessThan(200);
    });
  });

  describe('并发搜索性能测试', () => {
    it('应该能够处理10个并发搜索请求', async () => {
      const concurrentRequests = 10;
      const searchPromises = [];

      const startTime = Date.now();

      // 创建多个并发搜索请求
      for (let i = 0; i < concurrentRequests; i++) {
        searchPromises.push(
          createHttpRequest(app)
            .get('/blind-box/search')
            .query({ keyword: `测试${i}` })
        );
      }

      const results = await Promise.all(searchPromises);
      const endTime = Date.now();
      const totalTime = endTime - startTime;

      // 验证所有请求都成功
      for (const result of results) {
        expect(result.status).toBe(200);
        expect(result.body.success).toBe(true);
      }

      // 总时间应该在合理范围内
      expect(totalTime).toBeLessThan(2000);
    });

    it('应该能够处理混合并发请求', async () => {
      const requests = [
        createHttpRequest(app).get('/blind-box/search').query({ keyword: '测试' }),
        createHttpRequest(app).get('/blind-box/'),
        createHttpRequest(app).get('/blind-box/styles').query({ id: 1 }),
        createHttpRequest(app).get('/blind-box/search').query({ keyword: '' }),
        createHttpRequest(app).get('/blind-box/search').query({ keyword: '盲盒' })
      ];

      const startTime = Date.now();
      const results = await Promise.all(requests);
      const endTime = Date.now();
      const totalTime = endTime - startTime;

      // 验证所有请求都成功
      for (const result of results) {
        expect(result.status).toBe(200);
        expect(result.body.success).toBe(true);
      }

      // 总时间应该在合理范围内
      expect(totalTime).toBeLessThan(1500);
    });
  });

  describe('搜索负载测试', () => {
    it('应该能够处理大量连续搜索请求', async () => {
      const requestCount = 50;
      const keywords = ['测试', '盲盒', '玩具', '收藏', '限定'];
      const startTime = Date.now();

      for (let i = 0; i < requestCount; i++) {
        const keyword = keywords[i % keywords.length];
        const result = await createHttpRequest(app)
          .get('/blind-box/search')
          .query({ keyword });

        expect(result.status).toBe(200);
        expect(result.body.success).toBe(true);
      }

      const endTime = Date.now();
      const totalTime = endTime - startTime;

      // 50个请求应该在合理时间内完成
      expect(totalTime).toBeLessThan(5000);
    });

    it('应该能够处理不同长度的搜索关键词', async () => {
      const keywords = [
        'a',
        '测试',
        '这是一个很长的搜索关键词',
        'a'.repeat(100),
        '测试🎁🎉🎊🎈🎀'
      ];

      const startTime = Date.now();

      for (const keyword of keywords) {
        const result = await createHttpRequest(app)
          .get('/blind-box/search')
          .query({ keyword });

        expect(result.status).toBe(200);
        expect(result.body.success).toBe(true);
      }

      const endTime = Date.now();
      const totalTime = endTime - startTime;

      // 所有请求应该在合理时间内完成
      expect(totalTime).toBeLessThan(2000);
    });
  });

  describe('内存使用测试', () => {
    it('搜索操作不应该导致内存泄漏', async () => {
      const initialMemory = process.memoryUsage().heapUsed;
      
      // 执行多次搜索操作
      for (let i = 0; i < 100; i++) {
        await createHttpRequest(app)
          .get('/blind-box/search')
          .query({ keyword: `测试${i}` });
      }

      // 等待垃圾回收
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const finalMemory = process.memoryUsage().heapUsed;
      const memoryIncrease = finalMemory - initialMemory;

      // 内存增长应该在合理范围内（比如不超过10MB）
      expect(memoryIncrease).toBeLessThan(10 * 1024 * 1024);
    });
  });

  describe('搜索稳定性测试', () => {
    it('应该能够稳定处理重复搜索', async () => {
      const keyword = '测试';
      const repeatCount = 20;

      for (let i = 0; i < repeatCount; i++) {
        const result = await createHttpRequest(app)
          .get('/blind-box/search')
          .query({ keyword });

        expect(result.status).toBe(200);
        expect(result.body.success).toBe(true);
        expect(Array.isArray(result.body.blindBoxes)).toBe(true);
      }
    });

    it('应该能够处理边界搜索条件', async () => {
      const edgeCases = [
        { keyword: '' },
        { keyword: '   ' },
        { keyword: '!@#$%^&*()' },
        { keyword: '测试test123' },
        { keyword: '🎁🎉🎊🎈🎀' }
      ];

      for (const edgeCase of edgeCases) {
        const result = await createHttpRequest(app)
          .get('/blind-box/search')
          .query(edgeCase);

        expect(result.status).toBe(200);
        expect(result.body.success).toBe(true);
        expect(Array.isArray(result.body.blindBoxes)).toBe(true);
      }
    });
  });
}); 