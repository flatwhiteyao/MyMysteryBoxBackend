# 搜索功能 CI/CD 工作流说明

## 概述

本项目配置了专门针对搜索功能的GitHub Actions CI/CD工作流，确保盲盒搜索功能的稳定性、性能和可靠性。

## 工作流文件

### `.github/workflows/search-ci.yml`

这是专门针对搜索功能的CI/CD工作流文件，包含以下特性：

#### 触发条件
- **路径触发**: 只有当搜索相关文件发生变化时才触发
  - `src/controller/blindBox.controller.ts`
  - `src/service/blindBox.service.ts`
  - `src/service/blindBoxStyle.service.ts`
  - `test/**/search*.test.ts`
  - `test/**/blind*.test.ts`
- 推送到 `main` 分支
- 创建针对 `main` 分支的Pull Request

#### 任务配置

##### 1. 搜索功能测试 (`test-search-functionality`)
- **运行环境**: Ubuntu Latest
- **Node.js版本**: 20.x, 22.x (矩阵策略)
- **主要步骤**:
  - 检出代码
  - 设置Node.js环境
  - 安装依赖 (`npm ci`)
  - 代码风格检查 (`npm run lint`)
  - 运行搜索功能测试
  - 生成搜索功能测试覆盖率报告
  - 构建项目
  - 上传覆盖率报告到Codecov

##### 2. 搜索功能集成测试 (`search-integration-test`)
- **依赖**: 需要先完成 `test-search-functionality` 任务
- **主要步骤**:
  - 启动应用
  - 运行搜索集成测试
  - 验证端到端搜索功能

##### 3. 搜索性能测试 (`search-performance-test`)
- **依赖**: 需要先完成 `test-search-functionality` 任务
- **主要步骤**:
  - 运行搜索性能测试
  - 验证搜索响应时间
  - 测试并发搜索能力

## 测试文件结构

### 控制器测试
- `test/controller/search.test.ts` - 搜索API测试

### 服务层测试
- `test/service/search.test.ts` - 搜索服务单元测试

### 集成测试
- `test/integration/search-integration.test.ts` - 完整搜索流程集成测试

### 性能测试
- `test/performance/search-performance.test.ts` - 搜索性能测试

## 测试覆盖范围

### 搜索功能测试
- ✅ 关键词搜索
- ✅ 空关键词处理
- ✅ 不存在的关键词处理
- ✅ 特殊字符搜索
- ✅ 中英文混合搜索
- ✅ 获取所有盲盒
- ✅ 获取盲盒样式
- ✅ 错误处理

### 搜索服务测试
- ✅ 搜索服务单元测试
- ✅ 样式服务单元测试
- ✅ 随机抽取功能
- ✅ 边界情况处理
- ✅ SQL注入防护
- ✅ Unicode字符支持

### 搜索性能测试
- ✅ 响应时间测试
- ✅ 并发搜索测试
- ✅ 负载测试
- ✅ 内存使用测试
- ✅ 稳定性测试

### 搜索集成测试
- ✅ 完整搜索流程
- ✅ 搜索到样式获取流程
- ✅ 搜索到随机抽取流程
- ✅ 并发请求处理
- ✅ API端点可用性

## 本地运行测试

### 运行所有搜索相关测试
```bash
npm test -- --testPathPattern="search|blind"
```

### 运行搜索API测试
```bash
npm test -- --testPathPattern="search"
```

### 运行搜索性能测试
```bash
npm test -- --testPathPattern="search-performance"
```

### 运行搜索集成测试
```bash
npm test -- --testPathPattern="search-integration"
```

### 生成搜索功能覆盖率报告
```bash
npm run cov -- --testPathPattern="search|blind"
```

## 搜索功能API

### 搜索盲盒
```bash
GET /blind-box/search?keyword=关键词
```

### 获取所有盲盒
```bash
GET /blind-box/
```

### 获取盲盒样式
```bash
GET /blind-box/styles?id=盲盒ID
```

### 随机抽取
```bash
GET /blind-box/draw?id=盲盒ID&user_id=用户ID
```

## 性能基准

### 响应时间要求
- 搜索API: < 500ms
- 获取所有盲盒: < 300ms
- 获取样式: < 200ms

### 并发能力
- 支持10个并发搜索请求
- 支持混合并发请求
- 内存增长 < 10MB

### 稳定性要求
- 支持100次连续搜索
- 支持不同长度关键词
- 支持Unicode字符

## 工作流状态检查

在GitHub仓库页面，您可以查看：

1. **Actions标签页** - 查看搜索功能工作流运行历史
2. **Pull Request** - 查看搜索功能CI检查状态
3. **Codecov** - 查看搜索功能测试覆盖率报告

## 故障排除

### 常见问题

1. **搜索测试失败**
   - 检查数据库连接
   - 验证测试数据是否正确
   - 查看测试日志获取详细错误信息

2. **性能测试失败**
   - 检查响应时间是否超时
   - 验证并发请求数量
   - 确认内存使用情况

3. **集成测试失败**
   - 检查应用启动状态
   - 验证API端点可用性
   - 确认测试环境配置

### 调试建议

1. 在本地运行相同的测试命令
2. 检查GitHub Actions日志
3. 验证环境变量设置
4. 确认数据库状态

## 自定义配置

### 修改搜索测试范围
在 `.github/workflows/search-ci.yml` 中修改：
```yaml
- name: 运行搜索功能测试
  run: npm run test -- --testPathPattern="search|blind" --verbose
```

### 添加新的搜索测试
```yaml
- name: 运行自定义搜索测试
  run: npm run test -- --testPathPattern="custom-search"
```

### 修改性能基准
```yaml
- name: 搜索性能测试
  run: npm run test -- --testPathPattern="search-performance" --timeout=10000
```

## 最佳实践

1. **搜索优化**: 确保搜索功能高效且准确
2. **缓存策略**: 考虑对热门搜索进行缓存
3. **索引优化**: 确保数据库索引合理
4. **错误处理**: 完善搜索错误处理机制
5. **性能监控**: 持续监控搜索性能指标

## 搜索功能特性

### 支持的搜索类型
- 模糊搜索（名称和描述）
- 空关键词搜索（返回所有）
- 特殊字符搜索
- 中英文混合搜索
- Unicode字符搜索

### 搜索结果排序
- 按ID降序排列（最新的在前）
- 支持分页（如需要）

### 安全特性
- SQL注入防护
- 输入验证
- 错误信息安全处理

## 联系支持

如果遇到搜索功能CI/CD相关问题，请：
1. 检查GitHub Actions日志
2. 查看搜索功能文档
3. 提交Issue描述问题
4. 提供测试用例和错误信息 