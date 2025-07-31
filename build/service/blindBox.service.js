"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlindBoxService = void 0;
// src_backend/service/blindBox.service.ts
const core_1 = require("@midwayjs/core");
const sqlite_1 = require("../database/sqlite");
let BlindBoxService = class BlindBoxService {
    async getAllBlindBoxes() {
        const db = await sqlite_1.default;
        const blindBoxes = await db.all('SELECT * FROM blind_boxes');
        return blindBoxes;
    }
    async searchBlindBoxes(keyword) {
        const db = await sqlite_1.default;
        const searchKeyword = `%${keyword}%`;
        const blindBoxes = await db.all(`
      SELECT * FROM blind_boxes 
      WHERE name LIKE ? OR description LIKE ?
      ORDER BY id DESC
    `, [searchKeyword, searchKeyword]);
        return blindBoxes;
    }
    async addBlindBox(name, description, price, photo) {
        const db = await sqlite_1.default;
        const result = await db.run(`
      INSERT INTO blind_boxes (name, description, price, photo)
      VALUES (?,?,?,?)
    `, [name, description, price, photo]);
        return result.lastID;
    }
    async deleteBlindBox(id) {
        const db = await sqlite_1.default;
        await db.run('DELETE FROM blind_boxes WHERE id =?', [id]);
    }
    async updateBlindBox(id, name, description, price, photo) {
        const db = await sqlite_1.default;
        if (photo) {
            await db.run(`
        UPDATE blind_boxes
        SET name =?, description =?, price =?, photo =?
        WHERE id =?
      `, [name, description, price, photo, id]);
        }
        else {
            await db.run(`
        UPDATE blind_boxes
        SET name =?, description =?, price =?
        WHERE id =?
      `, [name, description, price, id]);
        }
    }
    async getLatestBlindBox() {
        const db = await sqlite_1.default;
        return await db.get('SELECT * FROM blind_boxes ORDER BY id DESC LIMIT 1');
    }
};
BlindBoxService = __decorate([
    (0, core_1.Provide)()
], BlindBoxService);
exports.BlindBoxService = BlindBoxService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxpbmRCb3guc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlL2JsaW5kQm94LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsMENBQTBDO0FBQzFDLHlDQUF5QztBQUN6QywrQ0FBMkM7QUFHcEMsSUFBTSxlQUFlLEdBQXJCLE1BQU0sZUFBZTtJQUMxQixLQUFLLENBQUMsZ0JBQWdCO1FBQ3BCLE1BQU0sRUFBRSxHQUFHLE1BQU0sZ0JBQVMsQ0FBQztRQUMzQixNQUFNLFVBQVUsR0FBRyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUM3RCxPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDO0lBRUQsS0FBSyxDQUFDLGdCQUFnQixDQUFDLE9BQWU7UUFDcEMsTUFBTSxFQUFFLEdBQUcsTUFBTSxnQkFBUyxDQUFDO1FBQzNCLE1BQU0sYUFBYSxHQUFHLElBQUksT0FBTyxHQUFHLENBQUM7UUFDckMsTUFBTSxVQUFVLEdBQUcsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUM3Qjs7OztLQUlELEVBQ0MsQ0FBQyxhQUFhLEVBQUUsYUFBYSxDQUFDLENBQy9CLENBQUM7UUFDRixPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDO0lBRUQsS0FBSyxDQUFDLFdBQVcsQ0FDZixJQUFZLEVBQ1osV0FBbUIsRUFDbkIsS0FBYSxFQUNiLEtBQWE7UUFFYixNQUFNLEVBQUUsR0FBRyxNQUFNLGdCQUFTLENBQUM7UUFDM0IsTUFBTSxNQUFNLEdBQUcsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUN6Qjs7O0tBR0QsRUFDQyxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUNsQyxDQUFDO1FBQ0YsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxLQUFLLENBQUMsY0FBYyxDQUFDLEVBQVU7UUFDN0IsTUFBTSxFQUFFLEdBQUcsTUFBTSxnQkFBUyxDQUFDO1FBQzNCLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxxQ0FBcUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVELEtBQUssQ0FBQyxjQUFjLENBQ2xCLEVBQVUsRUFDVixJQUFZLEVBQ1osV0FBbUIsRUFDbkIsS0FBYSxFQUNiLEtBQWE7UUFFYixNQUFNLEVBQUUsR0FBRyxNQUFNLGdCQUFTLENBQUM7UUFDM0IsSUFBSSxLQUFLLEVBQUU7WUFDVCxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQ1Y7Ozs7T0FJRCxFQUNDLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUN0QyxDQUFDO1NBQ0g7YUFBTTtZQUNMLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FDVjs7OztPQUlELEVBQ0MsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FDL0IsQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxpQkFBaUI7UUFDckIsTUFBTSxFQUFFLEdBQUcsTUFBTSxnQkFBUyxDQUFDO1FBQzNCLE9BQU8sTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLG9EQUFvRCxDQUFDLENBQUM7SUFDNUUsQ0FBQztDQUNGLENBQUE7QUE1RVksZUFBZTtJQUQzQixJQUFBLGNBQU8sR0FBRTtHQUNHLGVBQWUsQ0E0RTNCO0FBNUVZLDBDQUFlIn0=