import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { EmployeesService } from 'src/employees/employees.service';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private employeesService: EmployeesService, private jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<any> {    
    console.log(email)
    console.log(pass)
    const employee = await this.employeesService.findByEmail(email);
    if (employee && pass === employee.password) {
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
}