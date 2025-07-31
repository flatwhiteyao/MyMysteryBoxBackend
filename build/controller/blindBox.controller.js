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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlindBoxController = void 0;
// src_backend/controller/blindBox.controller.ts
const core_1 = require("@midwayjs/core");
const blindBox_service_1 = require("../service/blindBox.service");
const blindBoxStyle_service_1 = require("../service/blindBoxStyle.service");
const userDrawnBlindBox_service_1 = require("../service/userDrawnBlindBox.service");
const formidable_1 = require("formidable");
const path = require("path");
const fs = require("fs");
const util_1 = require("util");
const copyFile = (0, util_1.promisify)(fs.copyFile);
const unlink = (0, util_1.promisify)(fs.unlink);
let BlindBoxController = class BlindBoxController {
    async getAllBlindBoxes() {
        const blindBoxes = await this.blindBoxService.getAllBlindBoxes();
        console.log('返回的盲盒数据:', blindBoxes);
        return { success: true, blindBoxes };
    }
    async searchBlindBoxes(keyword) {
        try {
            if (!keyword || keyword.trim() === '') {
                // 如果关键词为空，返回所有盲盒
                const blindBoxes = await this.blindBoxService.getAllBlindBoxes();
                return { success: true, blindBoxes, message: '显示所有盲盒' };
            }
            const searchKeyword = keyword.trim();
            const blindBoxes = await this.blindBoxService.searchBlindBoxes(searchKeyword);
            console.log(`搜索关键词"${searchKeyword}"的结果:`, blindBoxes);
            return {
                success: true,
                blindBoxes,
                keyword: searchKeyword,
                count: blindBoxes.length,
                message: blindBoxes.length > 0
                    ? `找到 ${blindBoxes.length} 个匹配的盲盒`
                    : '未找到匹配的盲盒',
            };
        }
        catch (error) {
            console.error('搜索盲盒错误:', error);
            return { success: false, message: '搜索失败，请重试' };
        }
    }
    async addBlindBox(ctx) {
        var _a, _b, _c, _d, _e;
        try {
            const form = (0, formidable_1.default)({ multiples: true });
            const { fields, files } = await new Promise((resolve, reject) => {
                form.parse(ctx.req, (err, fields, files) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve({ fields, files });
                    }
                });
            });
            // 提取并处理字段，确保类型正确
            const name = ((_a = fields.name) === null || _a === void 0 ? void 0 : _a.toString().trim()) || '';
            const description = ((_b = fields.description) === null || _b === void 0 ? void 0 : _b.toString().trim()) || '';
            const price = parseFloat(((_c = fields.price) === null || _c === void 0 ? void 0 : _c.toString()) || '0');
            // 验证必填字段
            if (!name || isNaN(price) || price <= 0) {
                return (ctx.body = { success: false, message: '名称和价格不能为空' });
            }
            let photoPath = '';
            // 更健壮地检查文件上传
            const photoFiles = Array.isArray(files.photo)
                ? files.photo
                : [files.photo];
            const photoFile = photoFiles.find(file => file && file.size > 0);
            if (photoFile) {
                // 检查文件扩展名是否存在
                const fileExt = photoFile.originalFilename
                    ? path.extname(photoFile.originalFilename)
                    : '';
                // 如果没有扩展名，使用通用扩展名
                const safeExt = fileExt || '.jpg';
                // 生成唯一文件名
                const fileName = `${Date.now()}${safeExt}`;
                const publicDir = path.join(__dirname, '../../public/uploads');
                const filePath = path.join(publicDir, fileName);
                // 确保目录存在
                if (!fs.existsSync(publicDir)) {
                    fs.mkdirSync(publicDir, { recursive: true });
                }
                // 复制文件并删除临时文件
                await copyFile(photoFile.filepath, filePath);
                await unlink(photoFile.filepath);
                photoPath = `uploads/${fileName}`;
            }
            else {
                return (ctx.body = { success: false, message: '请上传盲盒照片' });
            }
            const id = await this.blindBoxService.addBlindBox(name, description, price, photoPath);
            // 处理盲盒款式信息
            const styleNames = Array.isArray(fields.styleName)
                ? fields.styleName
                : [fields.styleName];
            const styleProbabilities = Array.isArray(fields.styleProbability)
                ? fields.styleProbability
                : [fields.styleProbability];
            const stylePhotos = Array.isArray(files.stylePhoto)
                ? files.stylePhoto
                : [files.stylePhoto];
            const styles = [];
            for (let i = 0; i < styleNames.length; i++) {
                const styleName = ((_d = styleNames[i]) === null || _d === void 0 ? void 0 : _d.toString().trim()) || '';
                const styleProbability = parseFloat(((_e = styleProbabilities[i]) === null || _e === void 0 ? void 0 : _e.toString()) || '0');
                const stylePhotoFile = stylePhotos[i];
                if (styleName &&
                    !isNaN(styleProbability) &&
                    styleProbability > 0 &&
                    stylePhotoFile) {
                    const fileExt = path.extname(stylePhotoFile.originalFilename);
                    const fileName = `${Date.now()}_style_${i}${fileExt}`;
                    const publicDir = path.join(__dirname, '../../public/uploads');
                    const filePath = path.join(publicDir, fileName);
                    if (!fs.existsSync(publicDir)) {
                        fs.mkdirSync(publicDir, { recursive: true });
                    }
                    await copyFile(stylePhotoFile.filepath, filePath);
                    await unlink(stylePhotoFile.filepath);
                    const stylePhotoPath = `uploads/${fileName}`;
                    styles.push({
                        name: styleName,
                        photo: stylePhotoPath,
                        probability: styleProbability,
                    });
                }
            }
            if (styles.length > 0) {
                await this.blindBoxStyleService.addBlindBoxStyles(id, styles);
            }
            ctx.body = { success: true, id };
        }
        catch (error) {
            console.error('添加盲盒错误:', error);
            ctx.body = { success: false, message: '添加盲盒失败，请重试' };
        }
    }
    async deleteBlindBox(id, ctx) {
        try {
            // 获取盲盒信息以删除关联的照片
            const db = await (await Promise.resolve().then(() => require('../database/sqlite'))).default;
            const blindBox = await db.get('SELECT photo FROM blind_boxes WHERE id =?', [id]);
            // 删除物理文件
            if (blindBox && blindBox.photo) {
                const filePath = path.join(__dirname, '../../public', blindBox.photo);
                if (fs.existsSync(filePath)) {
                    await unlink(filePath);
                }
            }
            await this.blindBoxService.deleteBlindBox(id);
            // 设置HTTP状态码为200，并返回标准成功响应
            ctx.status = 200;
            return { success: true, message: '删除成功' };
        }
        catch (error) {
            console.error('删除盲盒错误:', error);
            ctx.status = 500; // 明确设置错误状态码
            return { success: false, message: '删除盲盒失败，请重试' };
        }
    }
    async updateBlindBox(ctx) {
        var _a, _b, _c, _d;
        try {
            const form = (0, formidable_1.default)({ multiples: false });
            const { fields, files } = await new Promise((resolve, reject) => {
                form.parse(ctx.req, (err, fields, files) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve({ fields, files });
                    }
                });
            });
            // 提取并处理字段，确保类型正确
            const id = parseInt(((_a = fields.id) === null || _a === void 0 ? void 0 : _a.toString()) || '0');
            const name = ((_b = fields.name) === null || _b === void 0 ? void 0 : _b.toString().trim()) || '';
            const description = ((_c = fields.description) === null || _c === void 0 ? void 0 : _c.toString().trim()) || '';
            const price = parseFloat(((_d = fields.price) === null || _d === void 0 ? void 0 : _d.toString()) || '0');
            // 验证必填字段
            if (!id || !name || isNaN(price) || price <= 0) {
                return (ctx.body = {
                    success: false,
                    message: 'ID、名称和价格不能为空',
                });
            }
            let photoPath = '';
            // 处理上传的新照片
            if (files.photo && files.photo.originalFilename) {
                // 获取现有照片信息
                const db = await (await Promise.resolve().then(() => require('../database/sqlite'))).default;
                const blindBox = await db.get('SELECT photo FROM blind_boxes WHERE id =?', [id]);
                // 删除现有照片
                if (blindBox && blindBox.photo) {
                    const oldFilePath = path.join(__dirname, '../../public', blindBox.photo);
                    if (fs.existsSync(oldFilePath)) {
                        await unlink(oldFilePath);
                    }
                }
                // 处理新上传的照片
                const file = files.photo;
                const fileExt = path.extname(file.originalFilename);
                const fileName = `${Date.now()}${fileExt}`;
                const publicDir = path.join(__dirname, '../../public/uploads');
                const filePath = path.join(publicDir, fileName);
                // 确保目录存在
                if (!fs.existsSync(publicDir)) {
                    fs.mkdirSync(publicDir, { recursive: true });
                }
                // 复制文件并删除临时文件
                await copyFile(file.filepath, filePath);
                await unlink(file.filepath);
                photoPath = `uploads/${fileName}`;
            }
            await this.blindBoxService.updateBlindBox(id, name, description, price, photoPath);
            ctx.body = { success: true };
        }
        catch (error) {
            console.error('更新盲盒错误:', error);
            ctx.body = { success: false, message: '更新盲盒失败，请重试' };
        }
    }
    async getBlindBoxStyles(id) {
        const styles = await this.blindBoxStyleService.getBlindBoxStyles(id);
        return { success: true, styles };
    }
    async randomDraw(id, user_id) {
        // 新增 user_id 参数
        const result = await this.blindBoxStyleService.randomDraw(id);
        if (result) {
            await this.userDrawnBlindBoxService.addUserDrawnBlindBox(user_id, id, result.id); // 记录抽中信息
            return { success: true, style: result };
        }
        else {
            return { success: false, message: '抽取失败' };
        }
    }
};
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", blindBox_service_1.BlindBoxService)
], BlindBoxController.prototype, "blindBoxService", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", blindBoxStyle_service_1.BlindBoxStyleService)
], BlindBoxController.prototype, "blindBoxStyleService", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", userDrawnBlindBox_service_1.UserDrawnBlindBoxService)
], BlindBoxController.prototype, "userDrawnBlindBoxService", void 0);
__decorate([
    (0, core_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlindBoxController.prototype, "getAllBlindBoxes", null);
__decorate([
    (0, core_1.Get)('/search'),
    __param(0, (0, core_1.Query)('keyword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlindBoxController.prototype, "searchBlindBoxes", null);
__decorate([
    (0, core_1.Post)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlindBoxController.prototype, "addBlindBox", null);
__decorate([
    (0, core_1.Del)('/'),
    __param(0, (0, core_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], BlindBoxController.prototype, "deleteBlindBox", null);
__decorate([
    (0, core_1.Put)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlindBoxController.prototype, "updateBlindBox", null);
__decorate([
    (0, core_1.Get)('/styles'),
    __param(0, (0, core_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BlindBoxController.prototype, "getBlindBoxStyles", null);
__decorate([
    (0, core_1.Get)('/draw'),
    __param(0, (0, core_1.Query)('id')),
    __param(1, (0, core_1.Query)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], BlindBoxController.prototype, "randomDraw", null);
BlindBoxController = __decorate([
    (0, core_1.Controller)('/blind-box')
], BlindBoxController);
exports.BlindBoxController = BlindBoxController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxpbmRCb3guY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVyL2JsaW5kQm94LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQWdEO0FBQ2hELHlDQUFnRjtBQUNoRixrRUFBOEQ7QUFDOUQsNEVBQXdFO0FBQ3hFLG9GQUFnRjtBQUVoRiwyQ0FBb0M7QUFDcEMsNkJBQTZCO0FBQzdCLHlCQUF5QjtBQUN6QiwrQkFBaUM7QUFFakMsTUFBTSxRQUFRLEdBQUcsSUFBQSxnQkFBUyxFQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN4QyxNQUFNLE1BQU0sR0FBRyxJQUFBLGdCQUFTLEVBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRzdCLElBQU0sa0JBQWtCLEdBQXhCLE1BQU0sa0JBQWtCO0lBV2hCLEFBQU4sS0FBSyxDQUFDLGdCQUFnQjtRQUMzQixNQUFNLFVBQVUsR0FBRyxNQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUNqRSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNwQyxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBR1ksQUFBTixLQUFLLENBQUMsZ0JBQWdCLENBQW1CLE9BQWU7UUFDN0QsSUFBSTtZQUNGLElBQUksQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDckMsaUJBQWlCO2dCQUNqQixNQUFNLFVBQVUsR0FBRyxNQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDakUsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsQ0FBQzthQUN6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