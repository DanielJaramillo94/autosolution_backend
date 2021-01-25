import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmployeesService } from '../employees/employees.service';
import { OwnersService } from '../owners/owners.service';
import * as nodemailer from 'nodemailer';


@Injectable()
export class AuthService {
  constructor(private employeesService: EmployeesService, private jwtService: JwtService,
    private ownersService: OwnersService) { }

  async validateUser(email: string, pass: string): Promise<any> {
    const employee = await this.employeesService.findByEmail(email);
    if (employee) {
      const { password, ...result } = employee;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id, role: user.role.name };
    return {
      // eslint-disable-next-line @typescript-eslint/camelcase
      access_token: this.jwtService.sign(payload),
    };
  }

  async ownerExist(email: string): Promise<any> {
    const owner = await this.ownersService.findByEmail(email);
    if (owner) {
      const { cellphone, ...result } = owner;
      return result;
    }
    return null;
  }

  async sendEmail(email: string, link: string) {
    const transporter = nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 465,
      secure: true,
      auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY,
      },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"AutoSolution" <pao_cardona97@hotmail.com>', // sender address
      to: email, // list of receivers
      subject: "Enlace de acceso", // Subject line
      text: "Enlace de acceso", // plain text body
      html: `<h4>Por favor haga clic en el siguiente enlace:</h4> <a href="${link}">Aquí</a>`, // html body
    });
  }

  async createToken(user: any) {
    const payload = { name: user.name, id: user.id };
    // eslint-disable-next-line @typescript-eslint/camelcase
    const data = {
      // eslint-disable-next-line @typescript-eslint/camelcase
      access_token: this.jwtService.sign(payload, {
        expiresIn: '30s'
      }),
    };
    const token = data.access_token;
    const link = `${process.env.FRONTEND_HOST}/owner?id=${user.id}&token=${token}`;
    this.sendEmail(user.email, link);
    return {
      token
    };
  }
}
