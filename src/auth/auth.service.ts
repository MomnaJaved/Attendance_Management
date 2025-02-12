import {
  Injectable,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../user/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(loginUserDto: LoginUserDto): Promise<{ access_token: string }> {
    const { id, password } = loginUserDto;
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new HttpException('User not found', 404);
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
