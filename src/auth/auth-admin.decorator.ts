import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';

export const AuthAdmin = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user as User;  
  if (user.Admin === false) {
    throw new UnauthorizedException(
      'Somente admisnistradores podem acessar essa área',
    );
  }
  delete user.password;
  return user;
});
