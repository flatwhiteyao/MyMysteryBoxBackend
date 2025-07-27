# GitHub Actions CI/CD 工作流说明

## 概述

本项目配置了专门针对登录注册功能的GitHub Actions CI/CD工作流，确保代码质量和功能稳定性。

## 工作流文件

### `.github/workflows/nodejs-ci.yml`

这是主要的CI/CD工作流文件，包含以下功能：

#### 触发条件
- 推送到 `main` 分支
- 创建针对 `main` 分支的Pull Request

#### 任务配置

##### 1. 登录注册功能测试 (`test-login-register`)
- **运行环境**: Ubuntu Latest
- **Node.js版本**: 20.x, 22.x (矩阵策略)
- **主要步骤**:
  - 检出代码
  - 设置Node.js环境
  - 安装依赖 (`npm ci`)
  - 代码风格检查 (`npm run lint`)
  - 运行登录注册功能测试
  - 生成测试覆盖率报告
  - 构建项目
  - 上传覆盖率报告到Codecov

##### 2. 集成测试 (`integration-test`)
- **依赖**: 需要先完成 `test-login-register` 任务
- **主要步骤**:
  - 启动应用
  - 运行集成测试
  - 验证端到端功能

## 测试文件结构

### 控制器测试
- `test/controller/user.test.ts` - 用户登录注册API测试

### 服务层测试
- `test/service/user.test.ts` - 用户服务单元测试

### 集成测试
- `test/integration/user-integration.test.ts` - 完整流程集成测试

## 测试覆盖范围

### 用户注册功能
- ✅ 成功注册新用户
- ✅ 密码不匹配验证
- ✅ 重复手机号检测
- ✅ 必填字段验证

### 用户登录功能
- ✅ 正确凭据登录
- ✅ 错误手机号拒绝
- ✅ 错误密码拒绝
- ✅ 登录状态验证

### 用户信息获取
- ✅ 获取用户信息
- ✅ 处理不存在的用户ID

## 本地运行测试

### 运行所有测试
```bash
npm test
```

### 运行登录注册相关测试
```bash
npm test -- --testPathPattern="user|login|register"
```

### 生成覆盖率报告
```bash
npm run cov
```

### 代码风格检查
```bash
npm run lint
```

## 工作流状态检查

在GitHub仓库页面，您可以查看：

1. **Actions标签页** - 查看所有工作流运行历史
2. **Pull Request** - 查看CI检查状态
3. **Codecov** - 查看测试覆盖率报告

## 故障排除

### 常见问题

1. **测试失败**
   - 检查数据库连接
   - 验证测试数据是否正确
   - 查看测试日志获取详细错误信息

2. **构建失败**
   - 检查TypeScript编译错误
   - 验证依赖安装是否成功
   - 确认Node.js版本兼容性

3. **覆盖率报告问题**
   - 确保测试文件命名正确
   - 检查Jest配置是否正确
   - 验证Codecov集成设置

### 调试建议

1. 在本地运行相同的测试命令
2. 检查GitHub Actions日志
3. 验证环境变量设置
4. 确认数据库状态

## 自定义配置

### 修改测试范围
在 `.github/workflows/nodejs-ci.yml` 中修改：
```yaml
- name: 运行登录注册功能测试
  run: npm run test -- --testPathPattern="user|login|register" --verbose
```

### 添加新的Node.js版本
```yaml
strategy:
  matrix:
    node-version: [18.x, 20.x, 22.x]
```

### 修改触发条件
```yaml
on:
  push:
    branches: [ "main", "develop" ]
  pull_request:
    branches: [ "main" ]
```

## 最佳实践

1. **提交前本地测试**: 在推送代码前先在本地运行测试
2. **小批量提交**: 避免大量更改导致测试复杂化
3. **测试覆盖率**: 保持高测试覆盖率，特别是核心功能
4. **及时修复**: 快速修复失败的测试，避免积累技术债务

## 联系支持

如果遇到CI/CD相关问题，请：
1. 检查GitHub Actions日志
2. 查看项目文档
3. 提交Issue描述问题 