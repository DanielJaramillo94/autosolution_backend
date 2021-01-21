import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmployeesService } from '../employees/employees.service';
import { OwnersService } from '../owners/owners.service';


@Injectable()
export class AuthService {
  constructor(private employeesService: EmployeesService, private jwtService: JwtService, 
              private ownersService: OwnersService) {}

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

  async ownerExist(email: string): Promise<any> {
    const owner = await this.ownersService.findByEmail(email);
    if (owner) {
      const { cellphone, ...result } = owner;
      return result;
    }
    return null;   
  }

  async createToken(user: any) {
    const payload = { name: user.name, id: user.id };    
    const data = { 
      access_token: this.jwtService.sign(payload,{
        expiresIn: '30s'
      },),
    };  
    const ownerId = payload.id
    const token = data.access_token 
    //sendEmail()
    console.log("user",user)      
    return {ownerId, token}
  }

}
