import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    async canActivate(context: ExecutionContext): Promise<any> {
        // console.log(context.getArgByIndex(0).headers.authorization);
        return super.canActivate(context);
    }
}
