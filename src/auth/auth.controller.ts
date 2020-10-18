import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';

import { GoogleAuthGuard } from '../auth/guards/google-auth.guard';

@Controller()
export class AuthController {

    @UseGuards(GoogleAuthGuard)
    @Get('auth/google')
    async login() {
        //This is never called, it just starts the oauth flow
    }

    @Get('google/callback')
    @UseGuards(GoogleAuthGuard)
    googleLoginCallback(@Req() req: any, @Res() res: any) {
        let responseHTML = '<html><head><title>Main</title></head><body></body><script>res = %value%; window.opener.postMessage(res, "*");window.close();</script></html>'
        responseHTML = responseHTML.replace('%value%', JSON.stringify({
            user: req.user
        }));
        res.status(200).send(responseHTML);
    }
}