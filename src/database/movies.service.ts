import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/movies.service';
import { movies as Movies, Prisma } from '@prisma/client';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  /*
   ** Retrieve a list of movies based on the provided parameters.
   */
  async movies(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.moviesWhereUniqueInput;
    where?: Prisma.moviesWhereInput;
    orderBy?: Prisma.moviesOrderByWithRelationInput;
  }): Promise<Movies[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.movies.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  /*
   ** Retrieve all movies from the database.
   */
  async listAllMovies(): Promise<Array<Movies> | null> {
    try {
      return this.prisma.movies.findMany();
    } catch (error) {
      throw error;
    }
  }

  /*
   ** Retrieve a single movie based on the provided title.
   */
  async listOneMovie(title: string): Promise<Movies | null> {
    return this.prisma.movies.findUnique({
      where: { title: title },
    });
  }

  /*
   ** Create a new movie record in the database.
   */
  async createMovie(data: Prisma.moviesCreateInput): Promise<Movies> {
    try {
      return this.prisma.movies.create({
        data,
      });
    } catch (error) {
      throw error;
    }
  }

  /*
   ** Update a movie record in the database based on the provided ID.
   */
  async updateMovie(
    id: number,
    data: Prisma.moviesUpdateInput,
  ): Promise<Movies> {
    return this.prisma.movies.update({
      data,
      where: { id },
    });
  }

  /*
   ** Delete a movie record from the database based on the provided ID.
   */
  async deleteMovie(id: number): Promise<Movies> {
    return this.prisma.movies.delete({
      where: { id },
    });
  }
}
