import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (token) {
      try {
        const decoded = this.jwtService.verify(token, {
          secret: process.env.AUTH_SECRET_JWT,
        });
        request.id = decoded;
        return true;
      } catch (error) {
        throw new Error('Você deve fornecer um token de acesso valido.');
      }
    }
    return false;
  }
}
