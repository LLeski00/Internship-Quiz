import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from '@prisma/client';

@Injectable()
export class AdminAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext) {
    const baseGuardResult = await super.canActivate(context);
    if (!baseGuardResult) {
      return false;
    }

    const { user } = context.switchToHttp().getRequest();

    return user.role === UserRole.ADMIN;
  }
}
