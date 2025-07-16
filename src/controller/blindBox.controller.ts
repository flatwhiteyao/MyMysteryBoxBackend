// src_backend/controller/blindBox.controller.ts
import { Controller, Get, Post, Del, Put, Query, Inject } from "@midwayjs/core";
import { BlindBoxService } from "../service/blindBox.service";
import { Context } from "@midwayjs/koa";
import formidable from 'formidable';
import * as path from 'path';
import * as fs from 'fs';
import { promisify } from 'util';

const copyFile = promisify(fs.copyFile);
const unlink = promisify(fs.unlink);

@Controller("/blind-box")
export class BlindBoxController {
  @Inject()
  blindBoxService: BlindBoxService;

  @Get("/")
  public async getAllBlindBoxes() {
    const blindBoxes = await this.blindBoxService.getAllBlindBoxes();
    console.log('返回的盲盒数据:', blindBoxes); // 添加调试日志
    return { success: true, blindBoxes };
  }

  @Post("/")
  public async addBlindBox(ctx: Context) {
    try {
      const form = formidable({ multiples: false });

      const { fields, files } = await new Promise<{ fields: any; files: any }>((resolve, reject) => {
        form.parse(ctx.req, (err, fields, files) => {
          if (err) {
            reject(err);
          } else {
            resolve({ fields, files });
          }
        });
      });

      // 提取并处理字段，确保类型正确
      const name = fields.name?.toString().trim() || '';
      const description = fields.description?.toString().trim() || '';
      const price = parseFloat(fields.price?.toString() || '0');

      // 验证必填字段
      if (!name || isNaN(price) || price <= 0) {
        return ctx.body = { success: false, message: '名称和价格不能为空' };
      }

      let photoPath = '';

      // 更健壮地检查文件上传
      const photoFiles = Array.isArray(files.photo) ? files.photo : [files.photo];
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
      } else {
        return ctx.body = { success: false, message: '请上传盲盒照片' };
      }

      const id = await this.blindBoxService.addBlindBox(
        name,
        description,
        price,
        photoPath
      );

      ctx.body = { success: true, id };
    } catch (error) {
      console.error('添加盲盒错误:', error);
      ctx.body = { success: false, message: '添加盲盒失败，请重试' };
    }
  }

  @Del("/")
public async deleteBlindBox(@Query("id") id: number, ctx: Context) {
  try {
    // 获取盲盒信息以删除关联的照片
    const db = await (await import('../database/sqlite')).default;
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
  } catch (error) {
    console.error('删除盲盒错误:', error);
    ctx.status = 500; // 明确设置错误状态码
    return { success: false, message: '删除盲盒失败，请重试' };
  }
}
  @Put("/")
  public async updateBlindBox(ctx: Context) {
    try {
      const form = formidable({ multiples: false });

      const { fields, files } = await new Promise<{ fields: any; files: any }>((resolve, reject) => {
        form.parse(ctx.req, (err, fields, files) => {
          if (err) {
            reject(err);
          } else {
            resolve({ fields, files });
          }
        });
      });

      // 提取并处理字段，确保类型正确
      const id = parseInt(fields.id?.toString() || '0');
      const name = fields.name?.toString().trim() || '';
      const description = fields.description?.toString().trim() || '';
      const price = parseFloat(fields.price?.toString() || '0');

      // 验证必填字段
      if (!id || !name || isNaN(price) || price <= 0) {
        return ctx.body = { success: false, message: 'ID、名称和价格不能为空' };
      }

      let photoPath = '';

      // 处理上传的新照片
      if (files.photo && (files.photo as formidable.File).originalFilename) {
        // 获取现有照片信息
        const db = await (await import('../database/sqlite')).default;
        const blindBox = await db.get('SELECT photo FROM blind_boxes WHERE id =?', [id]);

        // 删除现有照片
        if (blindBox && blindBox.photo) {
          const oldFilePath = path.join(__dirname, '../../public', blindBox.photo);
          if (fs.existsSync(oldFilePath)) {
            await unlink(oldFilePath);
          }
        }

        // 处理新上传的照片
        const file = files.photo as formidable.File;
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

      await this.blindBoxService.updateBlindBox(
        id,
        name,
        description,
        price,
        photoPath
      );

      ctx.body = { success: true };
    } catch (error) {
      console.error('更新盲盒错误:', error);
      ctx.body = { success: false, message: '更新盲盒失败，请重试' };
    }
  }
}