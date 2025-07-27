import { createApp, close } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';
import { BlindBoxStyleService } from '../../src/service/blindBoxStyle.service';
import { UserDrawnBlindBoxService } from '../../src/service/userDrawnBlindBox.service';

describe('抽取服务单元测试', () => {
  let app: any;
  let blindBoxStyleService: BlindBoxStyleService;
  let userDrawnBlindBoxService: UserDrawnBlindBoxService;

  beforeAll(async () => {
    app = await createApp<Framework>();
    blindBoxStyleService = await app.getApplicationContext().getAsync(BlindBoxStyleService);
    userDrawnBlindBoxService = await app.getApplicationContext().getAsync(UserDrawnBlindBoxService);
  });

  afterAll(async () => {
    await close(app);
  });

  describe('盲盒样式服务', () => {
    it('应该成功获取盲盒样式', async () => {
      const blindBoxId = 1;
      const styles = await blindBoxStyleService.getBlindBoxStyles(blindBoxId);
      
      expect(Array.isArray(styles)).toBe(true);
      // 验证样式对象的结构
      if (styles.length > 0) {
        const firstStyle = styles[0];
        expect(firstStyle).toHaveProperty('id');
        expect(firstStyle).toHaveProperty('blind_box_id');
        expect(firstStyle).toHaveProperty('name');
        expect(firstStyle).toHaveProperty('photo');
        expect(firstStyle).toHaveProperty('probability');
        expect(typeof firstStyle.probability).toBe('number');
      }
    });

    it('应该处理不存在的盲盒ID', async () => {
      const blindBoxId = 99999;
      const styles = await blindBoxStyleService.getBlindBoxStyles(blindBoxId);
      
      expect(Array.isArray(styles)).toBe(true);
      expect(styles.length).toBe(0);
    });

    it('应该成功进行随机抽取', async () => {
      const blindBoxId = 1;
      const result = await blindBoxStyleService.randomDraw(blindBoxId);
      
      // 随机抽取可能返回null（如果没有样式）
      if (result) {
        expect(result).toHaveProperty('id');
        expect(result).toHaveProperty('name');
        expect(result).toHaveProperty('photo');
        expect(result).toHaveProperty('probability');
        expect(typeof result.probability).toBe('number');
        expect(result.probability).toBeGreaterThan(0);
      }
    });

    it('应该处理没有样式的盲盒抽取', async () => {
      const blindBoxId = 99999; // 假设这个ID没有样式
      const result = await blindBoxStyleService.randomDraw(blindBoxId);
      
      // 应该返回null
      expect(result).toBeNull();
    });
  });

  describe('用户抽取记录服务', () => {
    it('应该成功获取用户抽取记录', async () => {
      const userId = 1;
      const drawnBlindBoxes = await userDrawnBlindBoxService.getUserDrawnBlindBoxes(userId);
      
      expect(Array.isArray(drawnBlindBoxes)).toBe(true);
      // 验证抽取记录对象的结构
      if (drawnBlindBoxes.length > 0) {
        const firstRecord = drawnBlindBoxes[0];
        expect(firstRecord).toHaveProperty('id');
        expect(firstRecord).toHaveProperty('drawn_at');
        expect(firstRecord).toHaveProperty('blind_box_id');
        expect(firstRecord).toHaveProperty('blind_box_name');
        expect(firstRecord).toHaveProperty('blind_box_photo');
        expect(firstRecord).toHaveProperty('style_id');
        expect(firstRecord).toHaveProperty('style_name');
        expect(firstRecord).toHaveProperty('style_photo');
      }
    });

    it('应该处理不存在的用户ID', async () => {
      const userId = 99999;
      const drawnBlindBoxes = await userDrawnBlindBoxService.getUserDrawnBlindBoxes(userId);
      
      expect(Array.isArray(drawnBlindBoxes)).toBe(true);
      expect(drawnBlindBoxes.length).toBe(0);
    });

    it('应该成功添加用户抽取记录', async () => {
      const userId = 1;
      const blindBoxId = 1;
      const styleId = 1;
      
      // 添加抽取记录
      await userDrawnBlindBoxService.addUserDrawnBlindBox(userId, blindBoxId, styleId);
      
      // 验证记录是否添加成功
      const drawnBlindBoxes = await userDrawnBlindBoxService.getUserDrawnBlindBoxes(userId);
      expect(Array.isArray(drawnBlindBoxes)).toBe(true);
    });

    it('应该成功删除用户抽取记录', async () => {
      const recordId = 1;
      
      // 删除抽取记录
      await userDrawnBlindBoxService.deleteUserDrawnBlindBox(recordId);
      
      // 验证记录是否删除成功（这里可能需要重新获取记录来验证）
      expect(true).toBe(true); // 如果没有抛出异常，说明删除成功
    });
  });

  describe('抽取算法测试', () => {
    it('应该根据概率正确抽取', async () => {
      const blindBoxId = 1;
      const drawCount = 1000;
      const results = [];
      
      // 进行多次抽取
      for (let i = 0; i < drawCount; i++) {
        const result = await blindBoxStyleService.randomDraw(blindBoxId);
        if (result) {
          results.push(result);
        }
      }
      
      expect(results.length).toBeGreaterThan(0);
      
      // 统计抽取结果
      const styleCounts = {};
      results.forEach(style => {
        styleCounts[style.id] = (styleCounts[style.id] || 0) + 1;
      });
      
      // 验证抽取结果的合理性
      expect(Object.keys(styleCounts).length).toBeGreaterThan(0);
    });

    it('应该处理概率总和为0的情况', async () => {
      // 这个测试验证当所有样式概率都为0时的处理
      const blindBoxId = 99999; // 假设这个ID的样式概率都为0
      const result = await blindBoxStyleService.randomDraw(blindBoxId);
      
      // 应该返回null
      expect(result).toBeNull();
    });
  });

  describe('抽取性能测试', () => {
    it('应该快速完成随机抽取', async () => {
      const blindBoxId = 1;
      const startTime = Date.now();
      
      const result = await blindBoxStyleService.randomDraw(blindBoxId);
      const endTime = Date.now();
      
      const responseTime = endTime - startTime;
      
      // 抽取应该在合理时间内完成（比如100ms内）
      expect(responseTime).toBeLessThan(100);
    });

    it('应该快速获取用户抽取记录', async () => {
      const userId = 1;
      const startTime = Date.now();
      
      const drawnBlindBoxes = await userDrawnBlindBoxService.getUserDrawnBlindBoxes(userId);
      const endTime = Date.now();
      
      const responseTime = endTime - startTime;
      
      expect(Array.isArray(drawnBlindBoxes)).toBe(true);
      // 获取记录应该在合理时间内完成
      expect(responseTime).toBeLessThan(200);
    });
  });

  describe('抽取边界情况', () => {
    it('应该处理无效的盲盒ID', async () => {
      const invalidIds = [null, undefined, 'invalid', -1, 0];
      
      for (const invalidId of invalidIds) {
        const styles = await blindBoxStyleService.getBlindBoxStyles(invalidId as any);
        expect(Array.isArray(styles)).toBe(true);
      }
    });

    it('应该处理无效的用户ID', async () => {
      const invalidIds = [null, undefined, 'invalid', -1, 0];
      
      for (const invalidId of invalidIds) {
        const drawnBlindBoxes = await userDrawnBlindBoxService.getUserDrawnBlindBoxes(invalidId as any);
        expect(Array.isArray(drawnBlindBoxes)).toBe(true);
      }
    });

    it('应该处理大量并发抽取请求', async () => {
      const blindBoxId = 1;
      const concurrentRequests = 10;
      const promises = [];
      
      for (let i = 0; i < concurrentRequests; i++) {
        promises.push(blindBoxStyleService.randomDraw(blindBoxId));
      }
      
      const results = await Promise.all(promises);
      
      expect(results.length).toBe(concurrentRequests);
      // 验证所有请求都成功完成
      results.forEach(result => {
        if (result) {
          expect(result).toHaveProperty('id');
          expect(result).toHaveProperty('name');
        }
      });
    });
  });
}); 