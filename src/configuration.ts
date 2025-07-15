// src_backend/configuration.ts
import { Configuration, App } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import * as crossDomain from '@midwayjs/cross-domain';
import { join } from 'path';
import { ReportMiddleware } from './middleware/report.middleware';
import createUserTable from './migration/createUserTable';
import createBlindBoxTable from './migration/createBlindBoxTable';

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
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {
  @App('koa')
  app: koa.Application;

  async onReady() {
    // 执行数据库迁移
    await createUserTable();
    await createBlindBoxTable();
    // add middleware
    this.app.useMiddleware([ReportMiddleware]);
    // add filter
    // this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);
  }
}