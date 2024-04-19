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
exports.MoviesService = void 0;
const common_1 = require("@nestjs/common");
const movies_service_1 = require("../services/movies.service");
let MoviesService = class MoviesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async movies(params) {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.movies.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }
    async listAllMovies() {
        try {
            return this.prisma.movies.findMany();
        }
        catch (error) {
            throw error;
        }
    }
    async listOneMovie(title) {
        return this.prisma.movies.findUnique({
            where: { title: title },
        });
    }
    async createMovie(data) {
        try {
            return this.prisma.movies.create({
                data,
            });
        }
        catch (error) {
            throw error;
        }
    }
    async updateMovie(id, data) {
        return this.prisma.movies.update({
            data,
            where: { id },
        });
    }
    async deleteMovie(id) {
        return this.prisma.movies.delete({
            where: { id },
        });
    }
};
exports.MoviesService = MoviesService;
exports.MoviesService = MoviesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [movies_service_1.PrismaService])
], MoviesService);
//# sourceMappingURL=movies.service.js.map