import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
    async canActivate(context: ExecutionContext): Promise<any> {
        // console.log(context.getArgByIndex(0).headers.authorization); //en caso de querer mirar la petición
        return super.canActivate(context);
    }
}