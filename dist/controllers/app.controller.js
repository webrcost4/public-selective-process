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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const movies_service_1 = require("../database/movies.service");
const validator_1 = require("validator");
const auth_service_1 = require("../authorization/auth.service");
const redis_service_1 = require("../redis/redis.service");
let AppController = class AppController {
    constructor(moviesService, RedisMovies) {
        this.moviesService = moviesService;
        this.RedisMovies = RedisMovies;
    }
    async createMovie(body, res) {
        try {
            const { title, direction, year, filmImage } = body;
            if (title !== undefined || null) {
                if (await this.moviesService.listOneMovie(title))
                    return res
                        .status(common_1.HttpStatus.BAD_REQUEST)
                        .json({ error: 'Este filme já existe, tente atualiza-lo.' });
            }
            if (year !== undefined || null) {
                if (!validator_1.default.isNumeric(String(year)))
                    return res
                        .status(common_1.HttpStatus.BAD_REQUEST)
                        .json({ error: 'Campo data não é valido' });
            }
            if (filmImage !== undefined || null) {
                if (!validator_1.default.isURL(filmImage))
                    return res
                        .status(common_1.HttpStatus.BAD_REQUEST)
                        .json({ error: 'URL da imagem não é valida.' });
            }
            if ((title && direction) !== undefined || null) {
                if (!validator_1.default.isAlphanumeric(title, 'pt-BR', { ignore: ' ' }) ||
                    !validator_1.default.isAlphanumeric(direction, 'pt-BR', { ignore: /[,\s]+/g }))
                    return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                        error: 'Os campos titulo e direção do filme devem ser preenchidos!',
                    });
            }
            const movie = await this.moviesService.createMovie({
                title,
                direction,
                year: Number(year),
                filmImage,
            });
            return res.status(common_1.HttpStatus.CREATED).json(movie);
        }
        catch (error) {
            console.log(error);
            res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json({ message: 'Falha ao criar um filme' });
        }
    }
    async listAllMovies(res) {
        try {
            const moviesInChache = await this.RedisMovies.get('movies');
            if (moviesInChache) {
                return res.json({ moviesInChache, origin: 'cache' });
            }
            const movies = await this.moviesService.listAllMovies();
            this.RedisMovies.set('movies', JSON.stringify(movies));
            return res.json({ movies, origin: 'DB' });
        }
        catch (error) {
            return res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json({ error: 'Erro ao listar os filmes' });
        }
    }
    async updateMovie(param, body, res) {
        try {
            const { id } = param;
            const { title, direction, filmImage, year } = body;
            let data = {};
            if (title !== undefined || null) {
                if (await this.moviesService.listOneMovie(title))
                    return res
                        .status(common_1.HttpStatus.BAD_REQUEST)
                        .json({ error: 'Este titulo já está sendo usado.' });
            }
            if (title !== undefined || null) {
                if (title && validator_1.default.isAlphanumeric(title, 'pt-BR', { ignore: ' ' }))
                    data = { ...data, title };
            }
            if (direction !== undefined || null) {
                if (validator_1.default.isAlphanumeric(direction, 'pt-BR', { ignore: /[,\s]+/g }))
                    data = { ...data, direction };
            }
            if (filmImage && validator_1.default.isURL(filmImage))
                data = { ...data, filmImage };
            if (year && validator_1.default.isNumeric(String(year)))
                data = { ...data, year: Number(year) };
            const newData = await this.moviesService.updateMovie(Number(id), data);
            res.json(newData);
        }
        catch (error) {
            console.log(error);
            res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json({ error: 'Não foi possivel atualizar o filme.' });
        }
    }
    async deleteMovie(param, res) {
        try {
            const { id } = param;
            if (validator_1.default.isNumeric(id)) {
                await this.moviesService.deleteMovie(Number(id));
                return res
                    .status(common_1.HttpStatus.ACCEPTED)
                    .json({ success: 'Filme removido com sucesso!' });
            }
            else {
                return res
                    .status(common_1.HttpStatus.BAD_REQUEST)
                    .json({ error: 'ID não é valido.' });
            }
        }
        catch (error) {
            res
                .status(common_1.HttpStatus.BAD_REQUEST)
                .json({ error: 'Falha ao deletar filme.' });
        }
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Post)('/create-movie'),
    (0, common_1.UseGuards)(auth_service_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "createMovie", null);
__decorate([
    (0, common_1.Get)('/list-all-movies'),
    (0, common_1.UseGuards)(auth_service_1.JwtAuthGuard),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "listAllMovies", null);
__decorate([
    (0, common_1.Put)('/update-movie/:id'),
    (0, common_1.UseGuards)(auth_service_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "updateMovie", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(auth_service_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "deleteMovie", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [movies_service_1.MoviesService,
        redis_service_1.RedisService])
], AppController);
//# sourceMappingURL=app.controller.js.map