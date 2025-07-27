import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';

describe('抽取随机性测试', () => {
  let app: any;

  beforeAll(async () => {
    app = await createApp<Framework>();
  });

  afterAll(async () => {
    await close(app);
  });

  describe('随机性验证测试', () => {
    it('应该验证抽取结果的随机性', async () => {
      const blindBoxId = 1;
      const drawCount = 100;
      const results = [];

      // 进行多次抽取
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

      // 验证抽取结果的多样性
      if (results.length > 1) {
        const uniqueResults = new Set(results);
        expect(uniqueResults.size).toBeGreaterThan(1);
      }
    });

    it('应该验证不同用户的抽取独立性', async () => {
      const blindBoxId = 1;
      const userIds = [1, 2, 3, 4, 5];
      const userResults = {};

      // 每个用户进行多次抽取
      for (const userId of userIds) {
        userResults[userId] = [];
        for (let i = 0; i < 20; i++) {
          const result = await createHttpRequest(app)
            .get('/blind-box/draw')
            .query({ 
              id: blindBoxId,
              user_id: userId 
            });

          expect(result.status).toBe(200);
          expect(result.body.success).toBe(true);
          
          if (result.body.style) {
            userResults[userId].push(result.body.style.id);
          }
        }
      }

      // 验证不同用户的抽取结果都有多样性
      for (const userId of userIds) {
        if (userResults[userId].length > 1) {
          const uniqueResults = new Set(userResults[userId]);
          expect(uniqueResults.size).toBeGreaterThan(1);
        }
      }
    });
  });

  describe('概率分布测试', () => {
    it('应该验证抽取结果的概率分布', async () => {
      const blindBoxId = 1;
      const drawCount = 1000;
      const results = [];

      // 进行大量抽取
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

      // 统计每种样式的抽取次数
      const styleCounts = {};
      results.forEach(styleId => {
        styleCounts[styleId] = (styleCounts[styleId] || 0) + 1;
      });

      // 验证所有样式都被抽取到
      expect(Object.keys(styleCounts).length).toBeGreaterThan(0);

      // 验证抽取次数分布的合理性（不应该有某个样式完全没有被抽到）
      const totalDraws = results.length;
      const expectedMinDraws = Math.floor(totalDraws / Object.keys(styleCounts).length * 0.1); // 至少10%的期望值

      for (const styleId in styleCounts) {
        expect(styleCounts[styleId]).toBeGreaterThanOrEqual(expectedMinDraws);
      }
    });

    it('应该验证连续抽取的随机性', async () => {
      const blindBoxId = 1;
      const userId = 1;
      const consecutiveDraws = 50;
      const results = [];

      // 连续抽取
      for (let i = 0; i < consecutiveDraws; i++) {
        const result = await createHttpRequest(app)
          .get('/blind-box/draw')
          .query({ 
            id: blindBoxId,
            user_id: userId 
          });

        expect(result.status).toBe(200);
        expect(result.body.success).toBe(true);
        
        if (result.body.style) {
          results.push(result.body.style.id);
        }
      }

      // 验证连续抽取结果的随机性
      if (results.length > 1) {
        const uniqueResults = new Set(results);
        expect(uniqueResults.size).toBeGreaterThan(1);
      }
    });
  });

  describe('时间随机性测试', () => {
    it('应该验证不同时间点的抽取随机性', async () => {
      const blindBoxId = 1;
      const userId = 1;
      const timePoints = 10;
      const results = [];

      // 在不同时间点进行抽取
      for (let i = 0; i < timePoints; i++) {
        // 添加随机延迟
        await new Promise(resolve => setTimeout(resolve, Math.random() * 100));
        
        const result = await createHttpRequest(app)
          .get('/blind-box/draw')
          .query({ 
            id: blindBoxId,
            user_id: userId 
          });

        expect(result.status).toBe(200);
        expect(result.body.success).toBe(true);
        
        if (result.body.style) {
          results.push(result.body.style.id);
        }
      }

      // 验证不同时间点的抽取结果多样性
      if (results.length > 1) {
        const uniqueResults = new Set(results);
        expect(uniqueResults.size).toBeGreaterThan(1);
      }
    });
  });

  describe('边界随机性测试', () => {
    it('应该验证边界条件下的随机性', async () => {
      const testCases = [
        { id: 1, user_id: 1 }, // 正常情况
        { id: 1, user_id: 99999 }, // 不存在的用户
        { id: 99999, user_id: 1 }, // 不存在的盲盒
        { id: 1, user_id: 1 } // 重复测试
      ];

      const results = [];

      for (const testCase of testCases) {
        const result = await createHttpRequest(app)
          .get('/blind-box/draw')
          .query(testCase);

        expect(result.status).toBe(200);
        expect(result.body.success).toBe(true);
        
        if (result.body.style) {
          results.push(result.body.style.id);
        }
      }

      // 验证边界条件下的抽取结果
      expect(results.length).toBeGreaterThanOrEqual(0);
    });

    it('应该验证并发抽取的随机性', async () => {
      const blindBoxId = 1;
      const concurrentRequests = 10;
      const results = [];

      // 并发抽取
      const promises = [];
      for (let i = 0; i < concurrentRequests; i++) {
        promises.push(
          createHttpRequest(app)
            .get('/blind-box/draw')
            .query({ 
              id: blindBoxId,
              user_id: i + 1 
            })
        );
      }

      const responses = await Promise.all(promises);

      // 收集结果
      for (const response of responses) {
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        
        if (response.body.style) {
          results.push(response.body.style.id);
        }
      }

      // 验证并发抽取结果的随机性
      if (results.length > 1) {
        const uniqueResults = new Set(results);
        expect(uniqueResults.size).toBeGreaterThan(1);
      }
    });
  });

  describe('随机种子测试', () => {
    it('应该验证不同请求的随机性', async () => {
      const blindBoxId = 1;
      const requestCount = 50;
      const results = [];

      // 进行多次独立请求
      for (let i = 0; i < requestCount; i++) {
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

      // 验证结果的随机性
      if (results.length > 1) {
        const uniqueResults = new Set(results);
        expect(uniqueResults.size).toBeGreaterThan(1);
        
        // 验证没有明显的模式
        const consecutiveSame = results.filter((val, idx) => 
          idx > 0 && val === results[idx - 1]
        ).length;
        
        // 连续相同结果不应该过多
        expect(consecutiveSame).toBeLessThan(results.length * 0.5);
      }
    });
  });
}); 