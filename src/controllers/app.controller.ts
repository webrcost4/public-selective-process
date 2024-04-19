import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Get,
  Res,
  UseGuards,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { MoviesService } from 'src/database/movies.service';
import { Response } from 'express';
import validator from 'validator';
import { JwtAuthGuard } from 'src/authorization/auth.service';
import { RedisService } from 'src/redis/redis.service';
import {
  CreateMovieRequest,
  CreateMovieResponse,
  ListAllMoviesResponse,
  UpdateMovieRequest,
  UpdateMovieResponse,
  DeleteMovieResponse,
  ErrorResponse,
} from 'types';

@Controller()
export class AppController {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly RedisMovies: RedisService,
  ) {}

  /*
   ** Adding a movie to my database
   */
  @Post('/create-movie')
  @UseGuards(JwtAuthGuard)
  async createMovie(
    @Body() body: CreateMovieRequest,
    @Res() res: Response,
  ): Promise<
    Response<CreateMovieResponse | ErrorResponse, Record<string, any>>
  > {
    try {
      const { title, direction, year, filmImage } = body;

      /*
       ** Checking if the movie already exists in the database
       */
      if (title !== undefined || null) {
        if (await this.moviesService.listOneMovie(title))
          return res
            .status(HttpStatus.BAD_REQUEST)
            .json({ error: 'Este filme já existe, tente atualiza-lo.' });
      }

      /*
       ** Valid Date format
       */
      if (year !== undefined || null) {
        if (!validator.isNumeric(String(year)))
          return res
            .status(HttpStatus.BAD_REQUEST)
            .json({ error: 'Campo data não é valido' });
      }

      /*
       ** Checking if the image URL is valid.
       */
      if (filmImage !== undefined || null) {
        if (!validator.isURL(filmImage))
          return res
            .status(HttpStatus.BAD_REQUEST)
            .json({ error: 'URL da imagem não é valida.' });
      }
      /*
       ** Checking if the title and direction fields are empty
       */
      if ((title && direction) !== undefined || null) {
        if (
          !validator.isAlphanumeric(title, 'pt-BR', { ignore: ' ' }) ||
          !validator.isAlphanumeric(direction, 'pt-BR', { ignore: /[,\s]+/g })
        )
          return res.status(HttpStatus.BAD_REQUEST).json({
            error: 'Os campos titulo e direção do filme devem ser preenchidos!',
          });
      }

      /*
       ** Returning the value added to the database
       */
      const movie = await this.moviesService.createMovie({
        title,
        direction,
        year: Number(year),
        filmImage,
      });

      return res.status(HttpStatus.CREATED).json(movie);
    } catch (error) {
      console.log(error);
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'Falha ao criar um filme' });
    }
  }

  /*
   ** Listing all movies in the database
   */
  @Get('/list-all-movies')
  @UseGuards(JwtAuthGuard)
  async listAllMovies(
    @Res() res: Response,
  ): Promise<
    Response<ListAllMoviesResponse | ErrorResponse, Record<string, any>>
  > {
    try {
      const moviesInChache = await this.RedisMovies.get('movies');
      if (moviesInChache) {
        return res.json({ moviesInChache, origin: 'cache' });
      }

      const movies = await this.moviesService.listAllMovies();
      this.RedisMovies.set('movies', JSON.stringify(movies));
      return res.json({ movies, origin: 'DB' });
    } catch (error) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Erro ao listar os filmes' });
    }
  }

  /*
   ** Update movie from database
   */
  @Put('/update-movie/:id')
  @UseGuards(JwtAuthGuard)
  async updateMovie(
    @Param() param: any,
    @Body() body: UpdateMovieRequest,
    @Res() res: Response,
  ): Promise<
    Response<UpdateMovieResponse | ErrorResponse, Record<string, any>>
  > {
    try {
      const { id } = param;
      const { title, direction, filmImage, year } = body;
      let data = {};

      // Verify title is in use
      if (title !== undefined || null) {
        if (await this.moviesService.listOneMovie(title))
          return res
            .status(HttpStatus.BAD_REQUEST)
            .json({ error: 'Este titulo já está sendo usado.' });
      }

      /* Title validation */
      if (title !== undefined || null) {
        if (title && validator.isAlphanumeric(title, 'pt-BR', { ignore: ' ' }))
          data = { ...data, title };
      }

      /* Direction validation */
      if (direction !== undefined || null) {
        if (validator.isAlphanumeric(direction, 'pt-BR', { ignore: /[,\s]+/g }))
          data = { ...data, direction };
      }

      /* Film image validation */
      if (filmImage && validator.isURL(filmImage))
        data = { ...data, filmImage };

      /* Year validation */
      if (year && validator.isNumeric(String(year)))
        data = { ...data, year: Number(year) };

      const newData = await this.moviesService.updateMovie(Number(id), data);
      res.json(newData);
    } catch (error) {
      console.log(error);
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Não foi possivel atualizar o filme.' });
    }
  }

  /*
   ** Deleting movie from database
   */
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteMovie(
    @Param() param: any,
    @Res() res: Response,
  ): Promise<
    Response<DeleteMovieResponse | ErrorResponse, Record<string, any>>
  > {
    try {
      const { id } = param;

      if (validator.isNumeric(id)) {
        await this.moviesService.deleteMovie(Number(id));
        return res
          .status(HttpStatus.ACCEPTED)
          .json({ success: 'Filme removido com sucesso!' });
      } else {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ error: 'ID não é valido.' });
      }
    } catch (error) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Falha ao deletar filme.' });
    }
  }
}
