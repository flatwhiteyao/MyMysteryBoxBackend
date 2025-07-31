"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainConfiguration = void 0;
// src_backend/configuration.ts
const core_1 = require("@midwayjs/core");
const koa = require("@midwayjs/koa");
const validate = require("@midwayjs/validate");
const info = require("@midwayjs/info");
const crossDomain = require("@midwayjs/cross-domain");
const serveStatic = require("koa-static");
const path_1 = require("path");
const report_middleware_1 = require("./middleware/report.middleware");
const createUserTable_1 = require("./migration/createUserTable");
const createBlindBoxTable_1 = require("./migration/createBlindBoxTable");
const createBlindBoxStyleTable_1 = require("./migration/createBlindBoxStyleTable");
const createUserDrawnBlindBoxTable_1 = require("./migration/createUserDrawnBlindBoxTable");
const createPlayerShowTable_1 = require("./migration/createPlayerShowTable");
let MainConfiguration = class MainConfiguration {
    async onReady() {
        // 执行数据库迁移
        await (0, createUserTable_1.default)();
        await (0, createBlindBoxTable_1.default)();
        await (0, createBlindBoxStyleTable_1.default)();
        await (0, createUserDrawnBlindBoxTable_1.default)();
        await (0, createPlayerShowTable_1.default)();
        // 注册中间件
        this.app.useMiddleware([report_middleware_1.ReportMiddleware]);
        // 配置静态文件服务 (使用 koa-static)
        this.app.use(serveStatic((0, path_1.join)(__dirname, './public')));
        // 处理 SPA 路由 - 对于不存在的路由，返回 index.html
        this.app.use(async (ctx, next) => {
            await next();
            if (ctx.status === 404 && !ctx.path.startsWith('/api')) {
                try {
                    ctx.type = 'html';
                    ctx.body = require('fs').readFileSync((0, path_1.join)(__dirname, './public/index.html'), 'utf8');
                }
                catch (error) {
                    ctx.logger.error('Failed to serve index.html:', error);
                    ctx.status = 404;
                }
            }
        });
    }
};
__decorate([
    (0, core_1.App)('koa'),
    __metadata("design:type", Object)
], MainConfiguration.prototype, "app", void 0);
MainConfiguration = __decorate([
    (0, core_1.Configuration)({
        imports: [
            koa,
            validate,
            crossDomain,
            {
                component: info,
                enabledEnvironment: ['local'],
            },
        ],
        importConfigs: [(0, path_1.join)(__dirname, './config')]
    })
], MainConfiguration);
exports.MainConfiguration = MainConfiguration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb25maWd1cmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLCtCQUErQjtBQUMvQix5Q0FBb0Q7QUFDcEQscUNBQXFDO0FBQ3JDLCtDQUErQztBQUMvQyx1Q0FBdUM7QUFDdkMsc0RBQXNEO0FBQ3RELDBDQUEwQztBQUMxQywrQkFBNEI7QUFDNUIsc0VBQWtFO0FBQ2xFLGlFQUEwRDtBQUMxRCx5RUFBa0U7QUFDbEUsbUZBQTRFO0FBQzVFLDJGQUFvRjtBQUNwRiw2RUFBc0U7QUFjL0QsSUFBTSxpQkFBaUIsR0FBdkIsTUFBTSxpQkFBaUI7SUFJNUIsS0FBSyxDQUFDLE9BQU87UUFDWCxVQUFVO1FBQ1YsTUFBTSxJQUFBLHlCQUFlLEdBQUUsQ0FBQztRQUN4QixNQUFNLElBQUEsNkJBQW1CLEdBQUUsQ0FBQztRQUM1QixNQUFNLElBQUEsa0NBQXdCLEdBQUUsQ0FBQztRQUNqQyxNQUFNLElBQUEsc0NBQTRCLEdBQUUsQ0FBQztRQUNyQyxNQUFNLElBQUEsK0JBQXFCLEdBQUUsQ0FBQztRQUU5QixRQUFRO1FBQ1IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxvQ0FBZ0IsQ0FBQyxDQUFDLENBQUM7UUFFM0MsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFBLFdBQUksRUFBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXZELHFDQUFxQztRQUNyQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO1lBQy9CLE1BQU0sSUFBSSxFQUFFLENBQUM7WUFDYixJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ3RELElBQUk7b0JBQ0YsR0FBRyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7b0JBQ2xCLEdBQUcsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQyxJQUFBLFdBQUksRUFBQyxTQUFTLEVBQUUscUJBQXFCLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztpQkFDdkY7Z0JBQUMsT0FBTyxLQUFLLEVBQUU7b0JBQ2QsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsNkJBQTZCLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQ3ZELEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO2lCQUNsQjthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0YsQ0FBQTtBQS9CQztJQUFDLElBQUEsVUFBRyxFQUFDLEtBQUssQ0FBQzs7OENBQ1U7QUFGVixpQkFBaUI7SUFaN0IsSUFBQSxvQkFBYSxFQUFDO1FBQ2IsT0FBTyxFQUFFO1lBQ1AsR0FBRztZQUNILFFBQVE7WUFDUixXQUFXO1lBQ1g7Z0JBQ0UsU0FBUyxFQUFFLElBQUk7Z0JBQ2Ysa0JBQWtCLEVBQUUsQ0FBQyxPQUFPLENBQUM7YUFDOUI7U0FDRjtRQUNELGFBQWEsRUFBRSxDQUFDLElBQUEsV0FBSSxFQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztLQUM3QyxDQUFDO0dBQ1csaUJBQWlCLENBZ0M3QjtBQWhDWSw4Q0FBaUIifQ==