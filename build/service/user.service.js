"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
// doubao/backend/service/user.service.ts
const core_1 = require("@midwayjs/core");
const sqlite_1 = require("../database/sqlite");
let UserService = class UserService {
    async register(nickname, name, phone, email, password, role) {
        const db = await sqlite_1.default;
        const result = await db.run(`
            INSERT INTO users (nickname, name, phone, email, password, role)
            VALUES (?,?,?,?,?,?)
        `, [nickname, name, phone, email, password, role]);
        return result.lastID;
    }
    async login(phone, password) {
        const db = await sqlite_1.default;
        const user = await db.get(`
            SELECT * FROM users WHERE phone =? AND password =?
        `, [phone, password]);
        return user;
    }
    async getUser(uid) {
        const db = await sqlite_1.default;
        const user = await db.get(`
            SELECT * FROM users WHERE id =?
        `, [uid]);
        return user;
    }
    async updateUser(id, nickname, name, phone, email, password) {
        const db = await sqlite_1.default;
        if (password) {
            await db.run(`
                UPDATE users
                SET nickname =?, name =?, phone =?, email =?, password =?
                WHERE id =?
            `, [nickname, name, phone, email, password, id]);
        }
        else {
            await db.run(`
                UPDATE users
                SET nickname =?, name =?, phone =?, email =?
                WHERE id =?
            `, [nickname, name, phone, email, id]);
        }
    }
};
UserService = __decorate([
    (0, core_1.Provide)()
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2UvdXNlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLHlDQUF5QztBQUN6Qyx5Q0FBeUM7QUFDekMsK0NBQTJDO0FBR3BDLElBQU0sV0FBVyxHQUFqQixNQUFNLFdBQVc7SUFDdEIsS0FBSyxDQUFDLFFBQVEsQ0FDWixRQUFnQixFQUNoQixJQUFZLEVBQ1osS0FBYSxFQUNiLEtBQWEsRUFDYixRQUFnQixFQUNoQixJQUFZO1FBRVosTUFBTSxFQUFFLEdBQUcsTUFBTSxnQkFBUyxDQUFDO1FBQzNCLE1BQU0sTUFBTSxHQUFHLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FDekI7OztTQUdHLEVBQ0gsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUMvQyxDQUFDO1FBQ0YsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQWEsRUFBRSxRQUFnQjtRQUN6QyxNQUFNLEVBQUUsR0FBRyxNQUFNLGdCQUFTLENBQUM7UUFDM0IsTUFBTSxJQUFJLEdBQUcsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUN2Qjs7U0FFRyxFQUNILENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUNsQixDQUFDO1FBQ0YsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFXO1FBQ3ZCLE1BQU0sRUFBRSxHQUFHLE1BQU0sZ0JBQVMsQ0FBQztRQUMzQixNQUFNLElBQUksR0FBRyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQ3ZCOztTQUVHLEVBQ0gsQ0FBQyxHQUFHLENBQUMsQ0FDTixDQUFDO1FBQ0YsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsS0FBSyxDQUFDLFVBQVUsQ0FDZCxFQUFVLEVBQ1YsUUFBZ0IsRUFDaEIsSUFBWSxFQUNaLEtBQWEsRUFDYixLQUFhLEVBQ2IsUUFBZ0I7UUFFaEIsTUFBTSxFQUFFLEdBQUcsTUFBTSxnQkFBUyxDQUFDO1FBQzNCLElBQUksUUFBUSxFQUFFO1lBQ1osTUFBTSxFQUFFLENBQUMsR0FBRyxDQUNWOzs7O2FBSUssRUFDTCxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQzdDLENBQUM7U0FDSDthQUFNO1lBQ0wsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUNWOzs7O2FBSUssRUFDTCxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FDbkMsQ0FBQztTQUNIO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUF2RVksV0FBVztJQUR2QixJQUFBLGNBQU8sR0FBRTtHQUNHLFdBQVcsQ0F1RXZCO0FBdkVZLGtDQUFXIn0=