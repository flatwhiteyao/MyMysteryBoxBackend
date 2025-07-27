import { Controller, Post, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import * as path from 'path';
import * as fs from 'fs';
import formidable from 'formidable';

@Controller('/')
export class PlayerShowUploadController {
  @Inject()
  ctx: Context;

  @Post('/player-show-upload')
  async upload() {
    const form = formidable({ multiples: true }); // 支持多文件
    const { files } = await new Promise<{ files: any }>((resolve, reject) => {
      form.parse(this.ctx.req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ files });
      });
    });

    let fileArr = files.file;
    if (!fileArr) {
      this.ctx.status = 400;
      return { success: false, message: '未上传文件' };
    }
    if (!Array.isArray(fileArr)) fileArr = [fileArr];

    const urls = [];
    for (const file of fileArr) {
      const ext = path.extname(file.originalFilename);
      const fileName = `${Date.now()}_${Math.random()
        .toString(36)
        .slice(2)}${ext}`;
      const uploadDir = path.join(__dirname, '../../public/uploads');
      if (!fs.existsSync(uploadDir))
        fs.mkdirSync(uploadDir, { recursive: true });
      const filePath = path.join(uploadDir, fileName);
      fs.copyFileSync(file.filepath, filePath);
      urls.push(`uploads/${fileName}`);
    }
    return { success: true, urls };
  }
}
