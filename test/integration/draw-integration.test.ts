import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';

describe('抽取功能集成测试', () => {
  let app: any;

  beforeAll(async () => {
    app = await createApp<Framework>();
  });

  afterAll(async () => {
    await close(app);
  });

  describe('完整的抽取流程测试', () => {
    it('应该完成完整的抽取到记录流程', async () => {
      // 第一步：获取盲盒样式
      const stylesResult = await createHttpRequest(app)
        .get('/blind-box/styles')
        .query({ id: 1 });

      expect(stylesResult.status).toBe(200);
      expect(stylesResult.body.success).toBe(true);
      expect(Array.isArray(stylesResult.body.styles)).toBe(true);

      // 第二步：进行随机抽取
      if (stylesResult.body.styles.length > 0) {
        const drawResult = await createHttpRequest(app)
          .get('/blind-box/draw')
          .query({ 
            id: 1,
            user_id: 1 
          });

        expect(drawResult.status).toBe(200);
        expect(drawResult.body.success).toBe(true);
        expect(drawResult.body.style).toBeDefined();
      }
    });

    it('应该处理抽取到记录管理的完整流程', async () => {
      // 第一步：进行抽取
      const drawResult = await createHttpRequest(app)
        .get('/blind-box/draw')
        .query({ 
          id: 1,
          user_id: 1 
        });

      expect(drawResult.status).toBe(200);
      expect(drawResult.body.success).toBe(true);

      // 第二步：获取用户抽取记录
      const recordsResult = await createHttpRequest(app)
        .get('/user-drawn-blind-boxes/')
        .query({ user_id: 1 });

      expect(recordsResult.status).toBe(200);
      expect(recordsResult.body.success).toBe(true);
      expect(Array.isArray(recordsResult.body.drawnBlindBoxes)).toBe(true);
    });
  });

  describe('抽取功能边界测试', () => {
    it('应该处理大量并发抽取请求', async () => {
      const drawPromises = [];
      const userIds = [1, 2, 3, 4, 5];

      // 创建多个并发抽取请求
      for (const userId of userIds) {
        drawPromises.push(
          createHttpRequest(app)
            .get('/blind-box/draw')
            .query({ 
              id: 1,
              user_id: userId 
            })
        );
      }

      const results = await Promise.all(drawPromises);

      // 验证所有请求都成功
      for (const result of results) {
        expect(result.status).toBe(200);
        expect(result.body.success).toBe(true);
      }
    });

    it('应该处理连续抽取操作', async () => {
      const userIds = [1, 2, 3, 4, 5];

      for (const userId of userIds) {
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
  });

  describe('抽取API端点可用性测试', () => {
    it('应该验证所有抽取相关API端点可用', async () => {
      // 测试抽取端点
      const drawResult = await createHttpRequest(app)
        .get('/blind-box/draw')
        .query({ 
          id: 1,
          user_id: 1 
        });

      expect(drawResult.status).toBe(200);

      // 测试获取样式端点
      const stylesResult = await createHttpRequest(app)
        .get('/blind-box/styles')
        .query({ id: 1 });

      expect(stylesResult.status).toBe(200);

      // 测试获取用户抽取记录端点
      const recordsResult = await createHttpRequest(app)
        .get('/user-drawn-blind-boxes/')
        .query({ user_id: 1 });

      expect(recordsResult.status).toBe(200);
    });
  });

  describe('抽取错误处理集成测试', () => {
    it('应该正确处理各种错误情况', async () => {
      // 测试无效的盲盒ID
      const invalidDrawResult = await createHttpRequest(app)
        .get('/blind-box/draw')
        .query({ 
          id: 'invalid',
          user_id: 1 
        });

      expect(invalidDrawResult.status).toBe(200);

      // 测试无效的用户ID
      const invalidUserResult = await createHttpRequest(app)
        .get('/user-drawn-blind-boxes/')
        .query({ user_id: 'invalid' });

      expect(invalidUserResult.status).toBe(200);
    });
  });

  describe('抽取性能集成测试', () => {
    it('应该在合理时间内完成抽取操作', async () => {
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
      // 抽取响应时间应该在合理范围内（比如1秒内）
      expect(responseTime).toBeLessThan(1000);
    });

    it('应该在合理时间内获取用户抽取记录', async () => {
      const startTime = Date.now();
      
      const result = await createHttpRequest(app)
        .get('/user-drawn-blind-boxes/')
        .query({ user_id: 1 });

      const endTime = Date.now();
      const responseTime = endTime - startTime;

      expect(result.status).toBe(200);
      expect(result.body.success).toBe(true);
      // 获取记录应该在合理时间内完成
      expect(responseTime).toBeLessThan(1000);
    });
  });

  describe('抽取数据一致性测试', () => {
    it('应该保持抽取数据的一致性', async () => {
      // 第一步：进行抽取
      const drawResult = await createHttpRequest(app)
        .get('/blind-box/draw')
        .query({ 
          id: 1,
          user_id: 1 
        });

      expect(drawResult.status).toBe(200);
      expect(drawResult.body.success).toBe(true);

      // 第二步：验证抽取的样式确实存在
      if (drawResult.body.style) {
        const stylesResult = await createHttpRequest(app)
          .get('/blind-box/styles')
          .query({ id: 1 });

        expect(stylesResult.status).toBe(200);
        expect(stylesResult.body.success).toBe(true);
        
        // 验证抽取的样式在样式列表中
        const styleExists = stylesResult.body.styles.some(
          (style: any) => style.id === drawResult.body.style.id
        );
        expect(styleExists).toBe(true);
      }
    });

    it('应该正确处理抽取记录的删除', async () => {
      // 第一步：获取用户抽取记录
      const recordsResult = await createHttpRequest(app)
        .get('/user-drawn-blind-boxes/')
        .query({ user_id: 1 });

      expect(recordsResult.status).toBe(200);
      expect(recordsResult.body.success).toBe(true);

      // 第二步：删除一条记录（如果存在）
      if (recordsResult.body.drawnBlindBoxes.length > 0) {
        const recordId = recordsResult.body.drawnBlindBoxes[0].id;
        const deleteResult = await createHttpRequest(app)
          .del(`/user-drawn-blind-boxes/${recordId}`);

        expect(deleteResult.status).toBe(200);
        expect(deleteResult.body.success).toBe(true);
      }
    });
  });
}); 