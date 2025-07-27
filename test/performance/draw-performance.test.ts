import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';

describe('抽取功能性能测试', () => {
  let app: any;

  beforeAll(async () => {
    app = await createApp<Framework>();
  });

  afterAll(async () => {
    await close(app);
  });

  describe('抽取响应时间测试', () => {
    it('抽取API应该在300ms内响应', async () => {
      const startTime = Date.now();
      
      const result = await createHttpRequest(app)
        .get('/blind-box/draw')
        .query({ 
          id: 1,
          user_id: 1 
        });

      const endTime = Date.now();
      const responseTime = endTime - startTime;

      expect(result.status).toBe(200);
      expect(result.body.success).toBe(true);
      expect(responseTime).toBeLessThan(300);
    });

    it('获取用户抽取记录应该在200ms内响应', async () => {
      const startTime = Date.now();
      
      const result = await createHttpRequest(app)
        .get('/user-drawn-blind-boxes/')
        .query({ user_id: 1 });

      const endTime = Date.now();
      const responseTime = endTime - startTime;

      expect(result.status).toBe(200);
      expect(result.body.success).toBe(true);
      expect(responseTime).toBeLessThan(200);
    });

    it('获取盲盒样式应该在150ms内响应', async () => {
      const startTime = Date.now();
      
      const result = await createHttpRequest(app)
        .get('/blind-box/styles')
        .query({ id: 1 });

      const endTime = Date.now();
      const responseTime = endTime - startTime;

      expect(result.status).toBe(200);
      expect(result.body.success).toBe(true);
      expect(responseTime).toBeLessThan(150);
    });
  });

  describe('并发抽取性能测试', () => {
    it('应该能够处理20个并发抽取请求', async () => {
      const concurrentRequests = 20;
      const drawPromises = [];

      const startTime = Date.now();

      // 创建多个并发抽取请求
      for (let i = 0; i < concurrentRequests; i++) {
        drawPromises.push(
          createHttpRequest(app)
            .get('/blind-box/draw')
            .query({ 
              id: 1,
              user_id: i + 1 
            })
        );
      }

      const results = await Promise.all(drawPromises);
      const endTime = Date.now();
      const totalTime = endTime - startTime;

      // 验证所有请求都成功
      for (const result of results) {
        expect(result.status).toBe(200);
        expect(result.body.success).toBe(true);
      }

      // 总时间应该在合理范围内
      expect(totalTime).toBeLessThan(3000);
    });

    it('应该能够处理混合并发请求', async () => {
      const requests = [
        createHttpRequest(app).get('/blind-box/draw').query({ id: 1, user_id: 1 }),
        createHttpRequest(app).get('/blind-box/styles').query({ id: 1 }),
        createHttpRequest(app).get('/user-drawn-blind-boxes/').query({ user_id: 1 }),
        createHttpRequest(app).get('/blind-box/draw').query({ id: 1, user_id: 2 }),
        createHttpRequest(app).get('/blind-box/draw').query({ id: 1, user_id: 3 })
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
      expect(totalTime).toBeLessThan(2000);
    });
  });

  describe('抽取负载测试', () => {
    it('应该能够处理大量连续抽取请求', async () => {
      const requestCount = 100;
      const userIds = [1, 2, 3, 4, 5];
      const startTime = Date.now();

      for (let i = 0; i < requestCount; i++) {
        const userId = userIds[i % userIds.length];
        const result = await createHttpRequest(app)
          .get('/blind-box/draw')
          .query({ 
            id: 1,
            user_id: userId 
          });

        expect(result.status).toBe(200);
        expect(result.body.success).toBe(true);
      }

      const endTime = Date.now();
      const totalTime = endTime - startTime;

      // 100个请求应该在合理时间内完成
      expect(totalTime).toBeLessThan(10000);
    });

    it('应该能够处理不同盲盒的抽取', async () => {
      const blindBoxIds = [1, 2, 3, 4, 5];
      const startTime = Date.now();

      for (const blindBoxId of blindBoxIds) {
        const result = await createHttpRequest(app)
          .get('/blind-box/draw')
          .query({ 
            id: blindBoxId,
            user_id: 1 
          });

        expect(result.status).toBe(200);
        expect(result.body.success).toBe(true);
      }

      const endTime = Date.now();
      const totalTime = endTime - startTime;

      // 所有请求应该在合理时间内完成
      expect(totalTime).toBeLessThan(3000);
    });
  });

  describe('内存使用测试', () => {
    it('抽取操作不应该导致内存泄漏', async () => {
      const initialMemory = process.memoryUsage().heapUsed;
      
      // 执行多次抽取操作
      for (let i = 0; i < 50; i++) {
        await createHttpRequest(app)
          .get('/blind-box/draw')
          .query({ 
            id: 1,
            user_id: i + 1 
          });
      }

      // 等待垃圾回收
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const finalMemory = process.memoryUsage().heapUsed;
      const memoryIncrease = finalMemory - initialMemory;

      // 内存增长应该在合理范围内（比如不超过5MB）
      expect(memoryIncrease).toBeLessThan(5 * 1024 * 1024);
    });
  });

  describe('抽取稳定性测试', () => {
    it('应该能够稳定处理重复抽取', async () => {
      const userId = 1;
      const repeatCount = 30;

      for (let i = 0; i < repeatCount; i++) {
        const result = await createHttpRequest(app)
          .get('/blind-box/draw')
          .query({ 
            id: 1,
            user_id: userId 
          });

        expect(result.status).toBe(200);
        expect(result.body.success).toBe(true);
      }
    });

    it('应该能够处理边界抽取条件', async () => {
      const edgeCases = [
        { id: 1, user_id: 1 },
        { id: 99999, user_id: 1 }, // 不存在的盲盒
        { id: 1, user_id: 99999 }, // 不存在的用户
        { id: 'invalid', user_id: 1 }, // 无效的盲盒ID
        { id: 1, user_id: 'invalid' } // 无效的用户ID
      ];

      for (const edgeCase of edgeCases) {
        const result = await createHttpRequest(app)
          .get('/blind-box/draw')
          .query(edgeCase);

        expect(result.status).toBe(200);
        expect(result.body.success).toBe(true);
      }
    });
  });

  describe('抽取算法性能测试', () => {
    it('应该快速完成概率计算', async () => {
      const blindBoxId = 1;
      const drawCount = 100;
      const startTime = Date.now();

      for (let i = 0; i < drawCount; i++) {
        const result = await createHttpRequest(app)
          .get('/blind-box/draw')
          .query({ 
            id: blindBoxId,
            user_id: i + 1 
          });

        expect(result.status).toBe(200);
        expect(result.body.success).toBe(true);
      }

      const endTime = Date.now();
      const totalTime = endTime - startTime;

      // 100次抽取应该在合理时间内完成
      expect(totalTime).toBeLessThan(5000);
    });

    it('应该保持抽取结果的随机性', async () => {
      const blindBoxId = 1;
      const drawCount = 50;
      const results = [];

      for (let i = 0; i < drawCount; i++) {
        const result = await createHttpRequest(app)
          .get('/blind-box/draw')
          .query({ 
            id: blindBoxId,
            user_id: i + 1 
          });

        expect(result.status).toBe(200);
        expect(result.body.success).toBe(true);
        
        if (result.body.style) {
          results.push(result.body.style.id);
        }
      }

      // 验证抽取结果的多样性（如果有多个样式）
      if (results.length > 1) {
        const uniqueResults = new Set(results);
        expect(uniqueResults.size).toBeGreaterThan(1);
      }
    });
  });
}); 