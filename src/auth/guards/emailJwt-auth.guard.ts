import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class EmailJwtAuthGuard extends AuthGuard('emailJwt') {
    async canActivate(context: ExecutionContext): Promise<any> {
        return super.canActivate(context);
    }
}