import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RegisterService, UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  private handleError(error: unknown, status: HttpStatus) {
    throw new HttpException(
      error instanceof Error ? error.message : 'An unexpected error occurred',
      status,
    );
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      await this.userService.create(createUserDto);
      return { success: true, message: 'User Created Successfully' };
    } catch (error) {
      this.handleError(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll() {
    try {
      return {
        success: true,
        data: await this.userService.findAll(),
        message: 'Users Fetched Successfully',
      };
    } catch (error) {
      this.handleError(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const data = await this.userService.findOne(id);
      if (!data)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      return { success: true, data, message: 'User Fetched Successfully' };
    } catch (error) {
      this.handleError(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      if (!(await this.userService.update(id, updateUserDto))) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return { success: true, message: 'User Updated Successfully' };
    } catch (error) {
      this.handleError(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      if (!(await this.userService.remove(id))) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return { success: true, message: 'User Deleted Successfully' };
    } catch (error) {
      this.handleError(error, HttpStatus.BAD_REQUEST);
    }
  }
}

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  private handleError(error: unknown, status: HttpStatus) {
    throw new HttpException(
      error instanceof Error ? error.message : 'An unexpected error occurred',
      status,
    );
  }

  @Get(':id/:password')
  async login(@Param('id') id: string, @Param('password') password: string) {
    try {
      const data = await this.loginService.login(id, password);
      if (!data)
        throw new HttpException(
          'Login failed, User not found.',
          HttpStatus.NOT_FOUND,
        );
      return { success: true, data, message: 'Login Successful.' };
    } catch (error) {
      this.handleError(error, HttpStatus.BAD_REQUEST);
    }
  }
}

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  private handleError(error: unknown, status: HttpStatus) {
    throw new HttpException(
      error instanceof Error ? error.message : 'An unexpected error occurred',
      status,
    );
  }

  @Post()
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      await this.registerService.register(createUserDto);
      return { success: true, message: 'User Registered Successfully' };
    } catch (error) {
      this.handleError(error, HttpStatus.BAD_REQUEST);
    }
  }
}
