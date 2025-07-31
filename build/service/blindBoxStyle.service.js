"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlindBoxStyleService = void 0;
// src_backend/service/blindBoxStyle.service.ts
const core_1 = require("@midwayjs/core");
const sqlite_1 = require("../database/sqlite");
let BlindBoxStyleService = class BlindBoxStyleService {
    async addBlindBoxStyles(blindBoxId, styles) {
        const db = await sqlite_1.default;
        const insertPromises = styles.map(style => {
            return db.run(`
        INSERT INTO blind_box_styles (blind_box_id, name, photo, probability)
        VALUES (?,?,?,?)
      `, [blindBoxId, style.name, style.photo, style.probability]);
        });
        await Promise.all(insertPromises);
    }
    async getBlindBoxStyles(blindBoxId) {
        const db = await sqlite_1.default;
        const styles = await db.all('SELECT * FROM blind_box_styles WHERE blind_box_id =?', [blindBoxId]);
        return styles;
    }
    async randomDraw(blindBoxId) {
        const db = await sqlite_1.default;
        const styles = await db.all('SELECT * FROM blind_box_styles WHERE blind_box_id =?', [blindBoxId]);
        const totalProbability = styles.reduce((sum, style) => sum + style.probability, 0);
        const randomValue = Math.random() * totalProbability;
        let cumulativeProbability = 0;
        for (const style of styles) {
            cumulativeProbability += style.probability;
            if (randomValue < cumulativeProbability) {
                return style;
            }
        }
        return null;
    }
};
BlindBoxStyleService = __decorate([
    (0, core_1.Provide)()
], BlindBoxStyleService);
exports.BlindBoxStyleService = BlindBoxStyleService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxpbmRCb3hTdHlsZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2UvYmxpbmRCb3hTdHlsZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLCtDQUErQztBQUMvQyx5Q0FBeUM7QUFDekMsK0NBQTJDO0FBR3BDLElBQU0sb0JBQW9CLEdBQTFCLE1BQU0sb0JBQW9CO0lBQy9CLEtBQUssQ0FBQyxpQkFBaUIsQ0FDckIsVUFBa0IsRUFDbEIsTUFBOEQ7UUFFOUQsTUFBTSxFQUFFLEdBQUcsTUFBTSxnQkFBUyxDQUFDO1FBQzNCLE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDeEMsT0FBTyxFQUFFLENBQUMsR0FBRyxDQUNYOzs7T0FHRCxFQUNDLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsV0FBVyxDQUFDLENBQ3pELENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsS0FBSyxDQUFDLGlCQUFpQixDQUFDLFVBQWtCO1FBQ3hDLE1BQU0sRUFBRSxHQUFHLE1BQU0sZ0JBQVMsQ0FBQztRQUMzQixNQUFNLE1BQU0sR0FBRyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQ3pCLHNEQUFzRCxFQUN0RCxDQUFDLFVBQVUsQ0FBQyxDQUNiLENBQUM7UUFDRixPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQsS0FBSyxDQUFDLFVBQVUsQ0FBQyxVQUFrQjtRQUNqQyxNQUFNLEVBQUUsR0FBRyxNQUFNLGdCQUFTLENBQUM7UUFDM0IsTUFBTSxNQUFNLEdBQUcsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUN6QixzREFBc0QsRUFDdEQsQ0FBQyxVQUFVLENBQUMsQ0FDYixDQUFDO1FBQ0YsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUNwQyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsV0FBVyxFQUN2QyxDQUFDLENBQ0YsQ0FBQztRQUNGLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxnQkFBZ0IsQ0FBQztRQUNyRCxJQUFJLHFCQUFxQixHQUFHLENBQUMsQ0FBQztRQUM5QixLQUFLLE1BQU0sS0FBSyxJQUFJLE1BQU0sRUFBRTtZQUMxQixxQkFBcUIsSUFBSSxLQUFLLENBQUMsV0FBVyxDQUFDO1lBQzNDLElBQUksV0FBVyxHQUFHLHFCQUFxQixFQUFFO2dCQUN2QyxPQUFPLEtBQUssQ0FBQzthQUNkO1NBQ0Y7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Q0FDRixDQUFBO0FBL0NZLG9CQUFvQjtJQURoQyxJQUFBLGNBQU8sR0FBRTtHQUNHLG9CQUFvQixDQStDaEM7QUEvQ1ksb0RBQW9CIn0=