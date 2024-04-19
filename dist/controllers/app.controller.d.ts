import { MoviesService } from 'src/database/movies.service';
import { Response } from 'express';
import { RedisService } from 'src/redis/redis.service';
import { CreateMovieRequest, CreateMovieResponse, ListAllMoviesResponse, UpdateMovieRequest, UpdateMovieResponse, DeleteMovieResponse, ErrorResponse } from 'types';
export declare class AppController {
    private readonly moviesService;
    private readonly RedisMovies;
    constructor(moviesService: MoviesService, RedisMovies: RedisService);
    createMovie(body: CreateMovieRequest, res: Response): Promise<Response<CreateMovieResponse | ErrorResponse, Record<string, any>>>;
    listAllMovies(res: Response): Promise<Response<ListAllMoviesResponse | ErrorResponse, Record<string, any>>>;
    updateMovie(param: any, body: UpdateMovieRequest, res: Response): Promise<Response<UpdateMovieResponse | ErrorResponse, Record<string, any>>>;
    deleteMovie(param: any, res: Response): Promise<Response<DeleteMovieResponse | ErrorResponse, Record<string, any>>>;
}
