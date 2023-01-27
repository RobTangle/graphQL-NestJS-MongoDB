import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { JWT_SECRET } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(email: string, password: string): Promise<User> | null {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) {
      return null;
    }

    // usar bcrypt o alguna otra librería para comparar password encriptadas. Acá lo dejo simple.
    const passwordIsValid = password === user.password;
    return passwordIsValid ? user : null;
  }

  login(user: User): { access_token: string } {
    const payload = {
      email: user.email,
      sub: user.userId,
    };

    return { access_token: this.jwtService.sign(payload) };
  }

  async verify(token: string): Promise<User> {
    const decoded = this.jwtService.verify(token, {
      secret: JWT_SECRET,
    });
    const user = await this.usersService.getUserByEmail(decoded.email);
    return user;
  }
}
