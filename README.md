# MyMysteryBoxBackend

一个基于 Midway.js 框架开发的盲盒抽取系统后端服务，提供用户管理、盲盒管理、支付集成等功能。

## 📋 项目概述

MyMysteryBoxBackend 是一个现代化的盲盒抽取平台后端服务，采用 TypeScript + Midway.js + SQLite 技术栈构建。系统支持用户注册登录、盲盒管理、随机抽盲盒、支付集成等核心功能。

## ✨ 主要功能

### 🎯 核心功能
- **用户管理系统** - 用户注册、登录、信息更新
- **盲盒管理** - 盲盒的增删改查、搜索功能
- **随机抽盲盒** - 基于权重的随机抽盲盒算法
- **支付集成** - 支付宝支付接口集成
- **文件上传** - 支持图片上传和管理
- **玩家展示** - 用户抽取结果展示功能

### 🔧 技术特性
- **TypeScript** - 完整的类型支持
- **Midway.js** - 企业级 Node.js 框架
- **SQLite** - 轻量级数据库
- **Jest** - 单元测试和集成测试
- **Swagger** - API 文档自动生成
- **跨域支持** - 完整的 CORS 配置

## 🚀 快速开始

### 环境要求

- Node.js >= 12.0.0
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 开发环境运行

```bash
npm run dev
```

### 生产环境构建

```bash
npm run build
npm start
```

### 测试

```bash
npm test
npm run cov  # 生成测试覆盖率报告
```

## 📁 项目结构

```
MyMysteryBoxBackend/
├── src/
│   ├── config/                 # 配置文件
│   │   ├── alipay.config.ts   # 支付宝配置
│   │   ├── config.default.ts  # 默认配置
│   │   └── config.unittest.ts # 测试配置
│   ├── controller/            # 控制器层
│   │   ├── api.controller.ts      # 通用API接口
│   │   ├── alipay.controller.ts   # 支付宝支付接口
│   │   ├── blindBox.controller.ts # 盲盒管理接口
│   │   ├── home.controller.ts     # 首页接口
│   │   ├── playerShow.controller.ts # 玩家展示接口
│   │   ├── playerShowUpload.controller.ts # 文件上传接口
│   │   ├── user.controller.ts     # 用户管理接口
│   │   └── userDrawnBlindBox.controller.ts # 用户抽盲盒记录接口
│   ├── service/              # 服务层
│   │   ├── alipay.service.ts      # 支付宝服务
│   │   ├── blindBox.service.ts    # 盲盒服务
│   │   ├── blindBoxStyle.service.ts # 盲盒样式服务
│   │   ├── playerShow.service.ts  # 玩家展示服务
│   │   ├── user.service.ts        # 用户服务
│   │   └── userDrawnBlindBox.service.ts # 用户抽取记录服务
│   ├── database/             # 数据库
│   │   └── sqlite.ts         # SQLite 数据库配置
│   ├── entity/               # 实体类
│   │   └── user.entity.ts    # 用户实体
│   ├── migration/            # 数据库迁移
│   │   ├── createUserTable.ts
│   │   ├── createBlindBoxTable.ts
│   │   ├── createBlindBoxStyleTable.ts
│   │   ├── createUserDrawnBlindBoxTable.ts
│   │   └── createPlayerShowTable.ts
│   ├── middleware/           # 中间件
│   │   └── report.middleware.ts
│   ├── filter/              # 过滤器
│   │   ├── default.filter.ts
│   │   └── notfound.filter.ts
│   └── configuration.ts     # 应用配置
├── test/                   # 测试文件
│   ├── controller/         # 控制器测试
│   ├── service/           # 服务层测试
│   ├── integration/       # 集成测试
│   ├── performance/       # 性能测试
│   └── randomness/        # 随机性测试
├── public/                # 静态文件
│   ├── js/               # JavaScript 文件
│   └── uploads/          # 上传文件目录
├── logs/                 # 日志文件
├── database.db           # SQLite 数据库文件
└── package.json          # 项目依赖配置
```

## 🔌 API 接口文档

### 用户管理接口

#### 用户注册
```
POST /user/register
Content-Type: application/json

{
  "nickname": "用户昵称",
  "name": "真实姓名",
  "phone": "手机号",
  "email": "邮箱",
  "password": "密码",
  "confirmPassword": "确认密码",
  "role": "用户角色"
}
```

#### 用户登录
```
POST /user/login
Content-Type: application/json

{
  "phone": "手机号",
  "password": "密码"
}
```

