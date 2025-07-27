# 抽取盲盒功能 CI/CD 工作流说明

## 概述

本项目配置了专门针对抽取盲盒功能的GitHub Actions CI/CD工作流，确保盲盒抽取功能的稳定性、随机性和性能。

## 工作流文件

### `.github/workflows/draw-ci.yml`

这是专门针对抽取功能的CI/CD工作流文件，包含以下特性：

#### 触发条件
- **路径触发**: 只有当抽取相关文件发生变化时才触发
  - `src/controller/blindBox.controller.ts`
  - `src/controller/userDrawnBlindBox.controller.ts`
  - `src/service/blindBoxStyle.service.ts`
  - `src/service/userDrawnBlindBox.service.ts`
  - `test/**/draw*.test.ts`
  - `test/**/blind*.test.ts`
- 推送到 `main` 分支
- 创建针对 `main` 分支的Pull Request

#### 任务配置

##### 1. 抽取功能测试 (`test-draw-functionality`)
- **运行环境**: Ubuntu Latest
- **Node.js版本**: 20.x, 22.x (矩阵策略)
- **主要步骤**:
  - 检出代码
  - 设置Node.js环境
  - 安装依赖 (`npm ci`)
  - 代码风格检查 (`npm run lint`)
  - 运行抽取功能测试
  - 生成抽取功能测试覆盖率报告
  - 构建项目
  - 上传覆盖率报告到Codecov

##### 2. 抽取功能集成测试 (`draw-integration-test`)
- **依赖**: 需要先完成 `test-draw-functionality` 任务
- **主要步骤**:
  - 启动应用
  - 运行抽取集成测试
  - 验证端到端抽取功能

##### 3. 抽取性能测试 (`draw-performance-test`)
- **依赖**: 需要先完成 `test-draw-functionality` 任务
- **主要步骤**:
  - 运行抽取性能测试
  - 验证抽取响应时间
  - 测试并发抽取能力

##### 4. 抽取随机性测试 (`draw-randomness-test`)
- **依赖**: 需要先完成 `test-draw-functionality` 任务
- **主要步骤**:
  - 运行抽取随机性测试
  - 验证抽取算法的随机性
  - 测试概率分布

## 测试文件结构

### 控制器测试
- `test/controller/draw.test.ts` - 抽取API测试

### 服务层测试
- `test/service/draw.test.ts` - 抽取服务单元测试

### 集成测试
- `test/integration/draw-integration.test.ts` - 完整抽取流程集成测试

### 性能测试
- `test/performance/draw-performance.test.ts` - 抽取性能测试

### 随机性测试
- `test/randomness/draw-randomness.test.ts` - 抽取随机性测试

## 测试覆盖范围

### 抽取功能测试
- ✅ 随机抽取功能
- ✅ 用户抽取记录管理
- ✅ 盲盒样式获取
- ✅ 抽取记录删除
- ✅ 错误处理

### 抽取服务测试
- ✅ 样式服务单元测试
- ✅ 用户抽取记录服务
- ✅ 随机抽取算法
- ✅ 边界情况处理
- ✅ 概率计算验证

### 抽取性能测试
- ✅ 响应时间测试
- ✅ 并发抽取测试
- ✅ 负载测试
- ✅ 内存使用测试
- ✅ 稳定性测试

### 抽取随机性测试
- ✅ 随机性验证
- ✅ 概率分布测试
- ✅ 时间随机性测试
- ✅ 边界随机性测试
- ✅ 随机种子测试

### 抽取集成测试
- ✅ 完整抽取流程
- ✅ 抽取到记录管理流程
- ✅ 并发请求处理
- ✅ API端点可用性
- ✅ 数据一致性测试

## 本地运行测试

### 运行所有抽取相关测试
```bash
npm test -- --testPathPattern="draw|blind"
```

### 运行抽取API测试
```bash
npm test -- --testPathPattern="draw"
```

