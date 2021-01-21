import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmployeesService } from '../employees/employees.service';



@Injectable()
export class AuthService {
  constructor(private employeesService: EmployeesService, private jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const employee = await this.employeesService.findByEmail(email);
    if (employee) {
      const { password, ...result } = employee;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      // eslint-disable-next-line @typescript-eslint/camelcase
      access_token: this.jwtService.sign(payload),
    };
  }

  async userExist(email: string): Promise<any> {
    const owner = await this.employeesService.findByEmail(email);
    if (owner) {
      const { password, ...result } = owner;
      return result;
    }
    return null;   
  }

  async createToken(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return { 
      access_token: this.jwtService.sign(payload,{
        expiresIn: '30s'
      }),
    };     
  }

}
