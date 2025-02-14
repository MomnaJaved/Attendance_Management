import { Injectable } from '@nestjs/common';
import { UsersService } from '../user';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../user/dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    loginUserDto: LoginUserDto,
  ): Promise<{ access_token: string } | null> {
    const { id, password } = loginUserDto;
    const user = await this.usersService.findOne(id);

    if (!user) {
      console.log('User not found');
      return null;
    }

    if (user.password !== password) {
      console.log('Incorrect password');
      return null;
    }

    const payload = { sub: user.id, firstName: user.firstName };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