### 运行抽取性能测试
```bash
npm test -- --testPathPattern="draw-performance"
```

### 运行抽取集成测试
```bash
npm test -- --testPathPattern="draw-integration"
```

### 运行抽取随机性测试
```bash
npm test -- --testPathPattern="draw-randomness"
```

### 生成抽取功能覆盖率报告
```bash
npm run cov -- --testPathPattern="draw|blind"
```

## 抽取功能API

### 随机抽取
```bash
GET /blind-box/draw?id=盲盒ID&user_id=用户ID
```

### 获取盲盒样式
```bash
GET /blind-box/styles?id=盲盒ID
```

### 获取用户抽取记录
```bash
GET /user-drawn-blind-boxes/?user_id=用户ID
```

### 删除抽取记录
```bash
DELETE /user-drawn-blind-boxes/记录ID
```

## 性能基准

### 响应时间要求
- 抽取API: < 300ms
- 获取用户抽取记录: < 200ms
- 获取盲盒样式: < 150ms

### 并发能力
- 支持20个并发抽取请求
- 支持混合并发请求
- 内存增长 < 5MB

### 稳定性要求
- 支持100次连续抽取
- 支持不同盲盒抽取
- 支持Unicode字符

### 随机性要求
- 抽取结果多样性验证
- 概率分布合理性
- 时间随机性保证
- 并发随机性保证

## 工作流状态检查

在GitHub仓库页面，您可以查看：

1. **Actions标签页** - 查看抽取功能工作流运行历史
2. **Pull Request** - 查看抽取功能CI检查状态
3. **Codecov** - 查看抽取功能测试覆盖率报告

## 故障排除

### 常见问题

1. **抽取测试失败**
   - 检查数据库连接
   - 验证盲盒样式数据是否正确
   - 查看测试日志获取详细错误信息

2. **性能测试失败**
   - 检查响应时间是否超时
   - 验证并发请求数量
   - 确认内存使用情况

3. **随机性测试失败**
   - 检查随机算法实现
   - 验证概率计算逻辑
   - 确认随机种子设置

4. **集成测试失败**
   - 检查应用启动状态
   - 验证API端点可用性
   - 确认测试环境配置

### 调试建议

1. 在本地运行相同的测试命令
2. 检查GitHub Actions日志
3. 验证环境变量设置
4. 确认数据库状态

## 自定义配置

### 修改抽取测试范围
在 `.github/workflows/draw-ci.yml` 中修改：
```yaml
- name: 运行抽取功能测试
  run: npm run test -- --testPathPattern="draw|blind" --verbose
```

### 添加新的抽取测试
```yaml
- name: 运行自定义抽取测试
  run: npm run test -- --testPathPattern="custom-draw"
```

### 修改性能基准
```yaml
- name: 抽取性能测试
  run: npm run test -- --testPathPattern="draw-performance" --timeout=10000
```

## 最佳实践

1. **抽取算法优化**: 确保抽取算法高效且随机
2. **概率计算**: 确保概率计算准确
3. **并发处理**: 优化并发抽取性能
4. **错误处理**: 完善抽取错误处理机制
5. **随机性监控**: 持续监控抽取随机性指标

## 抽取功能特性

### 支持的抽取类型
- 基于概率的随机抽取
- 多用户并发抽取
- 不同盲盒抽取
- 抽取记录管理

### 抽取结果处理
- 样式信息返回
- 用户记录保存
- 抽取历史查询
- 记录删除功能

### 安全特性
- 输入验证
- 错误信息安全处理
- 并发安全保证
- 数据一致性保证

### 随机性保证
- 基于概率的随机算法
- 时间随机性
- 用户独立性
- 并发随机性

## 联系支持

如果遇到抽取功能CI/CD相关问题，请：
1. 检查GitHub Actions日志
2. 查看抽取功能文档
3. 提交Issue描述问题
4. 提供测试用例和错误信息 