#### 用户信息更新
```
POST /user/update
Content-Type: application/json

{
  "id": 用户ID,
  "nickname": "新昵称",
  "name": "新姓名",
  "phone": "新手机号",
  "email": "新邮箱",
  "password": "新密码"
}
```

### 盲盒管理接口

#### 获取所有盲盒
```
GET /blind-box/
```

#### 搜索盲盒
```
GET /blind-box/search?keyword=关键词
```

#### 添加盲盒
```
POST /blind-box/
Content-Type: multipart/form-data

{
  "name": "盲盒名称",
  "description": "盲盒描述",
  "price": 价格,
  "photo": 图片文件
}
```

#### 删除盲盒
```
DELETE /blind-box/?id=盲盒ID
```

#### 更新盲盒
```
PUT /blind-box/
Content-Type: multipart/form-data

{
  "id": 盲盒ID,
  "name": "新名称",
  "description": "新描述",
  "price": 新价格,
  "photo": 新图片文件
}
```

#### 随机抽取
```
GET /blind-box/random-draw?id=盲盒ID&user_id=用户ID
```

### 支付宝支付接口

#### 创建支付订单
```
GET /alipay/createOrder?outTradeNo=订单号&totalAmount=金额&subject=商品标题
```

### 玩家展示接口

#### 获取玩家展示列表
```
GET /player-show/
```

#### 添加玩家展示
```
POST /player-show/
Content-Type: multipart/form-data

{
  "title": "展示标题",
  "description": "展示描述",
  "photo": 图片文件,
  "user_id": 用户ID
}
```

## 🗄️ 数据库设计

### 用户表 (users)
- `id` - 主键
- `nickname` - 用户昵称
- `name` - 真实姓名
- `phone` - 手机号
- `email` - 邮箱
- `password` - 密码
- `role` - 用户角色
- `created_at` - 创建时间
- `updated_at` - 更新时间

### 盲盒表 (blind_boxes)
- `id` - 主键
- `name` - 盲盒名称
- `description` - 盲盒描述
- `price` - 价格
- `photo` - 图片路径
- `created_at` - 创建时间
- `updated_at` - 更新时间

### 盲盒样式表 (blind_box_styles)
- `id` - 主键
- `blind_box_id` - 盲盒ID
- `name` - 样式名称
- `description` - 样式描述
- `photo` - 样式图片
- `weight` - 权重
- `created_at` - 创建时间

### 用户抽盲盒记录表 (user_drawn_blind_boxes)
- `id` - 主键
- `user_id` - 用户ID
- `blind_box_id` - 盲盒ID
- `blind_box_style_id` - 抽中的样式ID
- `drawn_at` - 抽取时间

### 玩家展示表 (player_shows)
- `id` - 主键
- `title` - 展示标题
- `description` - 展示描述
- `photo` - 展示图片
- `user_id` - 用户ID
- `created_at` - 创建时间

## 🧪 测试

项目包含完整的测试套件：

### 运行所有测试
```bash
npm test
```

### 运行特定测试
```bash
# 控制器测试
npm test test/controller/

# 服务层测试
npm test test/service/

# 集成测试
npm test test/integration/

# 性能测试
npm test test/performance/

# 随机性测试
npm test test/randomness/
```

### 生成测试覆盖率报告
```bash
npm run cov
```

## 🔧 开发指南

### 代码规范
```bash
# 检查代码规范
npm run lint

# 自动修复代码规范问题
npm run lint:fix
```

### 构建项目
```bash
# 开发构建
npm run build

# 生产打包
npm run bundle
```

### 数据库迁移
数据库表会在应用启动时自动创建，迁移文件位于 `src/migration/` 目录。

## 📦 部署

### 本地部署
```bash
npm run build
npm start
```

### 生产环境部署
```bash
npm run bundle
npm run bundle_start
```

## 🔐 环境配置

### 支付宝配置
在 `src/config/alipay.config.ts` 中配置支付宝相关参数：

```typescript
export const alipayConfig = {
  appId: 'your_app_id',
  privateKey: 'your_private_key',
  publicKey: 'alipay_public_key',
  gateway: 'https://openapi.alipay.com/gateway.do'
};
```

### 数据库配置
默认使用 SQLite 数据库，数据库文件位于项目根目录的 `database.db`。

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 项目 Issues: [GitHub Issues](https://github.com/your-repo/issues)
- 邮箱: your-email@example.com

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者和用户！

---

**注意**: 这是一个开发中的项目，API 接口可能会发生变化。请关注项目更新日志。 