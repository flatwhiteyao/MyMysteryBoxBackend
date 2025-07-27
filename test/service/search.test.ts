import { createApp, close } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';
import { BlindBoxService } from '../../src/service/blindBox.service';
import { BlindBoxStyleService } from '../../src/service/blindBoxStyle.service';

describe('搜索服务单元测试', () => {
  let app: any;
  let blindBoxService: BlindBoxService;
  let blindBoxStyleService: BlindBoxStyleService;

  beforeAll(async () => {
    app = await createApp<Framework>();
    blindBoxService = await app.getApplicationContext().getAsync(BlindBoxService);
    blindBoxStyleService = await app.getApplicationContext().getAsync(BlindBoxStyleService);
  });

  afterAll(async () => {
    await close(app);
  });

  describe('盲盒搜索服务', () => {
    it('应该成功获取所有盲盒', async () => {
      const blindBoxes = await blindBoxService.getAllBlindBoxes();
      
      expect(Array.isArray(blindBoxes)).toBe(true);
      // 验证每个盲盒对象的结构
      if (blindBoxes.length > 0) {
        const firstBox = blindBoxes[0];
        expect(firstBox).toHaveProperty('id');
        expect(firstBox).toHaveProperty('name');
        expect(firstBox).toHaveProperty('description');
        expect(firstBox).toHaveProperty('price');
        expect(firstBox).toHaveProperty('photo');
      }
    });

    it('应该成功搜索包含关键词的盲盒', async () => {
      const keyword = '测试';
      const blindBoxes = await blindBoxService.searchBlindBoxes(keyword);
      
      expect(Array.isArray(blindBoxes)).toBe(true);
      // 验证搜索结果按ID降序排列
      if (blindBoxes.length > 1) {
        expect(blindBoxes[0].id).toBeGreaterThanOrEqual(blindBoxes[1].id);
      }
    });

    it('应该处理空关键词搜索', async () => {
      const keyword = '';
      const blindBoxes = await blindBoxService.searchBlindBoxes(keyword);
      
      expect(Array.isArray(blindBoxes)).toBe(true);
    });

    it('应该处理不存在的关键词', async () => {
      const keyword = '不存在的关键词';
      const blindBoxes = await blindBoxService.searchBlindBoxes(keyword);
      
      expect(Array.isArray(blindBoxes)).toBe(true);
      expect(blindBoxes.length).toBe(0);
    });

    it('应该处理特殊字符搜索', async () => {
      const keyword = '!@#$%';
      const blindBoxes = await blindBoxService.searchBlindBoxes(keyword);
      
      expect(Array.isArray(blindBoxes)).toBe(true);
    });

    it('应该处理中英文混合搜索', async () => {
      const keyword = '测试test';
      const blindBoxes = await blindBoxService.searchBlindBoxes(keyword);
      
      expect(Array.isArray(blindBoxes)).toBe(true);
    });
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
      }
    });

    it('应该处理没有样式的盲盒抽取', async () => {
      const blindBoxId = 99999; // 假设这个ID没有样式
      const result = await blindBoxStyleService.randomDraw(blindBoxId);
      
      // 应该返回null
      expect(result).toBeNull();
    });
  });

  describe('搜索性能测试', () => {
    it('应该快速处理大量数据搜索', async () => {
      const startTime = Date.now();
      const keyword = '测试';
      const blindBoxes = await blindBoxService.searchBlindBoxes(keyword);
      const endTime = Date.now();
      
      expect(Array.isArray(blindBoxes)).toBe(true);
      // 搜索应该在合理时间内完成（比如1秒内）
      expect(endTime - startTime).toBeLessThan(1000);
    });

    it('应该快速获取所有盲盒', async () => {
      const startTime = Date.now();
      const blindBoxes = await blindBoxService.getAllBlindBoxes();
      const endTime = Date.now();
      
      expect(Array.isArray(blindBoxes)).toBe(true);
      // 获取所有盲盒应该在合理时间内完成
      expect(endTime - startTime).toBeLessThan(1000);
    });
  });

  describe('搜索边界情况', () => {
    it('应该处理超长关键词', async () => {
      const longKeyword = 'a'.repeat(1000);
      const blindBoxes = await blindBoxService.searchBlindBoxes(longKeyword);
      
      expect(Array.isArray(blindBoxes)).toBe(true);
    });

    it('应该处理包含SQL注入尝试的关键词', async () => {
      const sqlInjectionKeyword = "'; DROP TABLE blind_boxes; --";
      const blindBoxes = await blindBoxService.searchBlindBoxes(sqlInjectionKeyword);
      
      expect(Array.isArray(blindBoxes)).toBe(true);
    });

    it('应该处理Unicode字符搜索', async () => {
      const unicodeKeyword = '测试🎁🎉';
      const blindBoxes = await blindBoxService.searchBlindBoxes(unicodeKeyword);
      
      expect(Array.isArray(blindBoxes)).toBe(true);
    });
  });
}); 