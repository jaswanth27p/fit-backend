/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const sessionToken = this.extractTokenFromCookie(request);

    if (!sessionToken) {
      throw new UnauthorizedException('No token found');
    }

    try {
      // Decode the JWT token (no verification)
      const payload = jwtDecode(sessionToken);

      console.log('Decoded JWT:', payload);
      request.user = payload; // Attach user data to request

      return true; // Grant access
    } catch (error) {
      console.error('JWT Decoding failed:', error);
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    return request.cookies?.['authjs.session-token'];
  }
}
