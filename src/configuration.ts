// src_backend/configuration.ts
import { Configuration, App } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import * as crossDomain from '@midwayjs/cross-domain';
import * as serveStatic from 'koa-static';
import { join } from 'path';
import { ReportMiddleware } from './middleware/report.middleware';
import createUserTable from './migration/createUserTable';
import createBlindBoxTable from './migration/createBlindBoxTable';
import createBlindBoxStyleTable from './migration/createBlindBoxStyleTable';
import createUserDrawnBlindBoxTable from './migration/createUserDrawnBlindBoxTable';
import createPlayerShowTable from './migration/createPlayerShowTable';

@Configuration({
  imports: [
    koa,
    validate,
    crossDomain,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')]
})
export class MainConfiguration {
  @App('koa')
  app: koa.Application;

  async onReady() {
    // 执行数据库迁移
    await createUserTable();
    await createBlindBoxTable();
    await createBlindBoxStyleTable();
    await createUserDrawnBlindBoxTable();
    await createPlayerShowTable();

    // 注册中间件
    this.app.useMiddleware([ReportMiddleware]);

    // 配置静态文件服务 (使用 koa-static)
    this.app.use(serveStatic(join(__dirname, './public')));
    
    // 处理 SPA 路由 - 对于不存在的路由，返回 index.html
    this.app.use(async (ctx, next) => {
      await next();
      if (ctx.status === 404 && !ctx.path.startsWith('/api')) {
        try {
          ctx.type = 'html';
          ctx.body = require('fs').readFileSync(join(__dirname, './public/index.html'), 'utf8');
        } catch (error) {
          ctx.logger.error('Failed to serve index.html:', error);
          ctx.status = 404;
        }
      }
    });
  }
}
