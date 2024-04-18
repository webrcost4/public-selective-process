export interface CreateMovieRequest {
  title: string;
  direction: string;
  year: number;
  filmImage: string;
}

export interface CreateMovieResponse {
  id: number;
  title: string;
  direction: string;
  year: number;
  filmImage: string;
}

export interface ListAllMoviesResponse {
  movies: Array<CreateMovieResponse>;
  origin: string;
}

export interface UpdateMovieRequest {
  title?: string;
  direction?: string;
  filmImage?: string;
  year?: number;
}

export interface UpdateMovieResponse {
  id: number;
  title: string;
  direction: string;
  year: number;
  filmImage: string;
}

export interface DeleteMovieResponse {
  success: string;
}

export interface ErrorResponse {
  error: string;
}
