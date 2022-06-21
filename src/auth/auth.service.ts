import { Injectable } from '@nestjs/common';
import { User } from 'src/users/models/user.model';
import { UserService } from 'src/users/users.service';
import { AuthLoginOutput } from './dto/auth-login.dto';
import { JwtService } from '@nestjs/jwt';

export interface JWTPayload {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.userGet(email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User): Promise<AuthLoginOutput> {
    const payload: JWTPayload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
