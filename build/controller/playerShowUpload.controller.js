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
exports.PlayerShowUploadController = void 0;
const core_1 = require("@midwayjs/core");
const path = require("path");
const fs = require("fs");
const formidable_1 = require("formidable");
let PlayerShowUploadController = class PlayerShowUploadController {
    async upload() {
        const form = (0, formidable_1.default)({ multiples: true }); // 支持多文件
        const { files } = await new Promise((resolve, reject) => {
            form.parse(this.ctx.req, (err, fields, files) => {
                if (err)
                    reject(err);
                else
                    resolve({ files });
            });
        });
        let fileArr = files.file;
        if (!fileArr) {
            this.ctx.status = 400;
            return { success: false, message: '未上传文件' };
        }
        if (!Array.isArray(fileArr))
            fileArr = [fileArr];
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
};
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], PlayerShowUploadController.prototype, "ctx", void 0);
__decorate([
    (0, core_1.Post)('/player-show-upload'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PlayerShowUploadController.prototype, "upload", null);
PlayerShowUploadController = __decorate([
    (0, core_1.Controller)('/')
], PlayerShowUploadController);
exports.PlayerShowUploadController = PlayerShowUploadController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheWVyU2hvd1VwbG9hZC5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXIvcGxheWVyU2hvd1VwbG9hZC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHlDQUEwRDtBQUUxRCw2QkFBNkI7QUFDN0IseUJBQXlCO0FBQ3pCLDJDQUFvQztBQUc3QixJQUFNLDBCQUEwQixHQUFoQyxNQUFNLDBCQUEwQjtJQUsvQixBQUFOLEtBQUssQ0FBQyxNQUFNO1FBQ1YsTUFBTSxJQUFJLEdBQUcsSUFBQSxvQkFBVSxFQUFDLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRO1FBQ3RELE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxNQUFNLElBQUksT0FBTyxDQUFpQixDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUN0RSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDOUMsSUFBSSxHQUFHO29CQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzs7b0JBQ2hCLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDMUIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztZQUN0QixPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUM7U0FDN0M7UUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7WUFBRSxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVqRCxNQUFNLElBQUksR0FBRyxFQUFFLENBQUM7UUFDaEIsS0FBSyxNQUFNLElBQUksSUFBSSxPQUFPLEVBQUU7WUFDMUIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUNoRCxNQUFNLFFBQVEsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO2lCQUM1QyxRQUFRLENBQUMsRUFBRSxDQUFDO2lCQUNaLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztZQUNwQixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO1lBQy9ELElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQztnQkFDM0IsRUFBRSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUMvQyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUNoRCxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLFFBQVEsRUFBRSxDQUFDLENBQUM7U0FDbEM7UUFDRCxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0NBQ0YsQ0FBQTtBQW5DQztJQUFDLElBQUEsYUFBTSxHQUFFOzt1REFDSTtBQUdQO0lBREwsSUFBQSxXQUFJLEVBQUMscUJBQXFCLENBQUM7Ozs7d0RBK0IzQjtBQW5DVSwwQkFBMEI7SUFEdEMsSUFBQSxpQkFBVSxFQUFDLEdBQUcsQ0FBQztHQUNILDBCQUEwQixDQW9DdEM7QUFwQ1ksZ0VBQTBCIn0=