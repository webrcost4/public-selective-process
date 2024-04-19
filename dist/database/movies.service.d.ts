import { PrismaService } from '../services/movies.service';
import { movies as Movies, Prisma } from '@prisma/client';
export declare class MoviesService {
    private prisma;
    constructor(prisma: PrismaService);
    movies(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.moviesWhereUniqueInput;
        where?: Prisma.moviesWhereInput;
        orderBy?: Prisma.moviesOrderByWithRelationInput;
    }): Promise<Movies[]>;
    listAllMovies(): Promise<Array<Movies> | null>;
    listOneMovie(title: string): Promise<Movies | null>;
    createMovie(data: Prisma.moviesCreateInput): Promise<Movies>;
    updateMovie(id: number, data: Prisma.moviesUpdateInput): Promise<Movies>;
    deleteMovie(id: number): Promise<Movies>;
}
