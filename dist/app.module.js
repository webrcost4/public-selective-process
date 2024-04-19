"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./controllers/app.controller");
const config_1 = require("@nestjs/config");
const movies_service_1 = require("./database/movies.service");
const movies_service_2 = require("./services/movies.service");
const jwt_1 = require("@nestjs/jwt");
const redis_service_1 = require("./redis/redis.service");
let MoviesModule = class MoviesModule {
};
exports.MoviesModule = MoviesModule;
exports.MoviesModule = MoviesModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot()],
        controllers: [app_controller_1.AppController],
        providers: [movies_service_1.MoviesService, movies_service_2.PrismaService, jwt_1.JwtService, redis_service_1.RedisService],
    })
], MoviesModule);
//# sourceMappingURL=app.module.js.map