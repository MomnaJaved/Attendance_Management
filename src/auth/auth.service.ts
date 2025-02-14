import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../user';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../user/dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async logIn(loginUserDto: LoginUserDto): Promise<{ access_token: string }> {
    const { id, password } = loginUserDto;
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password !== password) {
      throw new UnauthorizedException('Incorrect password');
    }

    const payload = { sub: user.id, firstName: user.firstName };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
